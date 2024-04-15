import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem.jsx';
export default function Home() {
  const [listings, setListings] = useState();
  console.log(listings);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings/get?searchTerm=&limit=6')
        const data = await res.json(res)
        setListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  },[])
  return (
    <div>
      {/*top*/}
      <div className="flex flex-col gap-6 p-24 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-900 font-bold text-3xl
        lg:text-6xl'>
          Land of <span className='text-slate-600'>opportunity?</span> <br />
          LandLink makes it easy.
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
        Landlords & Land Seekers. Connected. Effortlessly.
        <br />
        </div>
        <Link className='text-xs sm:text-sm text-blue-600 font-bold hover:underline' to={"/search"}>Get started...</Link>
      </div>
      {/*results*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-1">
        {listings && listings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Listings</h2>
            </div>
            <div className="flex flex-wrap gap-4">
             {listings.map((listing) => (
              <ListingItem listing={listing} key={listing._id}/>
             ))} 
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
