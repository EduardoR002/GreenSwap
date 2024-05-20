import React, { useRef }  from "react";
import '../CSS/sellerOptions.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function SellerOptions() {

    return (
     

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar /> <br></br> 

      {/* Page title */}
      <h1 className="title-07">Seller Options</h1>

    <div className="containerOption">
        
        <div className="options">
        <Link  to={'../sellerProducts'} className="Link">My Products</Link>
        </div>

        <br></br> 

        <div className="options">
        <Link to={'../sellerOrders'} className="Link">My Orders</Link>
        </div>

        <br></br> 

        <div className="options">
        <Link to={'../productRegist'} className="Link">Register Product</Link>
        </div>

        <br></br> 

        <div className="options">
        <Link  className="Link">Edit Product</Link>
        </div>

    </div>


        </div>
      );
    }

export default SellerOptions;