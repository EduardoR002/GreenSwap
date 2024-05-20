import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../CSS/productRegist.css'
import '../CSS/navbar.css';
import Navbar from './navbar';


//Function that will present user Regist page of the website
function ProductRegister() {

  const [image, setImage] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result); // Sets the image to display
    };

    reader.readAsDataURL(selectedImage); // Reads the file as a data URL
  };


  // Function to handle product registration
  const handleProductRegister = async () => {
    const formData = {
      name: document.getElementById('productName').value,
      type: document.getElementById('productType').value,
      price: document.getElementById('productPrice').value,
      quantity: document.getElementById('productQuantity').value,
      description: document.getElementById('productDescription').value,
      image: image, 
    };

    ///////////////////////// FALTA ENVIAR OS DADOS PARA A API E VER OS ERROS /////////////////////////////////////////////////


  };

    return(
        

      <div className="navbar-position"> {/* Navbar common to all pages*/}
        <Navbar /> <br></br> 

        {/* Page title */}
        <h1 className="title-07">New Product</h1>
        
       
          {/*Div where the input is located, for the seller to place their product photo*/}
          <div className="div-photo">

            <div>
                <label className= "label-photo" htmlFor="productPhoto" >Product Photo:</label>
                <br></br>
                <input
                className="photo-input-07"
                type="file"
                id="productPhoto"
                accept="image/*"
                onChange={handleFileSelect}
                />
                <br></br>
            </div>

            {/* Show the image user select */}
            {image && (
            <div>
              <img src={image} alt="Selected" className="selected-image" />
              <br></br>
            </div>
            )}
  
          </div>

          {/*Div where there is inputs for user insert product information*/}
          <div className="div-forms">
            <div className="input-box-07">
                <label className= "label-forms" htmlFor="name">Product Name: 
                <input
                className="poppins-regular input-07"
                type="text"
                id="productName"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07">
            <label className= "label-forms" htmlFor="type">Product Type:
                <input
                className="poppins-regular input-07"
                type="text"
                id="productType"
                placeholder=""
                />
                </label>
            </div>
            
            
            <div className="input-box-07">
            <label className= "label-forms" htmlFor="price">Price ($/Kg):
                <input
                className="poppins-regular input-07"
                type="number"
                id="productPrice"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07">
            <label className= "label-forms" htmlFor="name">Quantity (Kg):
                <input
                className="poppins-regular input-07"
                type="number"
                id="productQuantity"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07" style={{ width: '60%'}}>
            <label className= "label-forms" htmlFor="price">Description:
                <input
                className="poppins-regular input-07"
                type="text"
                id="productDescription"
                placeholder=""
                />
                </label>

            </div>

            <br></br>
            <br></br>

            {/*Button that will regist the new product */}
            <div className="div-button">
            <button className="poppins-regular button-07" onClick={handleProductRegister}>Regist Product</button>
            </div>
            <br></br>
          </div>

            <br></br>


    </div>

    )
}

export default ProductRegister;