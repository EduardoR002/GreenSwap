import React, { useState, useEffect } from 'react';
import '../CSS/ranking.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import ranking from "../images/ranking.png"
import '../CSS/productPage.css'
import { fetchBestProducts } from '../APIF/ranking.fetch';

//Function that will present About Us page of the website
function Ranking() {

  //COPY COPY COPY COPY COPY
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchBestProducts()
      .then(productsData => {
        if (productsData) {
          const products = Object.values(productsData);
          setProducts(products); // Definindo o produto no estado
        } else {
          console.error("Products are undefined or null.");
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); 
  //COPY COPY COPY COPY COPY

    return (
     
      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />
      {products ? (
                <div className='tocenter-11'>

                    <div className="ranking-icon">
                        <img src={ranking} alt="Ranking Icon" className="icon-07" />
                    </div>
                    
                    <div className='cont-11'>
                    {products.map((product, index) => (
                        <div className='main-11' key={index}>
                            <span className='poppins-regular place-11'>{index+1}º</span>

                            <div className='product-container-03' key={index}>
                                <Link to={'../products/'+product.idproduct}  className="Link">
                                    <img className='product-img-03' src='https://picsum.photos/328/204'/>
                                </Link>
                                <span className='poppins-regular product-h1-03'>{product.name}</span>
                                <span className='poppins-regular product-h2-03'>{product.price}€/kg</span>
                                <div className='rating-11'>
                                    <span className='poppins-regular product-h1-11'>{parseFloat(product.avg_evaluation).toFixed(1)}</span>
                                    <span class="material-symbols-outlined star-11">
                                        grade
                                    </span>
                                </div>        
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <p className='poppins-regular'>Loading...</p>
            )}

        </div>
      );
    }

export default Ranking;