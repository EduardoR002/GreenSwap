import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GreenSwap from '../images/GreenSwap.png';
import '../CSS/navbar.css';
import { validateToken } from './home';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let vt_res = await validateToken();
      setRole(vt_res.role);
      setLoggedin(!!vt_res.role);
    };

    fetchData();
  }, []);

  // Function that will logout user from website, deleting is token
  const Logout = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const formData = { 
        token: token 
    };

    try {
        const response = await fetch('http://localhost:3000/tokens/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Limpar o token do cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log("Usuário deslogado com sucesso");
            // Redirecionar para a página de login ou home
            window.location.href = './home';
        } else {
            console.error("Falha ao deslogar");
            // Lidar com falha no logout
        }
    } catch (error) {
        console.error("Erro ao deslogar:", error);
        // Lidar com erro de rede ou servidor
    }
  };

  return (
    <div className="navbar-container-05">
      <div className="tocenter-05">
        <svg xmlns="http://www.w3.org/2000/svg" width="222" height="183" viewBox="0 0 222 183" fill="none">
          <path d="M222 72C222 133.304 172.304 183 111 183C49.6964 183 0 133.304 0 72C0 10.6964 49.6964 -39 111 -39C172.304 -39 222 10.6964 222 72Z" fill="#042C3B" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="205" height="175" viewBox="0 0 205 175" fill="none">
          <path d="M205 72.5C205 129.109 159.109 175 102.5 175C45.8908 175 0 129.109 0 72.5C0 15.8908 45.8908 -30 102.5 -30C159.109 -30 205 15.8908 205 72.5Z" fill="#FFFFFF" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="145" height="145" viewBox="0 0 145 145" fill="none">
          <path d="M145 72.5C145 112.541 112.541 145 72.5 145C32.4594 145 0 112.541 0 72.5C0 32.4594 32.4594 0 72.5 0C112.541 0 145 32.4594 145 72.5Z" fill="#042C3B" />
        </svg>
        <Link to="../home">
          <img src={GreenSwap} className="icon-05" alt="GreenSwap Icon" />
        </Link>
      </div>
      <div className="full-section-container-05">
        <div className="left-section-container-05">
          {role !== "certifier" ? (
            <>
              <div className="section-05">
              <Link to="../ranking" className="Link a-05 poppins-regular">Ranking</Link>
            </div>
            <div className="section-05">
              <Link to="../orders" className="Link a-05 poppins-regular">Orders</Link>
            </div>
            <div className="section-05">
              <Link to="../proposals" className="Link a-05 poppins-regular">Proposals</Link>
            </div>
            </>
          ) : (
            <></>
          )}
          
        </div>
        <div className="right-section-container-05">
          {/* If user is logged and its a seller it will appear Button of Seller Mode, if not will appear a button for got to seller regist page */}
          {loggedin && role === "seller" ? (
            <div className='section-05'>
              <Link to="../sellerOptions" className="Link">
                <button className="seller-button">Seller Options</button>
              </Link>
            </div>
          ) : role !== "certifier" ? (
            <>
            <div className='section-05'>
              <Link to="../sellerRegist" className="Link">
                <button className="seller-button">Be a Seller</button>
              </Link>
            </div>
            </>
          ) : (
            <></>
          )}
          {role !== "certifier" ? (
            <>
            <div className="section-05-2">
            <Link to="../profileView" className="Link">
              <span className="material-symbols-outlined navbar-symbols-05">Person</span>
            </Link>
          </div>
            </>
          ) : (
            <></>
          )}
          <div className="main-log">
            {/* If user is logged in it will appear login, and create account button, if not it will appear logout */}
            {!loggedin ? (
              <div>
                <div className="login">
                  <Link to="../login" className="Link">Login</Link><br />
                </div>
                <div className="regist">
                  <Link to="../register" className="Link">New? Create an account</Link>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={Logout} className="button-logout-05">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
