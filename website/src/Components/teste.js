import React from "react";
import '../CSS/teste.css'
import logo from '../images/GreenSwap.png'

export default function Teste(){
    return(
        <>
            <div id="bg" />
            <div className="main">
                {/* Clickable icon that takes the user to the home page */}
                <div className="iconDiv">
                <a href="home.html">
                    <img
                    src={logo}
                    style={{ width: "60%", height: "60%" }}
                    className="icon"
                    />
                </a>
                </div>
                {/* Form */}
                <div className="formDiv">
                <span className="poppins-regular greetings">
                    <b>Welcome!</b>
                </span>
                <div className="input-box">
                    <span className="material-symbols-outlined">person</span>
                    <input
                    className="poppins-regular"
                    type="text"
                    id="email"
                    placeholder="Email"
                    />
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined">lock</span>
                    <input
                    className="poppins-regular"
                    type="password"
                    id="password"
                    placeholder="Password"
                    />
                </div>
                <button className="poppins-regular" onclick="login()">
                    Login
                </button>
                <span className="poppins-regular linknote">
                    Not registered? <a href="register.html">Create an account</a>
                </span>
                <a href="register.html"></a>
                </div>
                <a href="register.html"></a>
            </div>
            <a href="register.html"></a>
        </>
    );
}