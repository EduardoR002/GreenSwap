import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../CSS/productPage.css';
import '../CSS/login.css';
import Navbar from './navbar';
import { fetchProduct } from '../APIF/prod.fetch.js';

function ProductPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPeriodicPurchase, setShowPeriodicPurchase] = useState(false);
  const [showFuturePurchase, setShowFuturePurchase] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await fetchProduct(productId);
        console.log('Product data received:', productData);
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
    setShowPurchase(true);
    setShowPeriodicPurchase(false);
    setShowFuturePurchase(false);
    setShowProposal(false);
    setShowConfirmation(false);
  };

  const handlePeriodicPurchaseClick = () => {
    setShowPeriodicPurchase(true);
    setShowPurchase(false);
    setShowFuturePurchase(false);
    setShowProposal(false);
    setShowConfirmation(false);
  };

  const handleFuturePurchaseClick = () => {
    setShowFuturePurchase(true);
    setShowPeriodicPurchase(false);
    setShowPurchase(false);
    setShowProposal(false);
    setShowConfirmation(false);
  };

  const handleProposalClick = () => {
    setShowProposal(true);
    setShowPeriodicPurchase(false);
    setShowFuturePurchase(false);
    setShowPurchase(false);
    setShowConfirmation(false);
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
      {product && (
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
          </div>
          <div className="button-group-04">
            <button className="button-04 poppins-regular" onClick={handleBuyClick}>Purchase Now</button>
            <button className="button-04 poppins-regular" onClick={handleProposalClick}>Proposal</button>
            <button className="button-04 poppins-regular" onClick={handlePeriodicPurchaseClick}>Periodic Proposal</button>
            <button className="button-04 poppins-regular" onClick={handleFuturePurchaseClick}>Future Proposal</button>
          </div>
          {showPurchase && (
            <div className="additional-content">
              <input className='poppins-regular input-13' type="number" placeholder='Quantity' />  
              <button className="button-04 poppins-regular">Submit</button>
            </div>
          )}
          {showPeriodicPurchase && (
            <div className="additional-content">
               <input className='poppins-regular input-13' type="number" placeholder='Quantity' /> 
               <input className='poppins-regular input-13' type="text" placeholder='New Price' /> 
               <input className='poppins-regular input-13' type="text" placeholder='Start Date' />
               <button className="button-04 poppins-regular">Submit</button>
            </div>
          )}
          {showFuturePurchase && (
            <div className="additional-content">
              <input className='poppins-regular input-13' type="number" placeholder='Quantity' />  
              <input className='poppins-regular input-13' type="text" placeholder='New Price' /> 
              <input className='poppins-regular input-13' type="text" placeholder='Receive Date' />
              <button className="button-04 poppins-regular">Submit</button>
            </div>
          )}
          {showProposal && (
            <div className="additional-content">
               <input className='poppins-regular input-13' type="number" placeholder='Quantity' /> 
               <input className='poppins-regular input-13' type="text" placeholder='New Price' /> 
               <button className="button-04 poppins-regular">Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
