import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-4xl mx-auto text-center">

            <img src="/404_Img.png" alt="404 Error - Page Not Found" className='md:w-[60%] w-full' />

            <p className="text-gray-700 mt-7 text-3xl md:text-4xl font-semibold tracking-wide">
                Sorry, it looks like the page you're looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-10 py-3 text-sm font-semibold mt-6 border-2 bg-[#2A586F] text-white rounded-md hover:bg-[#1f4457] transition-all"
            >
                Back to Home
            </button>

        </div>
    );
};

export default ErrorPage;