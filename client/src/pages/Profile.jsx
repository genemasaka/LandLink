import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice.js';
import { __DO_NOT_USE__ActionTypes } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import IMAGES from '../assets/images/Images.jsx'

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [ file, setFile ] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([])
  const [showListingsError, setShowListingsError] = useState(false);
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
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
      {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };
 const handleShowListings = async () => {
  try {
    setShowListingsError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if (data.success === false) {
      setShowListingsError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingsError(true);
  }
 }
 const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listings/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
  } catch (error) {
    console.log(error.message)
  }
 }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange = {(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/.*' />
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"  />
        <input onChange={handleChange} defaultValue={currentUser.username} id='username' type="text" placeholder='Username' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} defaultValue={currentUser.email} id='email' type="email" placeholder='Email' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} id='password' type="password" placeholder='Password' className='border p-3 rounded-lg'/>
        <button disabled={loading} className='bg-slate-600 text-white rounded-lg p-3 uppercase 
        hover:opacity-95 disabled:opacity-80'>{loading? 'Loading...' : 'Update' }</button>
      <Link className='bg-green-700 text-white p-3
      rounded-lg uppercase text-center hover:opacity-95'to={"/create-listing"}>
        Create Listing
      </Link>
      </form>
    <div className='flex justify-between mt-5'>
      <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete Account</span>
      <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign out</span>
    </div>
      <p className='text-red-600 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : '' }</p>
      <button onClick={handleShowListings} className='text-green-600 w-full'>Show Listings</button>
      <p className='text-red-600 mt-5'>{showListingsError ? 'Error showing listings': ''}</p>
    
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >

              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.title}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
