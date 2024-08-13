"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcının giriş yapıp yapmadığını kontrol eden state

  useEffect(() => {
    checkWalletConnection();
    checkUserLoginStatus(); // Kullanıcının giriş durumunu kontrol eden fonksiyonu çağırın
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      }
    } else {
      alert("Lütfen MetaMask yükleyin!");
    }
  };

  const checkUserLoginStatus = () => {
    // Burada kullanıcının giriş yapıp yapmadığını kontrol eden bir işlem yapabilirsiniz.
    // Örneğin, token'in olup olmadığını kontrol edebilirsiniz.
    const token = sessionStorage.getItem('token'); // Örneğin, token'i sessionStorage'dan alıyorsunuz
    if (token) {
      setIsLoggedIn(true); // Kullanıcı giriş yapmışsa isLoggedIn state'ini true yapın
    }
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 items-center'>
        <Image
          src="/assets/images/logo.png"
          alt='BlogChain Logo'
          width={100}
          height={100}
          className='object-contain'
        />
      </Link>

      <div className="sm:flex hidden">
        <button
          onClick={connectWallet}
          className='black_btn'
          style={{
            background: "#8B626C",
            color: "white"
          }}
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect"}
        </button>

        {isLoggedIn ? ( // isLoggedIn true ise, profil ve blog oluşturma butonlarını göster
          <div className='flex gap-3 md:gap-5' style={{ marginLeft: "20px" }}>
            <Link href="/create-blog" className='black_btn' style={{ background: "#8B626C", color: "white" }}>Create Blog</Link>
            <Link className="outline_btn" style={{ background: "#8B626C", color: "white" }} href="/profile" type='button'>Profile</Link>
          </div>
        ) : ( // Aksi takdirde, Sign In butonunu göster
          <>
            <Link href="/signin" className='black_btn' style={{ background: "#8B626C", color: "white", "marginLeft": "30px" }}>Sign In</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav;
