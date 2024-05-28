import React from "react";
import '../CSS/sellerRegist.css';
import logo from '../images/GreenSwap.png';
import { Link } from "react-router-dom";
import GreenSwap from '../images/GreenSwap.png';

function SellerRegister() {
  const handleSellerRegister = async () => {
    const formData = {
      email: document.getElementById('email').value,
      description: document.getElementById('productDescription').value,
    };
    try {
      const res = await fetch('http://localhost:3000/seller/create', {
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
      } else if (res.status === 422) {
        alert("Phone number must be 9 digits long");
      } else if (res.status === 409) {
        const data = await res.json();
        if (data.message === "Email already exists") {
          alert("Email already exist");
        } else if (data.message === "Phone number already exists") {
          alert("Phone number already exist");
        }
      }
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <div className="seller-register-container">
      <div className="form-container">
      <a className='a-05'>
                <Link to={"../home"}><img src={GreenSwap} className="icon-05" alt="GreenSwap Icon" /></Link>
                </a>
        <h1 className="form-title">Be a Seller</h1>
        
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            className="input-field"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="productDescription">Description:</label>
          <input
            className="input-field"
            type="text"
            id="productDescription"
            placeholder="Enter product description"
          />
        </div>
        
        <button className="submit-button" onClick={handleSellerRegister}>
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default SellerRegister;