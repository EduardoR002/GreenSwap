import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import Cookies from 'js-cookie';

function validateToken() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const formData = { token: token };

    const response = fetch('http://localhost:3000/tokens/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status === 200) {
        window.location.href = './home';
        return true;
    } else {
        return false;
    }
}

// Function to get token from cookies
function GetTokenFromCookies() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    let tokenValidation;

    if (validateToken()) {
        tokenValidation = "valid";
    } else {
        tokenValidation = "invalid";
    }

    return { token, tokenValidation };
}

// Function that will present website home page
function Home() {
    
    const { token, tokenValidation } = GetTokenFromCookies();

    console.log("OLAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(token);
    console.log("OLAAAAAAAAAAAAAAAAAAAAAAAAA");

    let loggedState = false;
    let sellerPage = false;
    let userRole = "user";

    if (tokenValidation === "valid") {
        loggedState = true;

        if (userRole === "seller") {
            sellerPage = true;
        } else {
            sellerPage = false;
        }
    } else {
        loggedState = false;
    }

    console.log("Logged State: " + loggedState);
    console.log("Seller Page: " + sellerPage);





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
        <>
            <div className="navbar-position"> {/* Navbar common to all pages*/}
                <Navbar />
            
                <br></br>
            
                {/* Condition that will show for user a button if he is logged as a seller or other button if he is logged as a user*/}
                {loggedState ? (
                        <div className="sellerOptions-03">
                            <Link to={'../sellerOptions'} className="Link">Seller Options</Link>
                        </div>
                    ) : (
                        <div className="sellerOptions--03">
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