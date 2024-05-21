import React, { useRef }  from "react";
import '../CSS/sellerOrders.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function SellerOrders() {

    return (
     

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar /> 

      {/* Page title */}
      <h1 className="title-07">Your Orders</h1>



        </div>
      );
    }

export default SellerOrders;