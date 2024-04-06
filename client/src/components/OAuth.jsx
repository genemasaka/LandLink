import React from 'react'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

const dispatch = useDispatch();
const navigate = useNavigate();

const handleGoogleAuth = async () => {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: "landlink-a2caa.firebaseapp.com",
        projectId: "landlink-a2caa",
        storageBucket: "landlink-a2caa.appspot.com",
        messagingSenderId: "408320472589",
        appId: "1:408320472589:web:54c18af827817212d4c744",
        measurementId: "G-015MY1D27V"
      };
      const app = initializeApp(firebaseConfig);

    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
        })
        const data = await res.json()
        dispatch(signInSuccess(data));
        navigate("/");
         
    } catch (error) {
        console.log('could not sign in with Google', error);
    }
}

  return (
    
    <button onClick={handleGoogleAuth} type='button' className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover:opacity-95'>Continue with Google</button>
  )
}
