import React from 'react';
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-900 text-gray-300'>
      <div className='grid md:grid-cols-3 gap-12 py-16 border-b border-gray-700'>
        <div className='md:col-span-1'>
          {/* APPLYING THE CSS FILTER HERE */}
          <img 
            src={assets.logo} 
            alt="logo" 
            className='w-32 sm:w-44 brightness-0 invert' 
          />
          <p className='max-w-xs mt-6 text-sm leading-relaxed'>
            QuickBlog is your space to share ideas, explore insights, and stay updated with fresh stories.
            Discover blogs across technology, startups, lifestyle, and more.
          </p>
        </div>

        <div className='md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-white mb-5'>{section.title}</h3>
              <ul className='text-sm space-y-3'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className='hover:text-white transition-colors duration-200'>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className='py-6 text-center text-sm text-gray-500'>
        Copyright 2025 © QuickBlog GreatStack - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
