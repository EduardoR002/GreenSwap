import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/productPage.css';
import '../CSS/login.css';
import Navbar from './navbar';
import { fetchProduct } from '../APIF/prod.fetch.js';
import { createDirectPurchase } from '../APIF/purchase.fetch.js';
import { fetchUserId } from '../APIF/user.fetch';
import { createDirectProposal, createPeriodicProposal, createFutureProposal} from '../APIF/proposal.fetch.js';

function ProductPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showProposalConfirmation, setShowProposalConfirmation] = useState(false);
  const [showPeriodicProposalConfirmation, setShowPeriodicProposalConfirmation] = useState(false);
  const [showFutureProposalConfirmation, setShowFutureProposalConfirmation] = useState(false);
  const [showPeriodicPurchase, setShowPeriodicPurchase] = useState(false);
  const [showFuturePurchase, setShowFuturePurchase] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState('');
  const [startDay, setStartDay] = useState('');
  const [futurePurchaseDate, setFuturePurchaseDate] = useState('');
  const [id, setId] = useState(null);
  const navigate = useNavigate();

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
    async function getId() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      try {
        const data = await fetchUserId(token);
        setId(data.id);
      } catch (error) {
        console.error('Failed to fetch seller id:', error);
      }
    }
    getId();
    loadProduct();
  }, [productId]);

  const handleBuyClick = () => {
    setShowPurchase(true);
    setShowPeriodicPurchase(false);
    setShowFuturePurchase(false);
    setShowProposal(false);
    setShowConfirmation(false);
  };

  const handlePurchaseSubmit = async () => {
    try {
      const buydate = new Date().toISOString().split('T')[0];
      const price = product.price;
      const idUser = id;

      const success = await createDirectPurchase(buydate, quantity, price, productId, idUser);
      if (success) {
        setShowConfirmation(true);
      } else {
        alert('Failed to create purchase');
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert('Error creating purchase');
    }
  };

  const handleProposalSubmit = async () => {
    try {
      const success = await createDirectProposal(newPrice, productId, id, quantity);
      if (success) {
        setShowProposalConfirmation(true);
      } else {
        alert('Failed to create proposal');
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal');
    }
  };

  const handlePeriodicProposalSubmit = async () => {
    try {
      const success = await createPeriodicProposal(newPrice, productId, id, quantity, startDay);
      if (success) {
        setShowPeriodicProposalConfirmation(true);
      } else {
        alert('Failed to create periodic proposal');
      }
    } catch (error) {
      console.error('Error creating periodic proposal:', error);
      alert('Error creating periodic proposal');
    }
  };

  const handleFutureProposalSubmit = async () => {
    try {
      const success = await createFutureProposal(newPrice, productId, id, quantity, futurePurchaseDate);
      if (success) {
        setShowFutureProposalConfirmation(true);
      } else {
        alert('Failed to create future proposal');
      }
    } catch (error) {
      console.error('Error creating future proposal:', error);
      alert('Error creating future proposal');
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleNewPriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleStartDayChange = (e) => {
    setStartDay(e.target.value);
  };

  const handleFuturePurchaseDateChange = (e) => {
    setFuturePurchaseDate(e.target.value);
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

  const handleOkClick = () => {
    navigate('/');
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
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button className="button-04 poppins-regular" onClick={handlePurchaseSubmit}>Submit</button>
            </div>
          )}
          {showProposal && (
            <div className="additional-content">
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="New Price"
                value={newPrice}
                onChange={handleNewPriceChange}
              />
              <button className="button-04 poppins-regular" onClick={handleProposalSubmit}>Submit</button>
            </div>
          )}
          {showPeriodicPurchase && (
            <div className="additional-content">
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="New Price"
                value={newPrice}
                onChange={handleNewPriceChange}
              />
              <input
                className='poppins-regular input-13'
                type="date"
                placeholder="Start Day"
                value={startDay}
                onChange={handleStartDayChange}
              />
              <button className="button-04 poppins-regular" onClick={handlePeriodicProposalSubmit}>Submit</button>
            </div>
          )}
          {showFuturePurchase && (
            <div className="additional-content">
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <input
                className='poppins-regular input-13'
                type="number"
                placeholder="New Price"
                value={newPrice}
                onChange={handleNewPriceChange}
              />
              <input
                className='poppins-regular input-13'
                type="date"
                placeholder="Future Purchase Date"
                value={futurePurchaseDate}
                onChange={handleFuturePurchaseDateChange}
              />
              <button className="button-04 poppins-regular" onClick={handleFutureProposalSubmit}>Submit</button>
            </div>
          )}
          {showConfirmation && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Purchase submitted successfully!</p>
                <button className="button-04 poppins-regular popup-button" onClick={handleOkClick}>OK</button>
              </div>
            </div>
          )}
          {showProposalConfirmation && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Proposal submitted successfully!</p>
                <button className="button-04 poppins-regular popup-button" onClick={handleOkClick}>OK</button>
              </div>
            </div>
          )}
          {showPeriodicProposalConfirmation && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Periodic proposal submitted successfully!</p>
                <button className="button-04 poppins-regular popup-button" onClick={handleOkClick}>OK</button>
              </div>
            </div>
          )}
          {showFutureProposalConfirmation && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Future proposal submitted successfully!</p>
                <button className="button-04 poppins-regular popup-button" onClick={handleOkClick}>OK</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
