import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import Cookies from 'js-cookie';

function getCookie(name){
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;
  
  cArray.forEach(element => {
      if(element.indexOf(name) == 0){
          result = element.substring(name.length + 1)
      }
  })
  return result;
}

function Home() {
   
{/*const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts(); // Chama a função getAllProducts() assim que o componente for montado
    }, []);
    const getAllProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/product/getall');
            const jsonData = await res.json();
            setProducts(jsonData.products); // Define os produtos recebidos no estado 'products'
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }
*/} 

    return (
      <>
      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />
      
        <br></br>

        {/* This div will only appear if the user is logged as a seller, and will send user to seller options page*/}
        <div className="sellerOptions">
            <Link to={'../sellerOptions'} className="Link">Seller Options</Link>
        </div>

        <br></br>
        
        {/* Search bar, for user search for products*/}
        <div className="search-container">
            <input type="text" className="search-input" placeholder="Search..." />
            <button className="search-button">Search</button>
        </div>
        
        <br></br>

        {/* Div where will apear  diverse products*/}
        <div className="productsHome">

        <p>Aqui vão aparecer os produtos da home page</p>
        </div>


    </div>
      </> 
    );
}

export default Home;
