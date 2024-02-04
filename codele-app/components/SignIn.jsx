import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/auth';

const SignIn = ({ user }) => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Successful sign-in is handled by onAuthStateChanged in the main app component
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('User closed the popup.');
            } else {
                // Handle other errors
                console.error(error);
            }
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-sm font-medium">
            {user ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <button onClick={signInWithGoogle}>Sign In</button>
            )}
            {/* Add a sign-in with email/password form or button */}
        </div>
    );
};

export default SignIn;
