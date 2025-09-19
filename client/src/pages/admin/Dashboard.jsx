import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    });

    const { axios } = useAppContext();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard');
            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    // Reusable styled component for the stat cards for a cleaner look
    const StatCard = ({ icon, value, label, color }) => (
        <div className='flex items-center gap-5 bg-white p-5 min-w-60 rounded-lg shadow-sm border border-gray-200/80 hover:shadow-lg transition-all'>
            <div className={`p-4 rounded-full ${color}`}>
                <img src={icon} alt="" className='w-8 h-8' />
            </div>
            <div>
                <p className='text-3xl font-bold text-gray-800'>{value}</p>
                <p className='text-gray-500'>{label}</p>
            </div>
        </div>
    );

    return (
        <div className='flex-1 p-6 md:p-10'>
            <h1 className='text-3xl font-bold text-gray-800 mb-8'>Dashboard</h1>
            <div className='flex flex-wrap gap-6'>
                <StatCard icon={assets.dashboard_icon_1} value={dashboardData.blogs} label="Total Blogs" color="bg-blue-100" />
                <StatCard icon={assets.dashboard_icon_2} value={dashboardData.comments} label="Total Comments" color="bg-green-100" />
                <StatCard icon={assets.dashboard_icon_3} value={dashboardData.drafts} label="Drafts" color="bg-yellow-100" />
            </div>

            <div className='mt-12'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Latest Blogs</h2>
                <div className='relative overflow-x-auto border shadow-sm rounded-lg bg-white'>
                    <table className='w-full text-sm text-gray-600'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>#</th>
                                <th scope='col' className='px-6 py-3 text-left'>Blog Title</th>
                                <th scope='col' className='px-6 py-3 text-left max-sm:hidden'>Date</th>
                                <th scope='col' className='px-6 py-3 text-left max-sm:hidden'>Status</th>
                                <th scope='col' className='px-6 py-3 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => (
                                <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
