import React from 'react';

const Newsletter = () => {
  return (
    // Wrapped in a section with a background and padding for better visual separation
    <div className='bg-slate-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-3xl px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-3'>
        <h1 className='md:text-4xl text-3xl font-bold text-gray-900'>Never Miss a Blog!</h1>
        <p className='md:text-lg text-gray-600 pb-8'>
          Subscribe to get the latest blog, new tech, and exclusive news.
        </p>
        <form className='flex items-center justify-between max-w-2xl w-full h-14 shadow-lg shadow-gray-200/50 rounded-full overflow-hidden border'>
          <input
            className='border-none h-full outline-none w-full px-6 text-gray-600 bg-white placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/50'
            type="email"
            placeholder='Enter your email id'
            required
          />
          <button
            type='submit'
            className='px-8 h-full text-white bg-primary hover:bg-primary/90 transition-all cursor-pointer font-semibold'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
