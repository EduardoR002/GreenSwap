import React, { useRef }  from "react";
import '../CSS/ranking.css' //TO CHANGE
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function Proposals() {

    return (
     

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />

      {/* Page title */}
      <h1 className="title-07">Your Proposals</h1>



        </div>
      );
    }

export default Proposals;