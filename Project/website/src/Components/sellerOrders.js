import React, { useEffect, useState } from "react";
import '../CSS/sellerOrders.css';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import { fetchSellerId } from '../APIF/seller.fetch';
import { getSellerPurchases, deliverPurchase } from "../APIF/purchase.fetch";
import '../CSS/sellerOrders.css';

function SellerOrders() {
  const [purchases, setPurchases] = useState([]);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    async function getSellerId() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      try {
        const data = await fetchSellerId(token);
        setSellerId(data.sellerid);
      } catch (error) {
        console.error('Failed to fetch seller id:', error);
      }
    }

    getSellerId();
  }, []);

  useEffect(() => {
    async function loadSellerPurchases() {
      if (sellerId) {
        try {
          const purchasesData = await getSellerPurchases(sellerId);
          setPurchases(purchasesData);
        } catch (error) {
          console.error('Error fetching seller purchases:', error);
          setPurchases([]);
        }
      }
    }

    loadSellerPurchases();
  }, [sellerId]);

  const handleDeliver = async (purchaseId) => {
    try {
      const data = await deliverPurchase(purchaseId);

      // Atualize o estado localmente
      setPurchases(prevPurchases =>
        prevPurchases.map(purchase =>
          purchase.idpurchase === purchaseId
            ? { ...purchase, state: 'Delivered' }
            : purchase
        )
      );
    } catch (error) {
      console.error('Error delivering purchase:', error);
    }
  };

  return (
    <div className="navbar-position">
      <Navbar />
      <div className="purchases-container">
        <h2 className="purchases-title">My Purchases</h2>
        <table className="purchases-table">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Buy Date</th>
              <th>Preview Date</th>
              <th>Definitive Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Future Date</th>
              <th>Product Name</th>
              <th>Purchase Type</th>
              <th>Buyer</th>
              <th>Start Day</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.idpurchase}>
                <td>{purchase.idpurchase}</td>
                <td>{purchase.buydate}</td>
                <td>{purchase.previewdate}</td>
                <td>{purchase.definitivedate || 'N/A'}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.price}</td>
                <td>{purchase.futurepurchase || 'N/A'}</td>
                <td>{purchase.name}</td>
                <td>{purchase.type}</td>
                <td>{purchase.user_name}</td>
                <td>{purchase.startday || 'N/A'}</td>
                <td>{purchase.state}</td>
                <td>
                  {purchase.state === 'In Preparation' && (
                    <button className="deliver-button" onClick={() => handleDeliver(purchase.idpurchase)}>Deliver</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerOrders;
