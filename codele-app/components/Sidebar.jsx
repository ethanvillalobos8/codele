'use client'

import React, { useState } from 'react';

import { PiSidebarSimpleFill, PiSidebarSimpleDuotone } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";

export default function Sidebar({ codelle }) {
    const [isOpen, setIsOpen] = useState(true); // State to manage if the sidebar is open

    return (
        <div className="flex flex-col h-screen pt-16">
        <button
        className="grid p-2 text-[#4c506a] text-2xl justify-items-end bg-[#1a1429] hover:text-blue-700 border-r-4 border-[#2a2950]"
        onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <PiSidebarSimpleFill /> : <PiSidebarSimpleDuotone />}
        </button>
        {isOpen ? <div className="flex-grow bg-[#1a1429] border-r-4 border-[#2a2950] p-4 w-full">
            {/* Problem of the Day */}
            <div className="mb-4">
            <h2 className="font-bold text-2xl pb-4">Codele of the Day</h2>
            <p>Write a function that takes in a string and returns the length of the longest substring without repeating characters.</p>
            </div>

            {/* Codelle */}
            <div className="flex-grow">
            <div className="flex items-center">
                <h2 className="font-bold">Codelle</h2>
                <span className="ml-2"><RiRobot2Fill /></span>
            </div>
            <p>{codelle}</p>
            </div>
        </div> : <div className="flex w-16 h-full bg-[#1a1429] border-r-4 border-[#2a2950]"></div>}
        </div>
    );
};