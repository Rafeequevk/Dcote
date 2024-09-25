import axios from 'axios'
import React from 'react'
import { useNavigate,useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import  {backEndUrl} from '../../config/envVars'


const DeleteBooking = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const handleDeleteBook = ()=>{
        axios.delete(`${backEndUrl}/booking/${id}`).then(()=>{
            navigate('/')
        }).catch((error)=>{
            alert( 'An Error Happended Please Check console')
            console.log(error);
            
        })
    }
  return (
    <div className='max-w-4xl mx-auto p-4'>

<div className="flex justify-between items-center mb-6">
        <BackButton/>
        <h1 className="text-2xl font-bold  text-gray-800">Delete Booking</h1>
        </div>
        <div className=' flex flex-col items-center border-2  border-sky-400 max-w-4xl p-8 mx-auto'>
        <h3 className='text-2xl'> Are You Sure You Want to Delete this Book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full ' onClick={handleDeleteBook}>
          Yes Delete
        </button>
      </div>
      
    </div>
  )
}

export default DeleteBooking
