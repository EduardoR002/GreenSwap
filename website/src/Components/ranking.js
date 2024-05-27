import React, { useState, useEffect } from 'react';
import '../CSS/ranking.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import ranking from "../images/ranking.png"

//Function that will present About Us page of the website
function Ranking() {

  var loggedin;

  const [products, setProducts] = useState([]);

  useEffect(() => {
      getProducts();
  }, []); // O array vazio como segundo argumento garante que o efeito só execute uma vez após a montagem

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
  
          const data = await res.json();
  
          if (res.ok) { // Check if response status is in the range 200-299
              const flattenedProducts = Object.values(data.products[0]);
              setProducts(flattenedProducts);
          } else {
              console.error('Failed to fetch products:', res.status, res.statusText);
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
  }

    return (
     

      <div className="navbar-position"> {/* Navbar common to all pages*/}
      <Navbar />

      {/* Page title */}
      <div className="ranking-icon">
        <img src={ranking} alt="Ranking Icon" className="icon-07" />
      </div>
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
      );
    }

export default Ranking;