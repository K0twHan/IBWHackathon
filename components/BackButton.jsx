"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    const handleClick = () => {
        window.location.href = '/dashboard';
    };

    return (
        <button
            onClick={handleClick}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
            style={{
                background: "#8B626C"
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Panoya Dön
        </button>
    );
};

export default BackButton;