import React, { useRef }  from "react";
import '../CSS/sellerProducts.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function SellerProducts() {

    return (
     

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar /> <br></br> 

      {/* Page title */}
      <h1 className="title-07">Your Products</h1>



        </div>
      );
    }

export default SellerProducts;