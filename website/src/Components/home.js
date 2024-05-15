import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
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
      <>

      {/*não apagar, é só pra testar os links e páginas */}
      <div>
      <Link to={'../register'}>Register</Link>
      <p></p>
      <Link to={'../logIn'}>Login</Link>
      <p></p>
      <Link to={'../productRegist'}>Regist Product</Link>
      <p></p>
      <Link to={'../sellerRegist'}>Regist Seller</Link>
      <p></p>
    </div>

        <p><br/><br/><br/><br/><br/><br/>Home works!</p>
      </> 
    );
}

export default Home;
