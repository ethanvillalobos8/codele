'use client'

import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const MyApp = ({ Component, pageProps }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
    }, []);

    return <Component {...pageProps} currentUser={currentUser} />;
};

export default MyApp;