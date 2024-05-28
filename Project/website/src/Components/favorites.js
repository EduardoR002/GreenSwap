import React, { useRef }  from "react";
import '../CSS/orders.css'
import { Link } from "react-router-dom";
import '../CSS/favorites.css';
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present Favorite Products page of the website
function Favorites() {

  return (
   

    <div className="navbar-position"> {/* Navbar common to all pages*/}
    <Navbar />

    {/* Page title */}
    <h1 className="title-07">Favorites</h1>


      </div>
    );
  }

export default Favorites;