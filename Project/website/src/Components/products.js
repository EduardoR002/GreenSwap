import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import { getProducts } from './home'

function Home() {
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="navbar-position"> {/* Navbar common to all pages*/}
                <Navbar />
            
                <br></br>

                <br></br>
                <br></br>
                
                {/* Search bar, for user search for products*/}
                <div className="search-container-03">
                    <input type="text" className="search-input-03" placeholder="Search..." />
                    <button className="search-button-03">Search</button>
                </div>
                
                <br></br>

                {/* Div where will apear  diverse products*/}
                <div className="productsHome-03">

                    {products.map((product, index) => (
                        <div className='product-container-03' key={index}>
                            <Link to={'../products/'+product.idproduct}  className="Link">
                                <img className='product-img-03' src='https://picsum.photos/328/204'/>
                            </Link>
                            <span className='poppins-regular product-h1-03'>{product.name}</span>
                            <span className='poppins-regular product-h2-03'>{product.price}€/kg</span>
                            <div className='seller-03'>
                                <span class="material-symbols-outlined mso-03">
                                    person
                                </span>
                                <span className='poppins-regular seller-h3-03'>{product.seller_name}</span>
                            </div>
                        </div>
                    ))}

                    {/*<p>Aqui vão aparecer os produtos da home page</p>*/}
                </div>

            </div>
        </> 
    );
}

export default Home;