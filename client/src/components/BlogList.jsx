import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from "framer-motion"; // Note: framer-motion is often preferred for more complex animations
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const { blogs, input } = useAppContext();

    const filteredBlogs = () => {
        if (input === '') {
            return blogs;
        }
        return blogs.filter((blog) =>
            blog.title.toLowerCase().includes(input.toLowerCase()) ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        );
    };

    return (
        <div className='my-24'>
            <div className='flex justify-center gap-4 sm:gap-6 my-12 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        {/* Enhanced button styling */}
                        <button
                            onClick={() => setMenu(item)}
                            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                menu === item ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {item}
                            {menu === item && (
                                <motion.div
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute inset-0 -z-1 bg-primary rounded-full'
                                ></motion.div>
                            )}
                        </button>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-32'>
                {filteredBlogs()
                    .filter((blog) => (menu === "All" ? true : blog.category === menu))
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>
        </div>
    );
};

export default BlogList;
