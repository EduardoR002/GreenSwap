import React, { useRef }  from "react";
import '../CSS/ranking.css' //TO CHANGE
import { Link } from "react-router-dom";
import "../CSS/proposals.css"
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present proposal page of the website
function Proposals() {

    return (

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />

      {/* Div where will apear user proposals*/}
      <div className="proposal-container-14">

          {/* Div for product information and picture*/}
          <div className='product-container-14'>

                <div className='left-content-14'>

                  <Link to={'../products/'}  className="Link">
                                <img className='product-img-14' src='https://picsum.photos/328/204'/>
                  </Link>
                            <span className='poppins-regular product-h1-14'>{}Tomates</span>
                            <span className='poppins-regular product-h2-14'>{}15€/kg</span>
                            <div className='seller-14'>
                            <span class="material-symbols-outlined mso-14">
                                    person
                            </span>
                            <span className='poppins-regular seller-h3-14'>{}John</span>
                  </div>
            </div>

                {/* Div for proposal information*/}
                <div className='right-content-14'>

                  <span className="poppins-regular product-info-h1-14"><b>Proposal Date:</b> {} </span><br></br>
                  <span className="poppins-regular product-info-h1-14"><b>Quantity:</b> {} kg </span><br></br>
                  <span className="poppins-regular product-info-h1-14"><b>Price:</b> $ </span><br></br>
                  <span className="poppins-regular product-info-h1-14"><b>State: </b> {} </span><br></br>



          </div>

      </div>
         
      
      </div>


    </div>
      );
    }

export default Proposals;