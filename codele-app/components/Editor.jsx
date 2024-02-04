import React, { useRef, useEffect, useState } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';
import '@/styles/custom-codemirror-style.css'

import Sidebar from '../components/Sidebar';
import { FaPlay } from "react-icons/fa";

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
    const { setContainer } = useCodeMirror({
        container: editorRef.current,
        value: value,
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

    const runUserCode = async (code) => {
        try {
            let problemStatement = "Write a function that takes in a string and returns the length of the longest substring without repeating characters.";
            const contextMessage = `You will act as a judge, analyzing every line of the user submitted code and seeing if it will solve a certain task. You will do so by running the code based on a example you come up with that matches the given problem. You will be provided with that coding task and the user submitted code in string format. Here is the user submitted code: ${problemStatement}. You will parse the string and understand the code given to you. You will then respond with an array that has 3 elements only, where the first element in the array is text. That text will be your judgment of the code. Congratulate the user if they got it right. If the user was close, tell them they were close and give them hints on what they can do to fix their code. If they were not so close, tell them where they can improve, but never give them the answer. The code will be written in any language the user is comfortable with.  The next element in the array will be a numeric score from 0 to 100, where 0 means the user was completely off the mark and 100 means the user got it right, but before you give them a 100, review their code again and make sure nothing is missing that will cause any errors. Everything in between will be dependent on how much they need to fix in their code. The final element in the array will be guidance on what areas they should focus on improving based on all of the code they submitted until the 5th attempt. After the 5th attempt, you will put the most efficient solution to the problem as the third element in the array in whatever language the user was using. Only respond in array format (here is an example ["response 1", "response 2", "response 3"]) where every element is a string; do not respond in any other way other than an array of the three elements I specified no matter what under any circumstances.`;
        
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

    return (
        <>
            <Sidebar codelle={openaiResponse && JSON.parse(openaiResponse)[2]}/>
            <div className="flex pt-16 h-screen w-screen">
                <div className="grid grid-rows-4 h-full w-full border-y-4 border-[#2a2950]">
                    <div className="row-span-3 relative">
                        <div ref={editorRef} className="h-full w-full pt-9 px-3 bg-gradient-to-br from-[#232246] via-[#241e3d] to-[#251937] bg-opacity-75 rounded-l-md" />
                        <button onClick={() => runUserCode(value)} className="absolute top-0 right-0 mt-3 mr-6 flex items-center space-x-2 text-xs text-[#4c506a] hover:text-[#55e088]">
                            <FaPlay /> <span className='font-semibold'>Run</span>
                        </button>
                    </div>
                    <div className="bg-[#161121] rounded-r-md border-t-4 border-[#2a2950] p-4 h-full overflow-y-auto">
                        <h2 className="text-white text-sm font-semibold mb-2">RESULTS</h2>
                        {openaiResponse ? (
                            <p className="text-[#eaeaea] font-mono">{JSON.parse(openaiResponse)[0]}</p>
                        ) : (
                            <p className="text-[#eaeaea] font-mono"></p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editor;