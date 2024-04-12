import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className='flex flex-col gap-8'>
            <div className="flex items-center gap-2 ">
                <label className='whitespace-nowrap'>Search Term</label>
                <input type="text" id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'/>
            </div>
            <div className="flex items-center gap-2">
                <label >Sort:</label>
                <select className='border rounded-lg p-3' id="sort_order">
                    <option >Price high to low</option>
                    <option >Price low to high</option>
                    <option >Latest</option>
                    <option >Oldest</option>

                </select>
            </div>
            <button className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
      </div>
      <div className="text-3xl font-semibold border-b p-3 mt-5 text-slate-600">
        <h1>Listing results</h1>
      </div>
    </div>
  )
}
