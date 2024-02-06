import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"; 
import { auth, db } from '@/firebase-config';

const SignIn = ({ user }) => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            try {
                await signInWithPopup(auth, provider);
                const user = auth.currentUser;

                // Reference to the users collection
                const usersRef = collection(db, 'users');
                const userDocRef = doc(usersRef, user.uid);
                const userDoc = await getDoc(userDocRef);

                // Check if the user document exists
                if (!userDoc.exists()) {
                    // The user is new, add them to the collection
                    const dateKey = new Date().toISOString().slice(0, 10);
                    await setDoc(userDocRef, {
                        dateCreated: Timestamp.now(),
                        email: user.email,
                        userData: {
                            dailyAttempts: {
                                [dateKey]: 0,
                            },
                            totalGamesPlayed: 0,
                            wins: 0,
                            currentStreak: 0,
                            maxStreak: 0,
                        },
                    });
                }
            } catch (error) {
                console.log("Could not create user document:", error);
            }
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
