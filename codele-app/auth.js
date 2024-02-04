// auth.js
import { auth } from './firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };