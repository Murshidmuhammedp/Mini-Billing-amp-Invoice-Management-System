import React from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaSignOutAlt, FaBars, FaBoxOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import customAxios from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await customAxios.post('/api/auth/logout')
            toast.success(response.data.message);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={`bg-gray-100 text-gray-800 flex flex-col transition-width duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} shadow-md `}>
            {/* Sidebar Header */}
            {sidebarOpen ? (
                <div className="p-4 text-center text-xl font-bold bg-gray-100 flex justify-between items-center">
                    <span style={{ fontFamily: 'inria-serif' }} className=" text-3xl font-bold text-blue-900 ">Inventory Management</span>
                    <FaBars className="cursor-pointer text-gray-800" onClick={toggleSidebar} />
                </div>
            ) : (
                <div className="p-4 text-center text-xl font-bold bg-gray-100 flex justify-between items-center">
                    <FaBars className="cursor-pointer text-gray-800" onClick={toggleSidebar} />
                </div>
            )}
            {/* Sidebar Menu */}
            <ul className="list-none p-0 flex-1">
                <Link to={'/dashboard'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaTachometerAlt className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Dashboard</span>}
                    </li>
                </Link>
                <Link to={'/customers'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaUsers className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Customers</span>}
                    </li>
                </Link>
                <Link to={'/products'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaBoxOpen className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Products</span>}
                    </li>
                </Link>
                <Link to={'/sales'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaClipboardList className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Sales</span>}
                    </li>
                </Link>
                <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center"
                    onClick={() => {
                        localStorage.clear();
                        handleLogout();
                        navigate('/');
                    }}>
                    <FaSignOutAlt className="mr-4 text-gray-800" />
                    {sidebarOpen && <span className="w-full">Logout</span>}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;