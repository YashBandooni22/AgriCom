import React from 'react';
import mario from "../assets/farner.png"; // Image source
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='flex bg-white rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

      {/* Left side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 flex flex-col items-start'> {/* Added flex-col */}
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-green-600'>
          <p>Shop Quality Farm Products</p>
          <p className='mt-4'>Trusted by 10,000+ Farmers Across India</p>
        </div>
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
          className='bg-green-600 text-sm sm:text-base text-white px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
        >
          Start Shopping
        </button>
      </div>

      {/* Right side */}
      <div className='hidden md:block md:w-1/2 lg:w-[450px] relative'>
        <img
          className='w-full h-[100%] object-cover absolute bottom-0 right-0 max-w-[500px]'
          src={mario} // replace with a buyer-centric image
          alt="Farm Shopping"
        />
      </div>

    </div>
  );
};

export default Banner;
