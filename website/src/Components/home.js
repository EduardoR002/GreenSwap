import React, { useState, useEffect } from 'react';
import '../CSS/home.css';
import '../CSS/navbar.css';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function getCookie(name){
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;
  
  cArray.forEach(element => {
      if(element.indexOf(name) == 0){
          result = element.substring(name.length + 1)
      }
  })
  return result;
}

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
      <Link to={'../profileView'}>View Profile</Link>
      <p></p>
      <Link to={'../orders'}>Orders</Link>
      <p></p>
      <Link to={'../ranking'}>Ranking</Link>
      <p></p>
      <Link to={'../aboutUs'}>About Us</Link>     
      <p></p>
    </div>

      </> 
    );
}

export default Home;
