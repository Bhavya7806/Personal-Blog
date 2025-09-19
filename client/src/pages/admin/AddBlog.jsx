import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // IMPORTANT: Imports Quill's CSS for the editor to look correct
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
    // ----- NO CHANGES TO STATE OR LOGIC -----
    const { axios } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async () => {
        if (!title) return toast.error('Please enter a title');

        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title });
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true);

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            };

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            formData.append('image', image);

            const { data } = await axios.post('/api/blog/add', formData);

            if (data.success) {
                toast.success(data.message);
                setImage(false);
                setTitle('');
                setSubTitle('');
                quillRef.current.root.innerHTML = '';
                setCategory('Startup');
                setIsPublished(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            // Initialize Quill with a standard toolbar
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image', 'code-block'],
                        ['clean']
                    ]
                },
                placeholder: 'Write your content here...'
            });
        }
    }, []);
    // ----- END OF LOGIC SECTION -----

    return (
        <div className='p-4 sm:p-8 w-full h-full overflow-y-auto'>
            <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto bg-white p-6 md:p-8 shadow-md rounded-lg border border-gray-200/80 flex flex-col gap-6'>
                
                {/* Thumbnail Section */}
                <div>
                    <label htmlFor="image" className='text-base font-medium text-gray-800'>Upload thumbnail</label>
                    <div className='mt-2'>
                        <label htmlFor="image">
                            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='h-32 w-52 object-cover rounded-lg cursor-pointer border-2 border-dashed border-gray-300 p-2 hover:bg-gray-50 transition-colors' />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                        </label>
                    </div>
                </div>

                {/* Blog Title Section */}
                <div>
                    <label htmlFor="title" className='text-base font-medium text-gray-800'>Blog title</label>
                    <input id="title" type="text" placeholder='Give your blog a catchy title' required className='mt-2 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-shadow' onChange={e => setTitle(e.target.value)} value={title} />
                </div>

                {/* Sub Title Section */}
                <div>
                    <label htmlFor="subTitle" className='text-base font-medium text-gray-800'>Sub title</label>
                    <input id="subTitle" type="text" placeholder='A brief subtitle or hook' required className='mt-2 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-shadow' onChange={e => setSubTitle(e.target.value)} value={subTitle} />
                </div>
                
                {/* Description / Quill Editor Section */}
                <div>
                    <label className='text-base font-medium text-gray-800'>Blog Content</label>
                    <div className='mt-2 border rounded-lg overflow-hidden relative'>
                         <div ref={editorRef} className='min-h-60 bg-white'></div>
                         {loading && ( 
                            <div className='absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10'>
                                <div className='w-10 h-10 rounded-full border-4 border-gray-200 border-t-primary animate-spin'></div>
                                <span className='ml-4 text-gray-600'>Generating content...</span>
                            </div> 
                        )}
                    </div>
                    <button disabled={loading} type='button' onClick={generateContent} className='mt-3 flex items-center gap-2 text-sm text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 disabled:bg-primary/50 transition-colors'>
                       <img src={assets.star_icon} className='w-4 invert brightness-0' alt="AI Star"/> Generate with AI
                    </button>
                </div>

                {/* Category & Publish Section */}
                <div className='flex flex-wrap gap-8 items-center mt-4'>
                    <div>
                        <label htmlFor="category" className='text-base font-medium text-gray-800'>Blog category</label>
                        <select id="category" onChange={e => setCategory(e.target.value)} value={category} name="category" className='mt-2 block w-full max-w-xs p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white transition-shadow'>
                            {blogCategories.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className='flex items-center gap-3 pt-8'>
                        <input type="checkbox" id="publish" checked={isPublished} className='h-5 w-5 cursor-pointer accent-primary' onChange={e => setIsPublished(e.target.checked)} />
                        <label htmlFor="publish" className='text-base font-medium text-gray-800 cursor-pointer'>Publish Now</label>
                    </div>
                </div>
                
                {/* Submit Button */}
                <button disabled={isAdding} type="submit" className='mt-4 w-full sm:w-48 h-12 bg-green-500 text-white rounded-lg cursor-pointer text-base font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'>
                    {isAdding ? 'Adding...' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
