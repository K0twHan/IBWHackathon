"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import config from "../../../getJson/config.json";

const SignInUserPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFACode, setTwoFACode] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [show2FA, setShow2FA] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.token);
                setUserId(data.userId);
                sessionStorage.setItem('userid', data.userId);
                sessionStorage.setItem('walletaddress', data.walletAddress);
                setWalletAddress(data.walletAddress);
                setShow2FA(true); // 2FA alanını göster
                alert('Sign in successful. Please verify your 2FA code.');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            alert('An error occurred during sign in');
        }
    };

    const handleVerify2FA = async () => {
        try {
            const response = await fetch('/api/user/2FA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ twoFACode, email }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('2FA verified successfully');
                sessionStorage.setItem('token', authToken);
                checkSubscription(); // 2FA doğrulandıktan sonra aboneliği kontrol et
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during 2FA verification:', error);
            alert('An error occurred during 2FA verification');
        }
    };

    const checkSubscription = async () => {
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
        const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

        if (!contractAddress || !rpcUrl || !privateKey) {
            alert('Environment variables are missing');
            return;
        }

        try {
            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(contractAddress, config.contractAbi, wallet);
            
            const userId = sessionStorage.getItem('userid');
            console.log("userId: ", userId);
            const statusResult = await contract.getSubscriptionStatus(Number(userId));
            console.log("statusResult: ", statusResult);
            if (statusResult[0]) { 
                alert("Subscription is active: " + statusResult[1]);
            } else {
                const amount = ethers.parseEther("1.0");
                const userAddress = sessionStorage.getItem('walletaddress');
                console.log("userAddress: ", userAddress);
                const checkResult = await contract.checkSubDate(Number(userId), amount, userAddress)
                console.log("checkResult: ", checkResult);
                alert(checkResult[1]);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
            alert('An error occurred while checking the subscription');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center" style={{ borderRadius: 20, width: '100%', minHeight: '100vh' }}>
            <form onSubmit={handleSignIn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ borderRadius: 20, width: 500 }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        style={{ fontSize: '16px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        style={{ fontSize: '16px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                        style={{ borderRadius: 10, fontSize: '16px' }}
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>

            {show2FA && (
                <>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="twoFACode">
                            2FA Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="twoFACode"
                            type="text"
                            placeholder="2FA Code"
                            style={{ fontSize: '16px' }}
                            value={twoFACode}
                            onChange={(e) => setTwoFACode(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleVerify2FA}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Verify 2FA
                    </button>
                </>
            )}

            <button
                onClick={checkSubscription}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Check Subscription
            </button>
        </div>
    );
};

export default SignInUserPage;
