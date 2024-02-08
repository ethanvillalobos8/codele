'use client'

import { useEffect, useState } from 'react';
import { auth } from '/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import NavBar from '@/components/NavBar';
import Editor from '@/components/Editor';

export default function Home() {
  const [code, setCode] = useState('');

  const handleEditorChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
      // Check if the user is authenticated
      onAuthStateChanged(auth, (user) => {
          if (user) {
              console.log('User is signed in');
              // If the user is authenticated, track stats
          } else {
              // If the user is not authenticated, save to local cache
          }
      });
  }, []);

  return (
    <main>
      <div className="flex h-screen max-w-screen bg-[#1a1429] transition-all duration-300">
        <NavBar />
        <Editor value={code} onChange={handleEditorChange} />
      </div>
    </main>
  );
}
