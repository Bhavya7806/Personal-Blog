import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
    // ----- NO CHANGES TO STATE OR LOGIC -----
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('Not Approved');
    const { axios } = useAppContext();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('/api/admin/comments');
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);
    // ----- END OF LOGIC SECTION -----

    // Styled component for filter buttons for cleaner code
    const FilterButton = ({ label }) => (
        <button
            onClick={() => setFilter(label)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === label
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
        >
            {label}
        </button>
    );

    const filteredComments = comments.filter((comment) => {
        if (filter === "Approved") return comment.isApproved === true;
        return comment.isApproved === false;
    });

    return (
        <div className='flex-1 p-6 md:p-10'>
            {/* Enhanced Page Header */}
            <div className='flex flex-wrap justify-between items-center gap-4 mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Comments</h1>
                <div className='flex gap-3'>
                    <FilterButton label="Not Approved" />
                    <FilterButton label="Approved" />
                </div>
            </div>

            {/* Enhanced Table Container */}
            <div className='relative overflow-x-auto shadow-sm rounded-lg border bg-white'>
                <table className="w-full text-sm text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left">Blog Title & Comment</th>
                            <th scope="col" className="px-6 py-4 text-left max-sm:hidden">Date</th>
                            <th scope="col" className="px-6 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.length > 0 ? (
                            filteredComments.map((comment, index) => (
                                <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />
                            ))
                        ) : (
                            // Empty state message when no comments are found
                            <tr>
                                <td colSpan="3" className="text-center py-10 text-gray-500">
                                    No {filter.toLowerCase()} comments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;
