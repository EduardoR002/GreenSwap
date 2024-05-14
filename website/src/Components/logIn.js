import React from "react";
import '../CSS/logIn.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

function Login(){
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
                    Not registered? <Link to={'../register'}>Create</Link>
                </span>
                </div>
            </div>
        </>
    );
}

export default Login;