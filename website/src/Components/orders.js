import React, { useRef }  from "react";
import '../CSS/orders.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present Orders page of the website
function Orders() {

  //fazer função pra ir buscar as compras do user, e a sua informação e do produto que comprou e depois meter as variaveis em baixo no HTML ENTRE OS {}


  return (
   

    <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />

      {/* Div where will apear user purchases*/}
      <div className="orders-container-10">

          {/* Div for product information and picture*/}
          <div className='product-container-10'>

                <div className='left-content-10'>

                  <Link to={'../products/'}  className="Link">
                                <img className='product-img-03' src='https://picsum.photos/328/204'/>
                  </Link>
                            <span className='poppins-regular product-h1-10'>{}Tomates</span>
                            <span className='poppins-regular product-h2-10'>{}15€/kg</span>
                            <div className='seller-10'>
                            <span class="material-symbols-outlined mso-10">
                                    person
                            </span>
                            <span className='poppins-regular seller-h3-10'>{}John</span>
                  </div>
            </div>
            <div>

                {/* Div for purchase information*/}
                <div className='right-content-10'>

                  <span className="poppins-regular product-info-h1-10"><b>Purchase Type:</b> {} </span><br></br>
                  <span className="poppins-regular product-info-h1-10"><b>Purchase Date:</b> {} </span><br></br>
                  <span className="poppins-regular product-info-h1-10"><b>Quantity:</b> {} kg </span><br></br>
                  <span className="poppins-regular product-info-h1-10"><b>Price:</b> $ </span><br></br>
                  <span className="poppins-regular product-info-h1-10"><b>Date Receveid (estimated):</b> {} </span><br></br>
                  <span className="poppins-regular product-info-h1-10"><b>State: </b> {} </span><br></br>

            </div>

          </div>

      </div>
         
      
      </div>


    </div>
    );
  }

export default Orders;