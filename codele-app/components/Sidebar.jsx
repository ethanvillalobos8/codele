'use client'

import React, { useEffect, useState } from 'react';
import { auth } from '/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Statistics from './Statistics';
import ProblemData, { todaysProb } from '@/database/problems';
import { PiSidebarSimpleFill, PiSidebarSimpleDuotone } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";

export default function Sidebar({ codelle }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });
    }, []);

    return (
        <div className={`flex flex-col h-screen z-10 transition-all duration-300 ${isOpen ? 'w-screen md:w-3/5 max-md:absolute max-md:z-10' : 'w-0 md:w-16'} pt-16`}>
            <button
                className={`grid p-2 text-[#4c506a] text-2xl justify-items-end transition-all duration-300 ${isOpen ? 'w-full bg-[#1a1429] hover:text-[#c2bed9] border-r-4 border-[#2a2950]' : 'w-0 md:w-16 md:bg-[#1a1429] md:hover:text-[#c2bed9] md:border-r-4 md:border-[#2a2950]'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <PiSidebarSimpleFill /> : <PiSidebarSimpleDuotone />}
            </button>
            {isOpen ? 
                <div className="flex-grow bg-[#1a1429] border-r-4 border-[#2a2950] w-full h-full px-6 overflow-auto transition-all duration-300">
                    <div className='grid grid-rows-2 h-full'>
                        <div className='h-full'>
                            <div className="mb-4">
                                <h2 className="font-bold text-3xl text-[#f6f6f6] mb-4">Codele of the Day</h2>
                                <div className="w-full h-[.15rem] bg-[#4c506a] mb-4 rounded-lg opacity-50"></div>
                                {todaysProb.input && <p className='pb-1 text-[#c2bed9]'><strong className='text-[#ededed]'>Input:</strong> {todaysProb.input}</p>}
                                {todaysProb.output && <p className='pb-6 text-[#c2bed9]'><strong className='text-[#ededed]'>Output:</strong> {todaysProb.output}</p>}
                                {todaysProb.tags && <p className='text-[#c2bed9]'><strong className='text-[#ededed]'>Tags:</strong> {todaysProb.tags.join(', ')}</p>}
                            </div>
                            {/* Used to import data from functional component */}
                            <ProblemData />
                            <div className="flex-grow">
                                <div className="flex items-center">
                                    <h2 className="font-bold">Codelle</h2>
                                    <span className="ml-2"><RiRobot2Fill /></span>
                                </div>
                                <p className='text-sm font-mono text-justify pt-1'>{codelle}</p>
                            </div>
                        </div>
                        {user ? <Statistics /> : <div className="text-[#f6f6f6]">Create an account or sign in to start tracking your stats!</div>}
                    </div>
                </div> 
            : <div className="flex w-0 md:w-16 h-full md:bg-[#1a1429] md:border-r-4 md:border-[#2a2950] transition-all duration-300"></div>}
        </div>
    );
};