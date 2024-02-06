'use client'

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase-config'; // Import your Firebase configuration

export const fetchUserData = async () => {
    console.log("Fetching user data...");
    const user = auth.currentUser;

    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            console.log("User data:", userDoc.data().userData);
            return userDoc.data().userData;
        } else {
            console.log("User document does not exist");
        }
    } catch {
        console.log("No user logged in");
    }
};
