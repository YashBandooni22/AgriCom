import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import doc1 from '../assets/doc1.png'
import doc2 from '../assets/doc2.png'
import doc3 from '../assets/doc3.png'
import doc4 from '../assets/doc4.png'
import doc5 from '../assets/doc5.png'
import doc6 from '../assets/doc6.png'
import doc7 from '../assets/doc7.png'
import doc8 from '../assets/doc8.png'
import doc9 from '../assets/doc20.png'
import doc10 from '../assets/doc21..png'
import doc11 from '../assets/doc11.png'
import doc12 from '../assets/doc12.png'
import doc13 from '../assets/doc13.png'
import doc14 from '../assets/doc14.png'
import doc15 from '../assets/doc15.png'
import doc16 from '../assets/doc16.png'
import doc17 from '../assets/doc17.png'
import doc18 from '../assets/doc18.png'
import doc19 from '../assets/doc19.png'


const topDoctorImages = [
  { _id: 'doc1', name: 'Basil Seeds', image: doc1, speciality: 'Seed' },
  { _id: 'doc2', name: 'Potato Plant', image: doc2, speciality: 'Plant' },
  { _id: 'doc3', name: 'Tomato', image: doc3, speciality: 'Plant' },
  { _id: 'doc4', name: 'Corn Plant', image: doc4, speciality: 'Crop' },
  { _id: 'doc5', name: 'Wheat', image: doc5, speciality: 'Plant' },
  { _id: 'doc6', name: 'Banana Plant', image: doc6, speciality: 'Plant' },
  { _id: 'doc7', name: 'Pumpkin Seeds', image: doc7, speciality: 'Seeds' },
  { _id: 'doc8', name: 'NPK fertilizers', image: doc8, speciality: 'Fertilizer' },
  { _id: 'doc20', name: 'Smallanthus', image: doc9, speciality: 'Plant' },
  { _id: 'doc10', name: 'DDT', image: doc10, speciality: 'Pesticides' },
  { _id: 'doc11', name: 'Sesame', image: doc11, speciality: 'Seed' },
  { _id: 'doc12', name: 'Soya', image: doc12, speciality: 'Seeds' },
  { _id: 'doc13', name: 'Dr. Zoe Kelly', image: doc13, speciality: 'Plant' },
  { _id: 'doc14', name: 'Bamboo', image: doc14, speciality: 'Plant' },
  { _id: 'doc15', name: 'Rice Plants', image: doc15, speciality: 'Plant' },
  { _id: 'doc17', name: 'Chick Piece', image: doc17, speciality: 'Plant' },
  { _id: 'doc19', name: 'Masoor Dal', image: doc19, speciality: 'Plant' },
  { _id: 'doc16', name: 'Urea', image: doc16, speciality: 'Plant' },
  { _id: 'doc18', name: 'Bajra', image: doc18, speciality: 'Plant' },

];





const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse Your Product.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={topDoctorImages[index]?.image || item.image}
                  alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Availabe' : 'Not Availabe'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{topDoctorImages[index]?.name || item.name}</p>
                  <p className='text-gray-600 text-sm'>{topDoctorImages[index]?.speciality || item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors