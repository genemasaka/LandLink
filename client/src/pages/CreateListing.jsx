import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
            Create a Listing
        </h1>
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Name' className='border p-3
                rounded-lg' id='name' maxLength='62' minLength='10' required/>
                <textarea type="text" placeholder='Description' className='border p-3
                rounded-lg' id='description'  required/>
                <input type="text" placeholder='Address' className='border p-3
                rounded-lg' id='address'  required/>
                <textarea type="text" placeholder='Amenities' className='border p-3
                rounded-lg' id='amenities'  required/>

                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                    <span>Regular Rate</span>
                    <input type="number" placeholder='Ksh per month' className='border p-3
                    rounded-lg' id='regular-rate'  required/>
                    </div>
                    <div className='flex items-center  gap-2'>
                    <span className=''>Discounted Rate</span>
                    <input type="number" placeholder='Ksh per month' className='border p-3
                    rounded-lg' id='dicounted-rate'  required/>
                    </div>
                    <div className='flex items-center gap-2'>
                    <span>Plot Size</span>
                    <input type="number" placeholder='Acres' className='border p-3
                    rounded-lg' id='plot-size'  required/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
               <p className='font-semibold'>Images:
               <span className='font-normal text-gray-600 'mt-2>The first image will be the cover(Max: 6)</span>                
               </p>
               <div className="flex gap-4">
                <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple />
                <button className='p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
               </div>
               <button className='p-3 text-white bg-slate-600 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ' >Create Listing</button>

            </div>
        </form>
    </main>
  )
}
