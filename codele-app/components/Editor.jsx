import React, { useRef, useEffect, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useCodeMirror } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';
import '@/styles/custom-codemirror-style.css'

import Sidebar from '../components/Sidebar';
import { todaysProblem } from '@/database/problems';
import { prompt } from '@/utils/prompt';
import { fetchUserData } from '@/pages/api/fetch-data';
import { FaPlay } from "react-icons/fa";

const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

const codele = createTheme({
	variant: 'dark',
	settings: {
		background: 'transparent',
		foreground: '#9db7cd',
		caret: '#f5f5f5',
		selection: '#322a4b',
		lineHighlight: '#8a91991a',
		gutterBackground: 'transparent',
		gutterForeground: '#505e6d',
	},
	styles: [
		{
			tag: t.comment,
			color: '#505e6d',
		},
		{
			tag: t.variableName,
			color: '#4d91ff',
		},
		{
			tag: [t.string, t.special(t.brace)],
			color: '#1cadab',
		},
		{
			tag: t.number,
			color: '#f5f5f5',
		},
		{
			tag: t.bool,
			color: '#9eb7cd',
		},
		{
			tag: t.null,
			color: '#9db6cc',
		},
		{
			tag: t.keyword,
			color: '#835ae2',
		},
		{
			tag: t.operator,
			color: '#f5f5f5',
		},
		{
			tag: t.className,
			color: '#4e91ff',
		},
		{
			tag: t.definition(t.typeName),
			color: '#e22292',
		},
		{
			tag: t.typeName,
			color: '#e22392',
		},
		{
			tag: t.angleBracket,
			color: '#ff7824',
		},
		{
			tag: t.tagName,
			color: '#ff7824',
		},
		{
			tag: t.attributeName,
			color: '#9eb7cd',
		},
	],
});

const Editor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    console.log(todaysProblem)
    const { setContainer } = useCodeMirror({
        container: editorRef.current,
        value: todaysProblem.partialCode,
        basicSetup: {
            lineNumbers: true,
        },
        extensions: [
            python(),
            codele,
        ],
        onUpdate: (update) => {
            if (update.docChanged) {
                const newValue = update.state.doc.toString();
                onChange(newValue);
            }
        },
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await fetchUserData();
                setUserData(data);
            } else {
                console.log("No user logged in");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const recordAttempt = async (winLoss) => {
        const user = auth.currentUser;
        const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
            const userData = userDoc.data().userData || {};
            const dailyAttempts = userData.dailyAttempts || {};
            let didWinToday = userData.didWinToday || false;
    
            // Check if the user did not play today and reset didWin if they won yesterday
            const lastPlayedDate = userData.lastPlayedDate || '';
            if (lastPlayedDate !== today && userData.didWin) {
                didWinToday = false;
            }
    
            let isWin = false;
    
            isWin = winLoss;
            console.log(winLoss);
    
            // Increment or initialize the count for today only if they haven't won yet
            if (!didWinToday) {
                dailyAttempts[today] = (dailyAttempts[today] || 0) + 1;
            }
    
            // Update logic for streaks and win status
            let currentStreak = userData.currentStreak || 0;
            let maxStreak = userData.maxStreak || 0;
    
            if (isWin && !didWinToday) {
                didWinToday = true;
                currentStreak += 1; // Increment streak only on first win of the day
                maxStreak = Math.max(maxStreak, currentStreak);
                userData.wins = (userData.wins || 0) + 1;
            }

            const totalGamesPlayed = lastPlayedDate === today ? userData.totalGamesPlayed : userData.totalGamesPlayed + 1;
    
            await updateDoc(userDocRef, {
                userData: {
                    ...userData,
                    dailyAttempts: dailyAttempts,
                    totalGamesPlayed: totalGamesPlayed,
                    lastPlayedDate: today,
                    didWin: didWinToday,
                    wins: userData.wins,
                    currentStreak: currentStreak,
                    maxStreak: maxStreak,
                    didWinToday: didWinToday
                }
            });
        }
    };    

    const runUserCode = async (code, winLoss) => {
        try {
            // Check if attempts is < 6
            if (userData.dailyAttempts[today] < 6) {
                recordAttempt(winLoss);
            } else if (!userData) {
                console.log("User data not found");
            }

            let problemStatement = todaysProblem.description;
            let contextMessage = prompt;

            const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: code }, // User's code
            { role: "assistant", content: contextMessage }, // Context
            ];
        
            // Send the user's code to the OpenAI API
            const response = await fetch("/api/openai-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
            });
        
            if (response.ok) {
                const { result } = await response.json();
                setOpenAIResponse(result);
            } else {
            // Handle errors
            console.error("Error executing code:", response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error);
        }
    };
    
    const [openaiResponse, setOpenAIResponse] = useState('');

    useEffect(() => {
        if (editorRef.current) {
            setContainer(editorRef.current);
        }
        return () => {
            setContainer(null);
        };
    }, [editorRef, setContainer]);

    useEffect(() => {
        const responseText = openaiResponse;
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= responseText.length) {
                setOpenAIResponse(responseText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            setContainer(editorRef.current);
        }
        return () => {
            setContainer(null);
        };
    }, [editorRef, setContainer]);

    let winLoss = openaiResponse && JSON.parse(openaiResponse)[1] === 'true' ? true : false;

    return (
        <>
            <Sidebar codelle={openaiResponse && JSON.parse(openaiResponse)[2]}/>
            <div className="flex flex-col pt-16 h-screen w-screen lg:flex-row"> {/* Adjust layout for larger screens */}
                <div className="flex-grow grid grid-rows-4 h-full w-full border-y-4 border-[#2a2950]">
                    <div className="relative row-span-3">
                        <div ref={editorRef} className="h-full w-full pt-9 px-3 bg-gradient-to-br from-[#232246] via-[#241e3d] to-[#251937] bg-opacity-75 rounded-l-md overflow-auto" />
                        <button onClick={() => runUserCode(value, winLoss)} className="absolute top-0 right-0 mt-3 mr-6 flex items-center space-x-2 text-xs text-[#4c506a] hover:text-[#55e088]">
                            <FaPlay /> <span className='font-semibold'>Run</span>
                        </button>
                    </div>
                    <div className="bg-[#161121] rounded-r-md border-t-4 border-[#2a2950] p-4 h-full overflow-y-auto row-span-1">
                        <h2 className="text-white text-sm font-semibold mb-2">RESULT</h2>
                        {openaiResponse ? (
                            <p className="text-[#eaeaea] text-sm font-mono">{JSON.parse(openaiResponse)[0]}</p>
                        ) : (
                            <p className="text-[#eaeaea] text-sm font-mono"></p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editor;