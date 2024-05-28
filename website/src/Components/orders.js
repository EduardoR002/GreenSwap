import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from './navbar';
import '../CSS/orders.css';
import '../CSS/navbar.css';

// Função para buscar todas as ordens de um usuário
const fetchUserOrders = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/orders/${userId}`);  //é preciso um getID pra saber o id do user  e ir buscar as suas compras com esta funçâo!!!!!!!!!!!
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 'user123'; // Substitua pelo ID real do usuário

  useEffect(() => {
    const getUserOrders = async () => {
      const data = await fetchUserOrders(userId);
      setOrders(data);
    };

    getUserOrders();
  }, [userId]);

  if (orders.length === 0) {
    return (
      
      <div className="navbar-position">
        <Navbar />
        <div className="no-orders-container">
          <div className="no-orders-message">
            <p className="poppins-regular no-orders-text">You dont have orders at moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-position">

      {/* Navbar comum a todas as páginas */}
      <Navbar />

      {/* Div onde aparecerão as compras do usuário */}
      <div className="orders-container-10">

        {orders.map(order => (
          <div key={order.id} className='product-container-10'>

            {/* Div para informações do produto e imagem */}
            <div className='left-content-10'>
              <Link to={'../products/'} className="Link">
                <img className='product-img-10' src='https://picsum.photos/328/204' alt='Product' />
              </Link>
              <span className='poppins-regular product-h1-10'>{order.productName}</span>
              <span className='poppins-regular product-h2-10'>{order.productPrice}€/kg</span>
              <div className='seller-10'>
                <span className="material-symbols-outlined mso-10">person</span>
                <span className='poppins-regular seller-h3-10'>{order.sellerName}</span>
              </div>
            </div>

            {/* Div para informações da compra */}
            <div className='right-content-10'>
              <span className="poppins-regular product-info-h1-10"><b>Purchase Type:</b> {order.purchaseType}</span><br />
              <span className="poppins-regular product-info-h1-10"><b>Purchase Date:</b> {order.purchaseDate}</span><br />
              <span className="poppins-regular product-info-h1-10"><b>Quantity:</b> {order.quantity} kg</span><br />
              <span className="poppins-regular product-info-h1-10"><b>Price:</b> {order.price}€</span><br />
              <span className="poppins-regular product-info-h1-10"><b>Date Received (estimated):</b> {order.dateReceived}</span><br />
              <span className="poppins-regular product-info-h1-10"><b>State:</b> {order.state}</span><br />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Orders;