"use client"

import React from 'react';

const SignInAuthorPage = () => {
    return (
        <div className="flex items-center justify-center" style={{ borderRadius: 20, width: '100%', height: '500px' }}>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ borderRadius: 20, width: 500 }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" style={{ fontSize: '16px' }} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" style={{ fontSize: '16px' }} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline" style={{ borderRadius: 10, fontSize: '16px' }} type="button">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInAuthorPage;