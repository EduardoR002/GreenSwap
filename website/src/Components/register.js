import React, { useRef }  from "react";
import '../CSS/register.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

//Function that will present user Regist page of the website
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
          body: JSON.stringify(formData),
        });
        if (res.status === 200) {
          const data = await res.json();
          document.cookie = `user=${data.user.name}; path=/`;
          alert("Criado com sucesso");
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
        <div id="bg-04" />
        <div className="main-06">
          {/* Clickable icon that takes the user to the home page */}
          <div className="iconDiv-04">
            <Link to={'../home'}>
              <img
                src={logo}
                style={{ width: "60%", height: "60%" }}
                className="icon-06"
              />
           </Link>
          </div>
          {/* Form */}
          <div className="formDiv-04">
            <span className="poppins-regular greetings-06">
              <b>Join us!</b>
            </span>

            <div className="input-box-04">
              <span className="material-symbols-outlined">person</span>
              <input
                className="poppins-regular input-06"
                type="text"
                id="name"
                placeholder="Name"
              />
            </div>

            <div className="input-box-04">
              <span className="material-symbols-outlined">alternate_email</span>
              <input
                className="poppins-regular input-06"
                type="text"
                id="email"
                placeholder="Email"
              />
            </div>

            <div className="input-box-04">
              <span className="material-symbols-outlined">lock</span>
              <input
                className="poppins-regular input-06"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="input-box-04">
              <span className="material-symbols-outlined fa-06">calendar_month</span>
              <input
                className="poppins-regular input-06"
                type="date"
                id="bd"
                placeholder="Birthday"
                min="1900-01-01"
              />
            </div>

            <div className="input-box-04">
              <span className="material-symbols-outlined">call</span>
              <input
                className="poppins-regular input-06"
                type="number"
                id="phone"
                placeholder="Phone number"
              />
            </div>

            {/*<div className="input-box-04">
              <span className="material-symbols-outlined">photo_camera</span>
              <input
                className="input-06"
                onChange="showImageName('photoInput','photoText')"
                type="file"
                id="photoInput"
                accept="image/*"
              />
              <label
                htmlFor="photoInput"
                id="photoText"
                className="newinput-06 poppins-regular"
              >
                Choose a photo
              </label>
          </div>*/}

            <button className="poppins-regular button-04" onClick={handleRegisterUser}>
              Register
            </button>

            <span className="poppins-regular linknote-06">
              Already registered? <Link to={'../login'}>Login</Link>
            </span>
          </div>
        </div>
      </>

    )
}

export default Register;