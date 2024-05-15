import React, { useRef }  from "react";
import '../CSS/register.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

//Function that will apresent user Regist page of the website
function Register() {
    const handleRegisterUser = async () => {
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        address: 'Teste'
      }
      try {
        const res = await fetch('http://localhost:3000/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (res.status === 200) {
          alert("Criado com sucesso")
        }
        else if (res.status === 422) {
          alert("Phone number must be 9 digits long")
        }
        else if(res.status === 409){
          const data = await res.json()
          if (data.message === "Email already exists") {
            alert("Email already exist")
          }
          else if(data.message === "Phone number already exists"){
            alert("Phone number already exist")
          }
          
        }
      } catch (error) {
        console.error('Erro:', error.message);
      }
    }
    return(
        <>
        <div id="bg" />
        <div className="main">
          {/* Clickable icon that takes the user to the home page */}
          <div className="iconDiv">
            <Link to={'../home'}>
              <img
                src={logo}
                style={{ width: "60%", height: "60%" }}
                className="icon"
              />
           </Link>
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

            {/*<div className="input-box">
              <span className="material-symbols-outlined">photo_camera</span>
              <input
                onChange="showImageName('photoInput','photoText')"
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
          </div>*/}

            <button className="poppins-regular" onClick={handleRegisterUser}>
              Register
            </button>

            <span className="poppins-regular linknote">
              Already registered? <Link to={'../login'}>Login</Link>
            </span>
          </div>
        </div>
      </>

    )
}

export default Register;