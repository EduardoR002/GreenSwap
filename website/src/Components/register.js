import React from "react";
import '../CSS/register.css'
import logo from '../images/GreenSwap.png'

//Function that will apresent user Regist page of the website
function Register() {
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
        <b>Join us!</b>
      </span>
      <div className="input-box">
        <span className="material-symbols-outlined">person</span>
        <input
          className="poppins-regular"
          type="text"
          id="name"
          placeholder="Name"
        />
      </div>
      <div className="input-box">
        <span className="material-symbols-outlined">alternate_email</span>
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
      <div className="input-box">
        <span className="material-symbols-outlined fa">calendar_month</span>
        <input
          className="poppins-regular"
          type="date"
          id="bd"
          placeholder="Birthday"
          min="1900-01-01"
        />
      </div>
      <div className="input-box">
        <span className="material-symbols-outlined">call</span>
        <input
          className="poppins-regular"
          type="number"
          id="phone"
          placeholder="Phone number"
        />
      </div>
      <div className="input-box">
        <span className="material-symbols-outlined">photo_camera</span>
        <input
          onchange="showImageName('photoInput','photoText')"
          type="file"
          id="photoInput"
          accept="image/*"
        />
        <label
          htmlFor="photoInput"
          id="photoText"
          className="newinput poppins-regular"
        >
          Choose a photo
        </label>
      </div>
      <button className="poppins-regular" onclick="register()">
        Register
      </button>
      <span className="poppins-regular linknote">
        Already registered? <a href="login.html">Log In</a>
      </span>
      <a href="login.html"></a>
    </div>
    <a href="login.html"></a>
  </div>
  <a href="login.html"></a>
</>

    )
}

export default Register;