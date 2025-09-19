import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    // Added sticky positioning, background blur, and a subtle border
    <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm'>
      <div className='flex justify-between items-center py-4 mx-8 sm:mx-20 xl:mx-32'>
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="logo"
          className='w-32 sm:w-44 cursor-pointer transition-transform duration-300 hover:scale-105'
        />
        <button
          onClick={() => navigate('/admin')}
          className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-primary/90 text-white px-8 py-2.5 transition-all duration-300 ease-in-out transform hover:scale-105'
        >
          {token ? 'Dashboard' : 'Login'}
          <img src={assets.arrow} className='w-3' alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
