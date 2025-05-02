import React, { useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Customers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="p-4">

                

                </div>
            </div>
        </div>
    )
}

export default Customers
