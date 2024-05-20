import React from 'react';
import { Link } from "react-router-dom";
import GreenSwap from '../images/GreenSwap.png';
import '../CSS/navbar.css';

function Navbar() {
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
                        <a className="a-05 poppins-regular"> <Link to={'../favorites'}  className="Link">Favorites</Link></a>
                    </div>
                    <div className="section-05">
                        <a className="a-05 poppins-regular"> <Link to={'../orders'}  className="Link">Orders</Link></a>
                    </div>
                </div>
                <div className="right-section-container-05">
                    <div className="section-05">
                        <a className="a-05 poppins-regular"><Link to={'../aboutUs'}  className="Link">About Us</Link></a>
                    </div>
                    <div className="section-05-2">
                        <a className='a-05'>
                        <span className="material-symbols-outlined navbar-symbols-05"><Link to="../profileView"  className="Link">Person</Link>
                                </span>
                        </a>
                        <span className="navbar-symbols-05">|  </span>
                        <a className='a-05'>
                            <span className="material-symbols-outlined navbar-symbols-05"><Link to="../buy"  className="Link">shopping_cart</Link>
                            </span>
                        </a>
                    </div>

                    <div className="main-log">
                    <div className="login">
                        <a>
                            <Link to="../logIn" className="Link">Login</Link><br></br>
                        </a>
                    </div>

                    <div className="regist">
                        <a>
                            <Link to="../register" className="Link">New? Create an account</Link> 
                        </a>        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;