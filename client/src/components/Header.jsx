import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative pt-16 pb-12'>
      <div className='text-center mt-12 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-6 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary hover:shadow-md transition-shadow'>
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className='w-3 animate-pulse' alt="" />
        </div>

        <h1 className='text-4xl sm:text-7xl font-bold sm:leading-tight text-gray-800'>
          Your Personal
          {/* Added a modern gradient effect to the text */}
          <span className='block mt-2 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent'>
            Blogging Platform
          </span>
        </h1>

        <p className='my-8 max-w-2xl mx-auto text-gray-600 md:text-lg'>
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
        </p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-xl mx-auto border border-gray-300 bg-white rounded-full overflow-hidden shadow-lg shadow-gray-200/50 focus-within:ring-2 focus-within:ring-primary transition-all'>
          <input
            ref={inputRef}
            type="text"
            placeholder='Search for blogs...'
            required
            className='w-full pl-6 text-gray-700 outline-none bg-transparent'
          />
          <button type="submit" className='bg-primary text-white px-8 py-3 m-1 rounded-full hover:bg-primary/90 transition-all cursor-pointer transform hover:scale-105'>
            Search
          </button>
        </form>
      </div>

      <div className='text-center h-6'>
        {input && (
          <button onClick={onClear} className='border bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-1 px-4 rounded-full transition-colors cursor-pointer'>
            Clear Search: "{input}" &times;
          </button>
        )}
      </div>

      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-40' />
    </div>
  );
};

export default Header;
