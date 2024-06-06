import React, { useState, useEffect } from 'react';
import '../CSS/sellerRegist.css';
import logo from '../images/GreenSwap.png';
import { Link } from "react-router-dom";
import GreenSwap from '../images/GreenSwap.png';
import { fetchUserId} from '../APIF/user.fetch';

function SellerRegister() {
  const [id, setId] = useState(null);
  useEffect(() => {
    async function getId() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      try {
        const data = await fetchUserId(token);
        setId(data.id);
      } catch (error) {
        console.error('Failed to fetch seller id:', error);
      }
    }
    getId();
    }, []);

  const handleSellerRegister = async () => {
    //preciso do token

    const formData = {
      nif: document.getElementById('nif').value, 
      description: document.getElementById('description').value, 
      iduser: id,
      idstate : 1,
    };
    try {
      const res = await fetch('http://localhost:3000/requestseller/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        const data = await res.json();
        alert("Criado com sucesso");
      } else if (res.status === 422) {
        // Handle 422 status code if needed
      }
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

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
              alt="Logo"
            />
          </Link>
        </div>
        {/* Form */}
        <div className="formDiv-04">
          <span className="poppins-regular greetings-04">
            <b>Be a seller!</b>
          </span>
          <div className="input-box-04">
            <span className="material-symbols-outlined"></span>
            <input
              className="poppins-regular input-04"
              type="text"
              id="nif" // Alterado para 'nif'
              placeholder="NIF"
            />
          </div>
          <div className="input-box-04">
            <span className="material-symbols-outlined"></span>
            <input
              className="poppins-regular input-04"
              type="text"
              id="description" // Alterado para 'description'
              placeholder="Description"
            />
          </div>
          <button className="poppins-regular button-04" onClick={handleSellerRegister}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerRegister;