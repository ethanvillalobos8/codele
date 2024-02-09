'use client'

import { collection, query, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

export const fetchProblemsFromFirestore = async () => {
    try {
        const problemRef = collection(db, 'problems');
        const q = query(problemRef); // Get all documents in the collection

        const querySnapshot = await getDocs(q);
        let problems = [];

        querySnapshot.forEach((doc) => {
            problems.push({ firestoreId: doc.id, ...doc.data() });
        });

        // Get today's date considering the timezone
        const offset = new Date().getTimezoneOffset() * 60000; // Timezone offset in milliseconds
        const today = new Date(Date.now() - offset).toISOString().slice(0, 10);

        let selectedProblem;
        // If theres a problem with todays date, use that
        if (problems.some((prob) => prob.dateUsed === today)) {
            const todaysProblem = problems.find((prob) => prob.dateUsed === today);
            selectedProblem = todaysProblem;
            return selectedProblem;
        } else {
            // Filter problems that either have no dateUsed
            problems = problems.filter((prob) => !prob.dateUsed);

            if (problems.length > 0) {
                // Select a random problem
                selectedProblem = problems[Math.floor(Math.random() * problems.length)];
            } else {
                // If all problems have been used, reset their dateUsed
                await Promise.all(querySnapshot.docs.map((doc) => 
                    updateDoc(doc.ref, { dateUsed: null })
                ));

                // Refetch the problems
                const resetSnapshot = await getDocs(q);
                resetSnapshot.forEach((doc) => {
                    problems.push({ firestoreId: doc.id, ...doc.data() });
                });
                selectedProblem = problems[Math.floor(Math.random() * problems.length)];
            }

            // Update the selected problem's dateUsed to today
            await updateDoc(doc(db, 'problems', selectedProblem.firestoreId), {
                dateUsed: today,
            });

            return selectedProblem;
        }
    } catch (error) {
        console.error('Error fetching problems from Firestore:', error);
        return null;
    }
};

// Usage
export let todaysProb = {};

fetchProblemsFromFirestore().then((selectedProblem) => {
    todaysProb = selectedProblem;
});
