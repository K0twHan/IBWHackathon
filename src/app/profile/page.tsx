"use client"
import React, { useState, useEffect } from 'react';
import { contractAbi } from "../../../getJson/config.json";
import { ethers } from 'ethers';

const Profile = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        surname: '',
        email: '',
        birthday: '',
        gender: '',
        address: '',
        walletAddress: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkWalletConnection = async () => {
        if (typeof (window as any).ethereum !== 'undefined') {
            try {
                const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    const walletAddress = accounts[0];
                    setUser(currentUser => ({
                        ...currentUser,
                        walletAddress: walletAddress
                    }));
                    console.log("Wallet address:", walletAddress);
                } else {
                    console.log("No accounts found");
                }
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            console.log("MetaMask is not installed");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Kullanıcı bilgileri alınamadı');
                }
                const data = await response.json();
                console.log(data.user.id);
                if (data.user.sex === false) {
                    data.user.sex = "Kadın";
                } else if (data.user.sex === true) {
                    data.user.sex = "Erkek";
                }
                setUser(currentUser => ({
                    ...currentUser,
                    name: data.user.name,
                    surname: data.user.surname,
                    email: data.user.email,
                    birthday: data.user.birthday,
                    gender: data.user.sex,
                    address: `${data.user.address}`,
                    id: data.user.id
                }));
            } catch (err) {
                setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        checkWalletConnection();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
            const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractAbi, wallet);
            const userID = user.id;

            const tx = await contract.updateAddress(userID, user.walletAddress);

            await tx.wait();

            console.log("Blockchain transaction successful");

            const response = await fetch('/api/user/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Profil güncellenirken bir hata oluştu');
            }

            alert('Profil başarıyla güncellendi!');
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center mt-12 text-xl">Yükleniyor...</div>;
    if (error) return <div className="text-center mt-12 text-xl text-red-500">{error}</div>;

    return (
        <div className="container mx-auto mt-12 px-6 text-gray-900">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto" style={{ background: "#CE671D" }}>
                <h1 className="text-4xl font-bold mb-8 text-center">Profil Bilgileri</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="name" className="text-xl font-semibold mb-3 block">İsim</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="text-xl font-semibold mb-3 block">Soyisim</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={user.surname}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-xl font-semibold mb-3 block">E-posta</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="birthday" className="text-xl font-semibold mb-3 block">Doğum Tarihi</label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={user.birthday.split('T')[0]} // Format date to yyyy-mm-dd
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="text-xl font-semibold mb-3 block">Cinsiyet</label>
                        <select
                            id="gender"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            style={{ background: "#D9D9D9" }}
                        >
                            <option value="Erkek">Erkek</option>
                            <option value="Kadın">Kadın</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="text-xl font-semibold mb-3 block">Adres</label>
                        <textarea
                            id="address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg text-lg"
                            rows={3}
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                </div>
                <div className="md:col-span-2 mt-4">
                    <label htmlFor="walletAddress" className="text-xl font-semibold mb-3 block">Wallet Adresi</label>
                    <input
                        type="text"
                        id="walletAddress"
                        name="walletAddress"
                        value={user.walletAddress}
                        readOnly
                        className="w-full p-2 border rounded-lg text-lg"
                        style={{ background: "#D9D9D9" }}
                    />
                </div>
                <div className="mt-10 text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg" style={{ background: "#8B626C" }}>
                        Profili Güncelle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
