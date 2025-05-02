import React from 'react';
import { FaTachometerAlt, FaUsers, FaUserTie, FaRegStar, FaClipboardList, FaBell, FaSignOutAlt, FaBars, FaHandHoldingHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {

    const navigate = useNavigate();

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
                <Link to={'/admin/home/dashboard'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaTachometerAlt className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Dashboard</span>}
                    </li>
                </Link>
                <Link to={'/admin/userlist'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaUsers className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">User's List</span>}
                    </li>
                </Link>
                <Link to={'/admin/doctorlist'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaUserTie className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Doctor's List</span>}
                    </li>
                </Link>
                <Link to={'/admin/pendingrequest'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaUserTie className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Pending Request</span>}
                    </li>
                </Link>
                <Link to={'/admin/blooddonors'}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaHandHoldingHeart className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Blood Donor's List</span>}
                    </li>
                </Link>
                <Link to={''}>
                    <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        <FaClipboardList className="mr-4 text-gray-800" />
                        {sidebarOpen && <span className="w-full">Blood Request</span>}
                    </li>
                </Link>
                <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center" onClick={() => { navigate('/admin/login'); localStorage.clear(); }}>
                    <FaSignOutAlt className="mr-4 text-gray-800" />
                    {sidebarOpen && <span className="w-full">Logout</span>}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;