'use client'

import { useEffect, useState } from "react";
import { auth } from '@/auth';
import SignIn from "./SignIn";
import Image from 'next/image'

const NavBar = () => {
    const [user, setUser] = useState(null);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="w-full bg-opacity-90 bg-gradient-to-r from-[#089cd1] via-[#13bfcd] to-[#25e3c6] text-white fixed top-0 left-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="flex text-2xl font-bold justify-center items-center"><Image className="mr-1" src="/codele_temp.png" width={40} height={40}></Image>Codele</h1>
                    </div>
                    
                    <SignIn user={user}/>
                </div>
            </div>
        </div>
    );
};

export default NavBar;