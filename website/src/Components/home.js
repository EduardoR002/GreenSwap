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
   

    // Will change a button presentation
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(true);

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

       
        {/* Condition that will show for user a button if he is logged as a seller or other button if he is logged as a user*/}
        {isSellerLoggedIn ? (
                <div className="sellerOptions">
                    <Link to={'../sellerOptions'} className="Link">Seller Options</Link>
                </div>
            ) : (
                <div className="sellerOptions">
                    <Link to={'../sellerRegist'} className="Link">Be a Seller</Link>
                </div>
            )}

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
