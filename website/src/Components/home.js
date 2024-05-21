import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

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

async function getProducts() {
    const formData = {
        search_name: " ",
        max_price: 0,
        min_price: 0
    };

    console.log('Sending request with data:', formData);

    try {
        const res = await fetch('http://localhost:3000/product/getall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        console.log('Response status:', res.status);

        if (res.ok) { // Check if response status is in the range 200-299
            const data = await res.json();
            console.log('Response data:', data);
            data.forEach(element => {
                window.alert("BOTA");
            });
        } else {
            console.error('Failed to fetch products:', res.status, res.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchProducts() {
    try {
        const response = await fetch('http://your-api-url.com/all-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search_name: '',
                max_price: 0, // Provide your max price
                min_price: 0   // Provide your min price
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data); // Handle your data here
        } else {
            console.error('Failed to fetch products:', data.message);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
} 


function Home() {

    // Will change a button presentation
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(true);

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
        <br></br>
        
        {/* Search bar, for user search for products*/}
        <div className="search-container-03">
            <input type="text" className="search-input-03" placeholder="Search..." />
            <button className="search-button-03">Search</button>
        </div>
        
        <br></br>

        {/* Div where will apear  diverse products*/}
        <div className="productsHome-03" onLoad={fetchProducts}>

            <div className='product-container-03'>
                <img className='product-img-03' src='https://picsum.photos/328/204'/>
                <span className='poppins-regular product-h1-03'>Lorem Ipsum</span>
                <span className='poppins-regular product-h2-03'>10.00€/kg</span>
                <div className='seller-03'>
                    <span class="material-symbols-outlined mso-03">
                        person
                    </span>
                    <span className='poppins-regular seller-h3-03'>Latin Ipsum</span>
                </div>
            </div>

            {/*<p>Aqui vão aparecer os produtos da home page</p>*/}
        </div>


    </div>
      </> 
    );
}

export default Home;
