import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/productPage.css';
import Navbar from './navbar';

function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const prodPath = 'http://localhost:3000/product/get/' + productId;
        const res = await fetch(prodPath, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProductData(data.product); // Armazenar os dados do produto em productData
        } else {
          console.error('Failed to fetch product:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchProduct(); // Chamando a função para buscar o produto ao montar o componente

  }, [productId]);
  
  return (
    <>
        <div className="navbar-position"> {/* Navbar common to all pages*/}
            <Navbar />
            {productData ? (
                <>
                    <div className='prod-cont-13'>

                        <div className='prod-cont-left-13'>
                            <div className='prod-frame-13' />
                        </div>
                        <div className='prod-cont-right-13'>
                            <div className='pct-up'>
                                <span className='poppins-regular prod-name-13'>{productData.name}</span>
                                <span className='poppins-regular user-name-13'>{productData.idseller}</span> {/*DBCHANGE*/}
                                <span className='poppins-regular prod-price-13'>{productData.price}€/Kg</span>
                                <span className='poppins-regular prod-desc-13'>{productData.description}</span>
                            </div>

                            <div className='pct-down'>
                                <div className=''>
                                    <input className='poppins-regular input-13' placeholder='Novo Preço'></input>
                                </div>
                                <div>
                                    <input className='poppins-regular input-13' placeholder='Quantidade'></input>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                    </div>

                    <div className='more-prods-cont-13'>

                    </div>
                </>
            ) : (
                <p className='poppins-regular'>Loading...</p>
            )}
            
        </div>
    </> 

  );
}

export default ProductPage;
