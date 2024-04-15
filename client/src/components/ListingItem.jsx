import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaMapMarkerAlt,
    FaShare,
  } from 'react-icons/fa';
export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md 
    hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
  
      <div className='p-3 flex flex-col gap-2'>
      <p className='text-lg  truncate font-semibold text-slate-600'>{listing.title}</p>
      <div className="flex items-center gap-1">
        <FaMapMarkerAlt className='h-4 w-4 text-green-600'/>
        <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
      </div>
      <div className="text-sm flex flex-col gap-1 mt-3 text-slate-500">
        <p> <span className='font-semibold'>Plot Size: </span>{listing.plotSize.toLocaleString('en-US')} acres</p>
        <p> <span className='font-semibold'>Discounted Rate: </span>{listing.regularRate.toLocaleString('en-US')} ksh/month</p>
        <p> <span className='font-semibold'>Regular Rate: </span>{listing.discountedRate.toLocaleString('en-US')} ksh/month</p>
      </div>
      </div>
      </Link>

    </div>
  )
}
