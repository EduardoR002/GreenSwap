import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts(); // Chama a função getAllProducts() assim que o componente for montado
    }, []);
    const getAllProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/product/getall');
            const jsonData = await res.json();
            setProducts(jsonData.products); // Define os produtos recebidos no estado 'products'
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    return (
        <div className="App">
        <div>
        <Link to={'../login'}> -Login</Link>
        <br ></br>
        <br ></br>
          <Link to={'../register'}>-Create</Link>
          <br ></br>
          <br ></br>
          <br ></br>
          <br ></br>
          <br ></br>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Seller</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.typeName}</td>
                  <td>{product.sellerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Home;
