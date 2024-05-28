import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GreenSwap from '../images/GreenSwap.png';
import '../CSS/navbar.css';
import { validateToken } from './home'

let vt_res = await validateToken();

const role = vt_res.role;
const loggedin = vt_res.role;

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

function Navbar() {

    console.log(loggedin);
    //console.log(role);


    return (
        <div className="navbar-container-05">
            <div className="tocenter-05">
                <svg xmlns="http://www.w3.org/2000/svg" width="222" height="183" viewBox="0 0 222 183" fill="none">
                    <path d="M222 72C222 133.304 172.304 183 111 183C49.6964 183 0 133.304 0 72C0 10.6964 49.6964 -39 111 -39C172.304 -39 222 10.6964 222 72Z" fill="#042C3B"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="205" height="175" viewBox="0 0 205 175" fill="none">
                    <path d="M205 72.5C205 129.109 159.109 175 102.5 175C45.8908 175 0 129.109 0 72.5C0 15.8908 45.8908 -30 102.5 -30C159.109 -30 205 15.8908 205 72.5Z" fill="#FFFFFF"/>
                </svg>                      
                <svg xmlns="http://www.w3.org/2000/svg" width="145" height="145" viewBox="0 0 145 145" fill="none" >
                    <path d="M145 72.5C145 112.541 112.541 145 72.5 145C32.4594 145 0 112.541 0 72.5C0 32.4594 32.4594 0 72.5 0C112.541 0 145 32.4594 145 72.5Z" fill="#042C3B"/>
                </svg>
                <a className='a-05'>
                <Link to={"../home"}><img src={GreenSwap} className="icon-05" alt="GreenSwap Icon" /></Link>
                </a>
            </div>
            <div className="full-section-container-05">
                <div className="left-section-container-05">
                    <div className="section-05">
                        <a className="a-05 poppins-regular"> <Link to={'../ranking'}  className="Link">Ranking</Link></a>
                    </div>
                    <div className="section-05">
                        <a className="a-05 poppins-regular"> <Link to={'../orders'}  className="Link">Orders</Link></a>
                    </div>
                    <div className="section-05">
                        <a className="a-05 poppins-regular"> <Link to={'../proposals'}  className="Link">Proposals</Link></a>
                    </div>
                </div>

                <div className="right-section-container-05">

                 {/* If user is logged and its a seller it will apear Button of Seller Mode, if not will appear a button for got to seller regist page*/}
                 {loggedin && role =="seller" ? (
                            <div className='section-05'>
                                <button className="seller-button"> <Link to={'../sellerOptions'}  className="Link">Seller Options</Link></button>
                            </div>
                ) : (


                        <div className='section-05'>
                             <button className="seller-button"> <Link to={'../sellerRegist'}  className="Link">Be a Seller</Link></button>
                        </div>
                )}

                    <div className="section-05-2">
                        <a className='a-05'>
                        <span className="material-symbols-outlined navbar-symbols-05"><Link to="../profileView"  className="Link">Person</Link>
                            </span>
                        </a>
                    </div>

                    <div className="main-log">

                        {/* If user is logged in it will apear login, and create account button, if not it will appear loggof */}
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