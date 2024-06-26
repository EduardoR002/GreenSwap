import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import { Link } from "react-router-dom";
import Navbar from './navbar';
import Cookies from 'js-cookie';



// Function that will validate user token
export async function validateToken() {

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const formData = { 
        token: token 
    };

    const response = await fetch('http://localhost:3000/tokens/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status === 200) {
        const res = await fetch('http://localhost:3000/tokens/getrole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        const data = await res.json();
        return {loggedin: true, role: data.role}

    } else {
        return false;
    }
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Function that will present website home page
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const formData = {
            search_name: "",
            max_price: 0,
            min_price: 0
        };

        try {
            const res = await fetch('http://localhost:3000/product/getall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
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
        <div className="navbar-position">
            <Navbar />
            <br />
            <br />
            <div className="search-container-03">
                <input type="text" className="search-input-03" placeholder="Search..." />
                <button className="search-button-03">Search</button>
            </div>
            <div className="productsHome-03">
                {products.map((product, index) => (
                    <div className="product-container-03" key={index}>
                        <Link to={`/products/${product.idproduct}`} className="Link">
                            {product.photo ? (
                                <img
                                    className="product-img-03"
                                    src={`data:image/jpeg;base64,${arrayBufferToBase64(product.photo.data)}`}
                                    alt={product.name}
                                />
                            ) : (
                                <div className="placeholder-image">No Image Available</div>
                            )}
                        </Link>
                        <span className="poppins-regular product-h1-03">{product.name}</span>
                        <span className="poppins-regular product-h2-03">{product.price}€/kg</span>
                        <div className="seller-03">
                            <span className="material-symbols-outlined mso-03">person</span>
                            <span className="poppins-regular seller-h3-03">{product.seller_name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;