"use client"

import React, { useState } from 'react';
import Link from 'next/link';


const SignUpPage = () => {
    const [showComponent, setShowComponent] = useState('');

    const handleShowComponent = (componentName) => {
        setShowComponent(componentName);
    };

    return (
        <div className="flex items-center justify-center" style={{ borderRadius: 20, width: '100%', height: '500px' }}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ borderRadius: 20, width: 500 }}>
                <div className="mb-4 flex justify-center space-x-4 pt-50" style={{ marginTop: '30px' }}>
                    <Link href="/signup-user" className='flex gap-2 items-center'>
                        <button
                            className="bg-black hover:bg-white text-white  hover:text-black font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                            style={{ borderRadius: 10, fontSize: '16px', border: '1px solid black' }}
                            onClick={() => handleShowComponent('user')}
                        >
                            User
                        </button>
                    </Link>
                    <Link href="/signup-author" className='flex gap-2 items-center'>
                        <button
                            className="bg-black hover:bg-white text-white  hover:text-black font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                            style={{ borderRadius: 10, fontSize: '16px', border: '1px solid black' }}
                            onClick={() => handleShowComponent('author')}
                        >
                            Author
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default SignUpPage;