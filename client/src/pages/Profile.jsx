import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';


export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user)
  const [ file, setFile ] = useState(undefined);

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

  useEffect(()=> {
    if(file) {
      handleAvatarUpload(file)
    }
  }, [file]);

  const handleAvatarUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange = {(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/.*' />
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <input id='username' type="text" placeholder='Username' className='border p-3 rounded-lg'/>
        <input id='email' type="email" placeholder='Email' className='border p-3 rounded-lg'/>
        <input id='password' type="password" placeholder='Password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-600 text-white rounded-lg p-3 uppercase 
        hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-600 cursor-pointer'>Delete Account</span>
      <span className='text-red-600 cursor-pointer'>Sign out</span>

    </div>
    </div>
  )
}
