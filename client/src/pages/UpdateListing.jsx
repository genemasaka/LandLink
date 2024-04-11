import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateListing() {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        const fetchListing = async () => {
          const listingId = params.listingId;
          const res = await fetch(`/api/listings/get/${listingId}`)
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          setFormData(data)
        }
        fetchListing();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        amenities: '',
        regularRate: 0,
        discountedRate: 0,
        plotSize: 0,

    });
    console.log(formData);
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
                const fileName = new Date().getTime() + file.name;
            }
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {

        })
    }
    
    const handleChange = (e) => {
        if (
            e.target.type === 'text' ||
            e.target.type === 'textarea' ||
            e.target.type === 'number'
          ) {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
        }
  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(+formData.regularRate < +formData.discountedRate) return setError("Discounted rate must be lower than the Regular rate!")
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listings/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            })
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
            Update a Listing
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3
                rounded-lg' id='title' maxLength='62' minLength='10' required onChange={handleChange} value={formData.title}/>
                <textarea type="text" placeholder='Description' className='border p-3
                rounded-lg' id='description'  required onChange={handleChange} value={formData.description}/>
                <input type="text" placeholder='Address' className='border p-3
                rounded-lg' id='address'  required onChange={handleChange} value={formData.address}/>
                <textarea type="text" placeholder='Amenities' className='border p-3
                rounded-lg' id='amenities'  required onChange={handleChange} value={formData.amenities}/>

                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                    <input type="number" placeholder='Ksh per month' className='border p-3
                    rounded-lg' id='regularRate'  required onChange={handleChange} value={formData.regularRate}/>
                    <span>Regular Rate (ksh/month)</span>
                    </div>
                    <div className='flex items-center  gap-2'>
                    <input type="number" placeholder='Ksh per month' className='border p-3
                    rounded-lg' id='discountedRate' required onChange={handleChange} value={formData.discountedRate}/>
                    <span className=''>Discounted Rate (ksh/month)</span>
                    </div>
                    <div className='flex items-center gap-2'>
                    <input type="number" placeholder='Acres' className='border p-3
                    rounded-lg' id='plotSize' required onChange={handleChange} value={formData.plotSize} />
                    <span>Plot Size (acres)</span>
                   
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
               <p className='font-semibold'>Images: 
               <span className='font-normal text-gray-600 mt-2 '> The first image will be the cover(Max: 6)</span>                
               </p>
               <div className="flex gap-4">
                <input onChange={(e)=>{setFiles(e.target.files)}} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple />
                <button type='button' onClick={handleImageSubmit} className='p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
               </div>
               <button className='p-3 text-white bg-slate-600 rounded-lg uppercase 
               hover:opacity-95 disabled:opacity-80 ' >{loading ? 'Updating...' : 'Update Listing'}</button>
               {error && <p className='text-red-600 text-sm'>{error}</p>}
            </div>
        </form>
    </main>
  )
}
