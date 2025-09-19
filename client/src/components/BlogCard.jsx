import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    // Added 'group' for parent-hover effects and refined shadows/transitions
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='group w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-gray-200/80'
    >
      <div className='overflow-hidden'>
        <img src={image} alt="" className='w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500' />
      </div>
      <div className='p-5'>
        <span className='mb-4 px-3 py-1 inline-block bg-primary/10 rounded-full text-primary text-xs font-semibold'>
          {category}
        </span>
        <h5 className='my-2 text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300'>
          {title}
        </h5>
        {/* Improved text styling for the description */}
        <div
          className='mb-3 text-sm text-gray-600 leading-relaxed'
          dangerouslySetInnerHTML={{ __html: description.slice(0, 100) + '...' }}
        ></div>
      </div>
    </div>
  );
};

export default BlogCard;
