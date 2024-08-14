"use client"

import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import QRCode, { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import config from "../../../getJson/config.json";
import {
    Koh_Santepheap
} from 'next/font/google'



const kohSantepheap = Koh_Santepheap({
    weight: '700',
    subsets: ['latin'],
})



const SignUpUserPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        birthday: '',
        email: '',
        gender: '',
        address: '',
        walletAddress: '',
        password: ''
    });
    const [qrCodeData, setQrCodeData] = useState(null);

    const checkWalletConnection = async () => {
        if (typeof (window as any).ethereum !== 'undefined') {
            try {
                const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setFormData(currentFormData => ({
                        ...currentFormData,
                        walletAddress: accounts[0]
                    }));
                }
            } catch (error) {
                console.error("Hata:", error);
            }
        }
    };

    useEffect(() => {
        checkWalletConnection();
    }, []);

    // Use another useEffect to log the updated formData
    useEffect(() => {
        console.log("Updated Wallet Address: ", formData.walletAddress);
    }, [formData.walletAddress]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (typeof (window as any).ethereum === 'undefined') {
            alert('Please install MetaMask to use this feature');
            return;
        }


        try {
            await (typeof window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
                config.tokenAbi,
                signer
            );

            const tx = await contract.approve(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, ethers.parseEther("100"));

            await tx.wait();

            console.log('Approve transaction successful');

            const response = await fetch('/api/users/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();

            setQrCodeData(result.qrCodeDataURL);
            console.log('Data submitted successfully');
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <>

            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "143px",
                    left: "500px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "36px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Tell us about yourself
            </span>
            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "310px",
                    left: "95px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Name
            </span>
            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "310px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Surname
            </span>
            <input
                type="text"
                className={kohSantepheap.className}
                name='surname'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "374px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"
                }}
                placeholder='Surname'
            />
            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "504px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Birthday
            </span>
            <input
                type="date"
                className={kohSantepheap.className}
                name='birthday'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "604px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"
                }}
                placeholder='Birthday'
            />
            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "504px",
                    left: "97px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                E-mail
            </span>
            <input
                type="email"
                className={kohSantepheap.className}
                name='email'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "604px",
                    left: "97px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"
                }}
                placeholder='Email'
            />

            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "698px",
                    left: "97px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Gender
            </span>
            <select
                className={kohSantepheap.className}
                name='gender'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "788px",
                    left: "97px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"
                }}
            >
                <option value='true'>Male</option>
                <option value='false'>Female</option>
            </select>

            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "698px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Address
            </span>
            <textarea
                className={kohSantepheap.className}
                name='address'
                onChange={handleChange}
                style={{
                    width: "400px",
                    height: "150px",
                    top: "788px",
                    left: "976px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"
                }}
                placeholder='Address'
            />


            <input
                type="text"
                className={kohSantepheap.className}
                name='name'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "374px",
                    left: "95px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"

                }}
                placeholder='Name'
            />
            <span
                className={kohSantepheap.className}
                style={{
                    width: "550px",
                    height: "47px",
                    top: "870px",
                    left: "95px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    display: "inline-block",

                }}>
                Password
            </span>
            <input
                type="password"
                className={kohSantepheap.className}
                name='password'
                onChange={handleChange}
                style={{
                    width: "378px",
                    height: "59px",
                    top: "950px",
                    left: "95px",
                    position: "absolute",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "83.09px",
                    letterSpacing: "0.06em",
                    display: "inline-block",
                    background: "#D9D9D9",
                    borderRadius: "12px",
                    paddingLeft: "20px"

                }}
                placeholder='Password'
            />

            <button
             className='black_btn buton_1'
             onClick={handleSubmit}
            >
                <span className={kohSantepheap.className}>Sign Up</span>
            </button>

              {/* QR Code Display */}
            {qrCodeData && (
                <div
                    style={{
                        position: "absolute",
                        top: "1400px",
                        left: "700px",
                    }}
                >
                    <h2 style={{textAlign: 'center'}}>Enable 2FA by scanning the QR code</h2>
                    <img src={qrCodeData} alt="QR Code" className="mx-auto" /> {/* Centered QR code */}
                </div>
            )}
        </>
    );
}

export default SignUpUserPage;