import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const { axios, setToken, navigate } = useAppContext();

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        navigate('/');
    };

    return (
        <>
            {/* Enhanced Header with shadow and better padding */}
            <div className='flex items-center justify-between h-[70px] px-4 sm:px-12 border-b bg-white shadow-sm'>
                <img
                    src={assets.logo}
                    alt=""
                    className='w-32 sm:w-40 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={logout}
                    className='text-sm px-6 py-2 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full cursor-pointer'
                >
                    Logout
                </button>
            </div>
            {/* Consistent background for all admin pages */}
            <div className='flex h-[calc(100vh-70px)] bg-slate-50'>
                <Sidebar />
                <div className='flex-1 h-full overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
