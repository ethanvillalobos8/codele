'use client'

import React, { useEffect, useState } from 'react';
import { auth } from '/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Statistics from './Statistics';
import { fetchProblemsFromFirestore } from '@/database/problems';
import { PiSidebarSimpleFill, PiSidebarSimpleDuotone } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";

export default function Sidebar({ codelle }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [todaysProblem, setTodaysProblem] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });

        fetchProblemsFromFirestore().then((selectedProblem) => {
            setTodaysProblem(selectedProblem);
        });
    }, []);

    return (
        <div className={`flex z-20 flex-col h-screen transition-all duration-300 ${isOpen ? 'w-screen md:w-2/5 max-md:absolute max-md:z-10' : 'w-0 md:w-16'} pt-16 flex-shrink-0`}>
            <button
                className={`grid p-2 text-[#4c506a] text-2xl justify-items-end transition-all duration-300 ${isOpen ? 'w-full bg-[#1a1429] hover:text-[#c2bed9] border-r-4 border-[#2a2950]' : 'w-0 md:w-16 md:bg-[#1a1429] md:hover:text-[#c2bed9] md:border-r-4 md:border-[#2a2950] z-0'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <PiSidebarSimpleFill /> : <PiSidebarSimpleDuotone />}
            </button>
            {isOpen ? 
                <div className="grid bg-[#1a1429] border-r-4 border-[#2a2950] w-full h-full px-6 transition-all duration-300 overflow-y-auto">
                    <div className='h-full w-full'>
                        <div className='flrex-rows h-full w-full overflow-y-auto'>
                            <div className="w-full mb-4">
                                <h2 className="font-bold text-2xl md:text-3xl text-[#f6f6f6] mb-4">Codele of the Day</h2>
                                <div className="w-full h-[.15rem] bg-[#4c506a] mb-4 rounded-lg opacity-50"></div>
                                <p className='text-sm md:text-base pb-6 text-[#f6f6f6]'>{todaysProblem.description}</p>
                                {todaysProblem.input && <p className='text-sm md:text-base pb-1 text-[#c2bed9]'><strong className='text-[#ededed]'>Input:</strong> {todaysProblem.input}</p>}
                                {todaysProblem.output && <p className='text-sm md:text-base pb-6 text-[#c2bed9]'><strong className='text-[#ededed]'>Output:</strong> {todaysProblem.output}</p>}
                                {todaysProblem.tags && <p className='text-sm md:text-base text-[#c2bed9]'><strong className='text-[#ededed]'>Tags:</strong> {todaysProblem.tags.join(', ')}</p>}
                            </div>
                            <div className="grow w-full">
                                <div className="flex items-center pb-4">
                                    <h2 className="text-sm md:text-base font-bold">Codelle</h2>
                                    <span className="text-sm md:text-base ml-2"><RiRobot2Fill /></span>
                                </div>
                                <p className='flex bg-[#232246] text-xs md:text-sm font-mono text-justify px-3 py-2 max-h-32 overflow-auto rounded-md'>{codelle}</p>
                            </div>
                            {user ? <Statistics /> : <div className="text-[#f6f6f6] text-sm md:text-base pt-6">Create an account or sign in to start tracking your stats!</div>}
                        </div>
                    </div>
                </div> 
            : <div className="flex w-0 md:w-16 h-full md:bg-[#1a1429] md:border-r-4 md:border-[#2a2950] transition-all duration-300"></div>}
        </div>
    );
};