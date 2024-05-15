import React from "react";
import '../CSS/logIn.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

function Login(){
    return(
        <>
            <div id="bg-04" />
            <div className="main-04">
                {/* Clickable icon that takes the user to the home page */}
                <div className="iconDiv-04">
                <Link to={'../home'}>
                    <img
                    src={logo}
                    style={{ width: "60%", height: "60%" }}
                    className="icon-04"
                    />
                    </Link>
                </div>
                {/* Form */}
                <div className="formDiv-04">
                <span className="poppins-regular greetings-04">
                    <b>Welcome!</b>
                </span>
                <div className="input-box-04">
                    <span className="material-symbols-outlined">person</span>
                    <input
                    className="poppins-regular input-04"
                    type="text"
                    id="email-04"
                    placeholder="Email"
                    />
                </div>
                <div className="input-box-04">
                    <span className="material-symbols-outlined">lock</span>
                    <input
                    className="poppins-regular input-04"
                    type="password"
                    id="password-04"
                    placeholder="Password"
                    />
                </div>
                <button className="poppins-regular button-04" onclick="login()">
                    Login
                </button>
                <span className="poppins-regular linknote-04">
                    Not registered? <Link to={'../register'}>Create</Link>
                </span>
                </div>
            </div>
        </>
    );
}

export default Login;