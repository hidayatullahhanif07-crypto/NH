import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Injected Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyDdPsHxkSii1um0T0kTKtfXGG21p9golG0",
  authDomain: "gen-lang-client-0120483413.firebaseapp.com",
  projectId: "gen-lang-client-0120483413",
  storageBucket: "gen-lang-client-0120483413.firebasestorage.app",
  messagingSenderId: "640014969056",
  appId: "1:640014969056:web:cad7b2ecc05fd75b678885"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
