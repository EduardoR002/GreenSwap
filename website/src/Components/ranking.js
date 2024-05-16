import React, { useRef }  from "react";
import '../CSS/ranking.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present About Us page of the website
function Ranking() {

    return (
     

        <div className="navbar-position"> 
        <Navbar />

      
        <p>Ranking Page</p>


        </div>
      );
    }

export default Ranking;