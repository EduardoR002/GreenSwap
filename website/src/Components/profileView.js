import React, { useState, useEffect } from 'react';
import '../CSS/profileView.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present  user profile page on website
function ProfileView() {

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

           
        <div>
          <div className="profile">
            <img className="profile-pic" src="https://fakeimg.pl/400x400/03000f/029904?text=Profile+Image" alt="Not Loaded" />
            <div className="profile-info">
              <label htmlFor="nome">Name:</label>
              <p id="nome">{}----------</p>
              <br />
              <label htmlFor="data-nascimento">Birth Date:</label>
              <p id="data-nascimento">{}aa/mm/yyyy</p>
              <br />
              <label htmlFor="morada">Adress:</label>
              <p id="morada">{}-----</p>
              <br />
              <label htmlFor="biografia">Biography:</label>
              <p id="biografia">{}----------</p>
            </div>
          </div>
    
          <div className="yourProducts">
            <h1>My Products</h1>

            {/* Div where will apear  diverse products*/}
            <div className="productsHome-12">
            {products.map((product, index) => (
                        <div className='product-container-12' key={index}>
                            <Link to={'../products/'+product.idproduct}  className="Link">
                                <img className='product-img-12' src='https://picsum.photos/328/204'/>
                            </Link>
                            <span className='poppins-regular product-h1-12'>{product.name}</span>
                            <span className='poppins-regular product-h2-12'>{product.price}€/kg</span>
                            <div className='seller-03'>
                                <span class="material-symbols-outlined mso-12">
                                    person
                                </span>
                                <span className='poppins-regular seller-h3-12'>{product.seller_name}</span>
                            </div>
                        </div>
                    ))}
              {/*<p>Aqui vão aparecer os produtos da home page</p>*/}
              </div>

          </div>
        </div>
      </div>
      );
    }

export default ProfileView;