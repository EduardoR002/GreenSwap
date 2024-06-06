import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { fetchUserId } from '../APIF/user.fetch';
import { getUserPurchases } from '../APIF/purchase.fetch'; // Certifique-se de criar e importar a função corretamente
import '../CSS/userPurchases.css';

function UserPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadUserPurchases() {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userData = await fetchUserId(token);
        setUserId(userData.id);
        
        const purchasesData = await getUserPurchases(userData.id);
        setPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching user purchases:', error);
        setPurchases([]);
      }
    }

    loadUserPurchases();
  }, []);

  return (
    <div className="navbar-position">
      <Navbar />
      <div className="purchases-container">
        <h2 className="purchases-title">My Purchases</h2>
        <table className="purchases-table">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Buy Date</th>
              <th>Preview Date</th>
              <th>Definitive Date</th>
              <th>Purchase State</th>
              <th>Purchase Type</th>
              <th>Seller Name</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.idpurchase}>
                <td>{purchase.idpurchase}</td>
                <td>{purchase.product_name}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.price}</td>
                <td>{purchase.buydate}</td>
                <td>{purchase.previewdate}</td>
                <td>{purchase.definitivedate || 'N/A'}</td>
                <td>{purchase.purchasestate}</td>
                <td>{purchase.purchasetype}</td>
                <td>{purchase.seller_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserPurchases;
