import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../CSS/productPage.css';
import '../CSS/login.css'
import Navbar from './navbar';
import { fetchProduct } from '../APIF/prod.fetch.js';

function ProductPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId)
      .then(productData => {
        if (productData) {
          const product = productData[0];
          setProduct(product); // Definindo o produto no estado
        } else {
          console.error("Product is undefined or null.");
        }
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId]); // Executa o efeito sempre que productId mudar
  
  // Função para lidar com o clique no botão "Comprar"
  const handleBuyClick = () => {
    setShowConfirmation(true); // Define o estado para mostrar a confirmação
  };

  return (
    <>
    <div className="navbar-position">
        <Navbar />
        {product && !showConfirmation ? ( // Verifica se o produto está carregado e não há confirmação
            <>
                <div className='prod-cont-13'>
                    <div className='prod-cont-left-13'>
                        <div className='prod-frame-13' />
                    </div>
                    <div className='prod-cont-right-13'>
                        <div className='pct-up'>
                            <span className='poppins-regular prod-name-13'>{product.name}</span>
                            <span className='poppins-regular user-name-13'>{product.seller}</span>
                            <span className='poppins-regular prod-price-13'>{product.price}€/Kg</span>
                            <span className='poppins-regular prod-desc-13'>{product.description}</span>
                        </div>
                        <div className='pct-down'>
                          <input className='poppins-regular input-13' placeholder='Novo Preço'></input>
                          <input className='poppins-regular input-13' placeholder='Quantidade'></input>
                          <button className="button-04 poppins-regular" onClick={handleBuyClick}>Comprar</button>
                        </div>
                    </div>
                </div>
                <div className='more-prods-cont-13'></div>
            </>
        ) : showConfirmation ? (
            <p className='poppins-regular'>Obrigado pela sua escolha!</p> // Mostra a confirmação após o clique no botão
        ) : (
            <p className='poppins-regular'>Loading...</p>
        )}
    </div>
  </>
  );
}

export default ProductPage;
