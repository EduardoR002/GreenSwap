import React, { useState, useEffect } from "react";
import '../CSS/login.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

{/* Function that will validate user token, if token is valid he will be redirected to website home page */}
async function validateToken() {

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const formData = {
        token : token
    }

    const response = await fetch('http://localhost:3000/tokens/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status === 200) {
        window.location.href = './home';
    }
}

function Login(){

    {/* Token validation */}
    useEffect(() => {validateToken();}, []);

    const loginUser = async() => {
        const formData = {
            email: document.getElementById('email-04').value,
            password: document.getElementById('password-04').value
        }

        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 200) {
                const data = await res.json();
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1); // Adiciona 1 hora à hora atual
                document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/; secure; SameSite=Strict`;
                window.location.href = './home';
            }
            else { alert("Invalid credentials! Try again...")}

        } catch (error) {
            console.error('Erro:', error.message);
        }
}
    
    return (
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
                <button className="poppins-regular button-04" onClick={loginUser}>
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