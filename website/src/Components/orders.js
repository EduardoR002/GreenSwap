import React, { useRef }  from "react";
import '../CSS/orders.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function Orders() {

  return (
   

    <div className="navbar-position"> {/* Navbar common to all pages*/}
    <Navbar />

      <div className="orders-container-10">

          <div className='product-container-10'>

            <div className='left-content'>

              <Link to={'../products/'}  className="Link">
                                <img className='product-img-03' src='https://picsum.photos/328/204'/>
              </Link>
                            <span className='poppins-regular product-h1-03'>{}Tomates</span>
                            <span className='poppins-regular product-h2-03'>{}15€/kg</span>
                            <div className='seller-03'>
                                <span class="material-symbols-outlined mso-03">
                                    person
                                </span>
                                <span className='poppins-regular seller-h3-03'>{}John</span>
                            </div>
            </div>
                            <div>
            <div className='right-content'>
              <span className="poppins-regular product-info-h1-03"><b>Purchase Type:</b> {} </span><br></br>
              <span className="poppins-regular product-info-h1-03"><b>Purchase Date:</b> {} </span><br></br>
              <span className="poppins-regular product-info-h1-03"><b>Quantity:</b> {} kg </span><br></br>
              <span className="poppins-regular product-info-h1-03"><b>Price:</b> $ </span><br></br>
              <span className="poppins-regular product-info-h1-03"><b>Date Receveid (estimated):</b> {} </span><br></br>

            </div>

          </div>

          </div>
         
      
      </div>


    </div>
    );
  }

export default Orders;