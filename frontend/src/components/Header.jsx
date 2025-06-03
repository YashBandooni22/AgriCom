import React from 'react'
import { assets } from '../assets/assets.js'
import banner from "../assets/banner2.jpg";

const Header = () => {
  return (
    <div
      className='relative w-full h-[60vh] bg-no-repeat bg-center bg-cover rounded-lg flex items-center justify-start px-6 md:px-10 lg:px-20'
      style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover' }}
    >

      {/* Text content directly on image */}
      <div className='z-10 max-w-2xl space-y-6 text-green-600'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>
          Book Purchases <br /> With Trusted Source
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-sm font-light'>
          <img className='w-24' src={assets.group_profiles} alt="Profiles" />
          <p>
            Browse our trusted productsist and
            <br className='hidden sm:block' />
            get  your Products easily.
          </p>
        </div>

        <a
          href="#speciality"
          className='inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full text-sm hover:scale-105 transition-all duration-300'
        >
          Our Products <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

    </div>
  )
}

export default Header;
