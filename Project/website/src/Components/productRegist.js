import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../CSS/productRegist.css'
import '../CSS/navbar.css';
import Navbar from './navbar';
import {fetchSellerId} from '../APIF/seller.fetch'

function ProductRegister() {

  useEffect(() => {
    async function getSellerId() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      try {
        const data = await fetchSellerId(token);
        setSellerId(data.sellerid);
      } catch (error) {
        console.error('Failed to fetch seller id:', error);
      }
    }
    getSellerId();
  }, []);

  const [image, setImage] = useState(null);
  const [imageShow, setImageShow] = useState(null);

  const handleFileSelect = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    const selectedImageShow = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target.result;
      setImageShow(imageDataUrl);
    };
    reader.readAsDataURL(selectedImageShow);
  };

  const handleProductRegister = async () => {
    const formData = new FormData();

    // Fetch input values directly from state
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productType = document.getElementById('productType').value;

    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('stock', productQuantity);
    formData.append('idtypeproduct', productType);
    formData.append('idseller', sellerId);
    formData.append('photo', image);

    try {
      const response = await fetch('http://localhost:3000/product/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to register product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="navbar-position">
      <Navbar />
      
      <div className="div-photo">
        <div>
          <label className="label-photo" htmlFor="productPhoto">Product Photo:</label>
          <br />
          <input
            className="photo-input-07"
            type="file"
            id="productPhoto"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <br />
        </div>
        
        {image && (
          <div>
            <img src={imageShow} alt="Selected" className="selected-image" />
            <br />
          </div>
        )}
      </div>

      <div className="div-forms">
        <div className="input-box-07">
          <label className="label-forms" htmlFor="name">Product Name: 
            <input
              className="poppins-regular input-07"
              type="text"
              id="productName"
              placeholder=""
            />
          </label>
        </div>

        <div className="input-box-07">
          <label className="label-forms" htmlFor="type">Product Type:
            <input
              className="poppins-regular input-07"
              type="text"
              id="productType"
              placeholder=""
            />
          </label>
        </div>

        <div className="input-box-07">
          <label className="label-forms" htmlFor="price">Price ($/Kg):
            <input
              className="poppins-regular input-07"
              type="number"
              id="productPrice"
              placeholder=""
            />
          </label>
        </div>

        <div className="input-box-07">
          <label className="label-forms" htmlFor="name">Quantity (Kg):
            <input
              className="poppins-regular input-07"
              type="number"
              id="productQuantity"
              placeholder=""
            />
          </label>
        </div>

        <div className="input-box-07" style={{ width: '65%' }}>
          <label className="label-forms" htmlFor="price">Description:
            <input
              className="poppins-regular input-07"
              type="text"
              id="productDescription"
              placeholder=""
            />
          </label>
        </div>

        <div className="div-button">
          <button className="poppins-regular button-07" onClick={handleProductRegister}>Register Product</button>
        </div>
      </div>
    </div>
  );
}

export default ProductRegister;