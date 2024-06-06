import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../CSS/productPage.css';
import '../CSS/login.css';
import Navbar from './navbar';
import { fetchProduct } from '../APIF/prod.fetch.js';

function ProductPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await fetchProduct(productId);
        console.log('Product data received:', productData); // Log para verificar os dados recebidos
        if (productData && typeof productData === 'object') {
          setProduct(productData);
        } else {
          console.error("Product data is invalid. Data received:", productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    loadProduct();
  }, [productId]);

  const handleBuyClick = () => {
    setShowConfirmation(true);
  };

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="navbar-position">
      <Navbar />
      {product && !showConfirmation ? (
        <div className='prod-cont-13'>
          <div className='prod-cont-left-13'>
            <div className='prod-frame-13'>
              {product.photo ? (
                <img
                  className="product-img-13"
                  src={`data:image/jpeg;base64,${arrayBufferToBase64(product.photo.data)}`}
                  alt={product.name}
                />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
            </div>
          </div>
          <div className='prod-cont-right-13'>
            <div className='pct-up'>
              <span className='poppins-regular prod-name-13'>{product.name}</span>
              <span className='poppins-regular user-name-13'>{product.seller}</span>
              <span className='poppins-regular prod-price-13'>{product.price}€/Kg</span>
              <span className='poppins-regular prod-desc-13'>{product.description}</span>
            </div>
            <div className='pct-down'>
              <input className='poppins-regular input-13' placeholder='Novo Preço' />
              <input className='poppins-regular input-13' placeholder='Quantidade' />
              <button className="button-04 poppins-regular" onClick={handleBuyClick}>Comprar</button>
            </div>
          </div>
        </div>
      ) : showConfirmation ? (
        <p className='poppins-regular'>Obrigado pela sua escolha!</p>
      ) : (
        <p className='poppins-regular'>Loading...</p>
      )}
    </div>
  );
}

export default ProductPage;
