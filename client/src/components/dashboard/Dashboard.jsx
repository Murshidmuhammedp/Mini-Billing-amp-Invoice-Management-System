import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from './Navbar';
import customAxios from '../../api/axiosInstance';


Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const [dashboardlist, setdocdashboard] = useState([]);
    const [userdashboard, setuserdashboard] = useState([]);
    const [hospitaldashboard, sethospitaldashboard] = useState([]);
    const [donordashboard, setdonordashboard] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('Monthly');
    const tableheading = ["Sl.No", "Name", "Doctor Id", "Specialization", "Phone Number", "District"];
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const doctordashboard = async () => {
            const result = await customAxios.get('/admin/api/doctors/data/dashboard')
            setdocdashboard(result.data.data);
        }
        doctordashboard();
        const userdashboard = async () => {
            const result = await customAxios.get('/admin/api/userdata')
            setuserdashboard(result.data.data);
        }
        userdashboard();
        const hospitaldashboard = async () => {
            const result = await customAxios.get('/admin/api/hospital/data/dashboard')
            sethospitaldashboard(result.data.data);
        }
        hospitaldashboard();
        const donordashboard = async () => {
            const result = await customAxios.get('/admin/api/blood/donors')
            setdonordashboard(result.data.data);
        }
        donordashboard();
    }, []);

    const getFilteredData = () => {
        switch (filter) {
            case 'Today':
                return {
                    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
                    datasets: [
                        {
                            label: 'Moderate',
                            data: [150, 200, 250, 300, 350, 400, 450],
                            borderColor: 'rgba(76, 81, 191, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                gradient.addColorStop(0, 'rgba(76, 81, 191, 0.7)');
                                gradient.addColorStop(1, 'rgba(76, 81, 191, 0.1)');
                                return gradient;
                            },
                            pointBackgroundColor: '#4c51bf',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#4c51bf',
                            fill: true,
                        },
                        {
                            label: 'Spike Admin',
                            data: [120, 180, 240, 300, 360, 420, 480],
                            borderColor: 'rgba(56, 178, 172, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                gradient.addColorStop(0, 'rgba(56, 178, 172, 0.7)');
                                gradient.addColorStop(1, 'rgba(56, 178, 172, 0.1)');
                                return gradient;
                            },
                            pointBackgroundColor: '#38b2ac',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#38b2ac',
                            fill: true,
                        },
                    ],
                };
            case 'Weekly':
                return {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Moderate',
                            data: [1100, 1400, 1700, 2100, 2500, 2800, 3200],
                            borderColor: 'rgba(76, 81, 191, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                return gradient;
                            },
                            pointBackgroundColor: '#4c51bf',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#4c51bf',
                            fill: true,
                        },
                        {
                            label: 'Spike Admin',
                            data: [1000, 1300, 1600, 1900, 2200, 2500, 2800],
                            borderColor: 'rgba(56, 178, 172, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                return gradient;
                            },
                            pointBackgroundColor: '#38b2ac',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#38b2ac',
                            fill: true,
                        },
                    ],
                };
            case 'Monthly':
            default:
                return {
                    labels: ['14/04', '17/04', '19/04', '21/04', '26/04', '27/04', '29/04'],
                    datasets: [
                        {
                            label: 'Moderate',
                            data: [1200, 1900, 3000, 5000, 2300, 3200, 4100],
                            borderColor: 'rgba(76, 81, 191, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                return gradient;
                            },
                            pointBackgroundColor: '#4c51bf',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#4c51bf',
                            fill: true,
                        },
                        {
                            label: 'Spike Admin',
                            data: [2100, 1500, 2000, 3000, 3500, 4200, 2800],
                            borderColor: 'rgba(56, 178, 172, 1)',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                return gradient;
                            },
                            pointBackgroundColor: '#38b2ac',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#38b2ac',
                            fill: true,
                        },
                    ],
                };
        }
    };

    const lineOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                    color: '#9ca3af',
                },
                grid: {
                    display: false, // Hides x-axis grid lines
                },
            },
            y: {
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                    color: '#9ca3af',
                    callback: function (value) {
                        return new Intl.NumberFormat().format(value);
                    },
                },
                grid: {
                    color: '#e5e7eb', // Light grey grid lines
                },
            },
        },
        elements: {
            line: {
                tension: 0.4, // Smooth bezier curves
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)', // Semi-transparent background
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 12,
                },
                callbacks: {
                    label: function (tooltipItem) {
                        return (
                            tooltipItem.dataset.label +
                            ': ' +
                            new Intl.NumberFormat().format(tooltipItem.raw)
                        );
                    },
                },
            },
            legend: {
                display: true,
                position: 'top', // This should be correctly recognized now
                labels: {
                    color: '#1f2937',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 14,
                    },
                },
            },
            filler: {
                propagate: false,
            },
        },
    };

    const pieData = {
        labels: ['2022', '2021', '2020'],
        datasets: [
            {
                data: [300000, 150000, 50000],
                backgroundColor: ['#4c6ef5', '#22d3ee', '#10b981'], // Temporary colors, will be replaced by gradients
            },
        ],
    };

    const pieOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#1f2937',
                },
            },
            tooltip: {
                enabled: true,
            },
            beforeDraw: (chart) => {
                const { width, height, ctx } = chart;
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `${fontSize}em sans - serif`;
                ctx.textBaseline = 'middle';

                const text = '$500,458';
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            },
        },
    };

    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            const ctx = chart.ctx;
            const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
            gradient1.addColorStop(0, '#4c6ef5');
            gradient1.addColorStop(1, '#22d3ee');

            const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
            gradient2.addColorStop(0, '#22d3ee');
            gradient2.addColorStop(1, '#10b981');

            const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
            gradient3.addColorStop(0, '#10b981');
            gradient3.addColorStop(1, '#4c6ef5');

            chart.data.datasets[0].backgroundColor = [gradient1, gradient2, gradient3];
            chart.update();
        }
    }, []);


    const { route } = useParams()

    return (
        <>
            <div className="flex">
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex flex-col flex-grow">
                    <Navbar />
                    <div className="p-4">
                        {/* Add your main content here */}
                        {route !== 'dashboard' ? (< div className="p-8 flex-1 overflow-y-auto">
                            {/* Cards Section */}
                            <div className="p-8 flex-1 overflow-y-auto">
                                {/* Cards Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                                                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                                                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                                            </svg>
                                        </div>
                                        <div className="p-4 text-right">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Users</p>
                                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{userdashboard.length} nos</h4>
                                        </div>
                                        {/* <div className="border-t border-blue-gray-50 p-4">
                                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                                <strong className="text-green-500">+55%</strong>&nbsp;than last week
                                            </p>
                                        </div> */}
                                    </div>

                                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="p-4 text-right">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Hospital's</p>
                                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{hospitaldashboard.length} nos</h4>
                                        </div>
                                        {/* <div className="border-t border-blue-gray-50 p-4">
                                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                                <strong className="text-green-500">+3%</strong>&nbsp;than last month
                                            </p>
                                        </div> */}
                                    </div>

                                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                                            </svg>
                                        </div>
                                        <div className="p-4 text-right">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Doctor's</p>
                                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{dashboardlist.length} nos</h4>
                                        </div>
                                        {/* <div className="border-t border-blue-gray-50 p-4">
                                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                                <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
                                            </p>
                                        </div> */}
                                    </div>

                                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                                            </svg>
                                        </div>
                                        <div className="p-4 text-right">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Blood donor's</p>
                                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{donordashboard.length} nos</h4>
                                        </div>
                                        {/* <div className="border-t border-blue-gray-50 p-4">
                                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                                <strong className="text-green-500">+5%</strong>&nbsp;than yesterday
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                                {/* Line Chart */}
                                <div className="shadow-md p-6 rounded-lg col-span-3  bg-white ">
                                    <div className=''>

                                        <h3 className="text-xl font-bold text-start">Revenue Updates</h3>
                                        <p className="text-start mb-4">Overview of Profit</p>
                                        <div className="text-end mb-4">
                                            <select
                                                // value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                                            >
                                                <option value="Today">Today</option>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Monthly">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ height: '300px' }}>
                                        <Line data={getFilteredData()} options={lineOptions} />
                                    </div>
                                </div>

                                {/* Pie Chart */}
                                <div className="shadow-md p-6 rounded-lg w-full bg-white">
                                    <h3 className="text-xl font-bold text-center">Yearly Updates</h3>
                                    <p className="text-2xl text-center mb-4">$500,458</p>
                                    <div style={{ height: '300px' }}>
                                        <Pie data={pieData} options={pieOptions} ref={chartRef} />
                                    </div>
                                </div>
                            </div>

                            {/* Table Section */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Doctor's List</h3>
                                <table className="min-w-full bg-white border-collapse">
                                    <thead>
                                        <tr>
                                            {tableheading && tableheading.map((data, index) => (
                                                <th key={index} className="py-2 px-4 border-b">{data}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboardlist && dashboardlist.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{data.full_Name}</td>
                                                    <td className="py-2 px-4 border-b">{data.doctor_ID}</td>
                                                    <td className="py-2 px-4 border-b">{data.specialization}</td>
                                                    <td className="py-2 px-4 border-b">{data.phone_Number}</td>
                                                    <td className="py-2 px-4 border-b">{data.district}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        ) : route === "notification" ? (<ListingAndApprovingUsers />) : route === 'userlists' ? (<AdminUsers />) : route === 'workerslist' ? <AdminWorkers /> : route === 'orderslist' ? (<Card />) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;