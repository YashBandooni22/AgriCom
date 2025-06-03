import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import item1 from '../assets/item1.png';
import item2 from '../assets/item2.png';
import item3 from '../assets/item3.png';
import item4 from '../assets/item4.png';
import item5 from '../assets/item5.png';
import item6 from '../assets/item6.png';
import item7 from '../assets/item7.png';
import item8 from '../assets/item8.png';
import item9 from '../assets/item20.png';
import item10 from '../assets/item21..png';
import item11 from '../assets/item11.png';
import item12 from '../assets/item12.png';
import item13 from '../assets/item13.png';
import item14 from '../assets/item14.png';
import item15 from '../assets/item15.png';

const topitemtorImages = [
  { _id: 'item1', name: 'Basil Seeds', image: item1, speciality: 'Seed' },
  { _id: 'item2', name: 'Potato Plant', image: item2, speciality: 'Plant' },
  { _id: 'item3', name: 'Tomato', image: item3, speciality: 'Plant' },
  { _id: 'item4', name: 'Corn Plant', image: item4, speciality: 'Crop' },
  { _id: 'item5', name: 'Wheat', image: item5, speciality: 'Plant' },
  { _id: 'item6', name: 'Banana Plant', image: item6, speciality: 'Plant' },
  { _id: 'item7', name: 'Pumpkin Seeds', image: item7, speciality: 'Seeds' },
  { _id: 'item8', name: 'NPK fertilizers', image: item8, speciality: 'Fertilizer' },
  { _id: 'item20', name: 'Smallanthus', image: item9, speciality: 'Plant' },
  { _id: 'item10', name: 'DDT', image: item10, speciality: 'Pesticides' },
  { _id: 'item11', name: 'Sesame', image: item11, speciality: 'Seed' },
  { _id: 'item12', name: 'Soya', image: item12, speciality: 'Seeds' },
  { _id: 'item13', name: 'Dr. Zoe Kelly', image: item13, speciality: 'Plant' },
  { _id: 'item14', name: 'Bamboo', image: item14, speciality: 'Plant' },
  { _id: 'item15', name: 'Rice Plants', image: item15, speciality: 'Plant' },
];

const Topitemtors = () => {
  const navigate = useNavigate();
  const { itemtors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Products</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted Products
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {itemtors.slice(0, 8).map((item, index) => (
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
                src={topitemtorImages[index]?.image || item.image}
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
                {topitemtorImages[index]?.name}
              </p>
              <p className='text-gray-600 text-sm leading-tight'>{topitemtorImages[index]?.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/itemtors');
          scrollTo(0, 0);
        }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  );
};

export default Topitemtors;
