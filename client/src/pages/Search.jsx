import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const [sideBarData, setSideBarData] = useState({
    searchTerm: '',
    sort: 'created_at',
    order: 'desc',
  })
  console.log(listings);
  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl || orderFromUrl || sortFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc'
      })
    }
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listings/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    }
    fetchListings();
  }, [location.search])
  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSideBarData({...sideBarData, searchTerm: e.target.value})
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSideBarData({...setSideBarData, sort, order});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams =  new URLSearchParams();
    urlParams.set('searchTerm', sideBarData.searchTerm)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order', sideBarData.order)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className="flex items-center gap-2 ">
                <label className='whitespace-nowrap'>Search Term</label>
                <input onChange={handleChange} type="text" id='searchTerm'
                placeholder='Search...' value={sideBarData.searchTerm}
                className='border rounded-lg p-3 w-full'/>
            </div>
            <div className="flex items-center gap-2">
                <label >Sort:</label>
                <select onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-lg p-3' id="sort_order">
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>

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
