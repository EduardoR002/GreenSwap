import React, { useState, useEffect } from 'react';
import '../CSS/sellerProducts.css';
import '../CSS/navbar.css';
import Navbar from './navbar';
import { fetchSellerId } from '../APIF/seller.fetch';
import { getProductsBySeller } from '../APIF/prod.fetch';

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function SellerProducts() {
  const [products, setProducts] = useState([]); // Inicializando como array

  useEffect(() => {
    async function loadSellerProducts() {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userData = await fetchSellerId(token);

        const productsData = await getProductsBySeller(userData.sellerid);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching seller products:', error);
        setProducts([]);
      }
    }

    loadSellerProducts();
  }, []);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="navbar-position">
        <Navbar />
        <div className="profile">
          <p>No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-position">
      <Navbar />
      <br />
      <br />
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  {product.photo ? (
                    <img
                      className="product-img-table"
                      src={`data:image/jpeg;base64,${arrayBufferToBase64(product.photo.data)}`}
                      alt={product.name}
                    />
                  ) : (
                    <div className="placeholder-image">No Image Available</div>
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}€/kg</td>
                <td>{product.stock}</td>
                <td>{product.type_product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerProducts;
