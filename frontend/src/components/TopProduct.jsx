import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';
import doc6 from '../assets/doc6.png';
import doc7 from '../assets/doc7.png';
import doc8 from '../assets/doc8.png';
import doc9 from '../assets/doc20.png';
import doc10 from '../assets/doc21..png';
import doc11 from '../assets/doc11.png';
import doc12 from '../assets/doc12.png';
import doc13 from '../assets/doc13.png';
import doc14 from '../assets/doc14.png';
import doc15 from '../assets/doc15.png';

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
];

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Products</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted Products
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 8).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className='flex flex-col border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md'
          >
            <div className='w-full h-48'>
              <img
                className='w-full h-full object-cover'
                src={topDoctorImages[index]?.image || item.image}
                alt={item.name}
              />
            </div>
            <div className='p-3 bg-white'>
              <div
                className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}
              >
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-base font-semibold leading-tight'>
                {topDoctorImages[index]?.name}
              </p>
              <p className='text-gray-600 text-sm leading-tight'>{topDoctorImages[index]?.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
