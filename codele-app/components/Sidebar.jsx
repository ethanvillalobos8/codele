'use client'

import React, { useEffect, useState } from 'react';
import { auth } from '/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Statistics from './Statistics';
import { todaysProblem } from '@/database/problems';

import { PiSidebarSimpleFill, PiSidebarSimpleDuotone } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";

export default function Sidebar({ codelle }) {
    const [isOpen, setIsOpen] = useState(true); // State to manage if the sidebar is open
    const [user, setUser] = useState(null); // State to manage the user

    useEffect(() => {
        // Check if the user is authenticated
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // If the user is authenticated, save to state
                setUser(user);
            } else {
                // If the user is not authenticated, set state to null
                setUser(null);
            }
        });
    }, []);

    return (
        <div className={`flex flex-col h-screen ${isOpen && 'w-3/5'} pt-16`}>
            <button
            className={`grid p-2 text-[#4c506a] text-2xl justify-items-end bg-[#1a1429] hover:text-blue-700 border-r-4 border-[#2a2950] ${isOpen ? 'w-full' : 'w-16'}`}
            onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <PiSidebarSimpleFill /> : <PiSidebarSimpleDuotone />}
            </button>
            {isOpen ? <div className="flex-grow bg-[#1a1429] border-r-4 border-[#2a2950] w-full h-full px-6">
                <div className='grid grid-rows-2 h-full'>
                    <div className='h-full'>
                        {/* Problem of the Day */}
                        <div className="mb-4">
                            <h2 className="font-bold text-3xl text-[#f6f6f6] mb-4">Codele of the Day</h2>
                            <div className="w-full h-[.15rem] bg-[#4c506a] mb-4 rounded-lg opacity-50"></div>
                            <p className='pb-6 text-[#f6f6f6]'>{todaysProblem.description}</p>
                            {todaysProblem.input && <p className='pb-1 text-[#c2bed9]'><strong className='text-[#ededed]'>Input:</strong> {todaysProblem.input}</p>}
                            {todaysProblem.output && <p className='pb-6 text-[#c2bed9]'><strong className='text-[#ededed]'>Output:</strong> {todaysProblem.output}</p>}
                            {todaysProblem.tags && <p className='text-[#c2bed9]'><strong className='text-[#ededed]'>Tags:</strong> {todaysProblem.tags.join(', ')}</p>}
                        </div>

                        {/* Codelle */}
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
            : <div className="flex w-16 h-full bg-[#1a1429] border-r-4 border-[#2a2950]"></div>
            }
        </div>
    );
};