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
                    <div className='prod-cont'>
                        <div className='prod-cont-left'>
                            <div className='prod-frame' />
                        </div>
                        <div className='prod-cont-right'>
                            <span className='poppins-regular'>{productData.name}</span>
                        </div>
                    </div>

                    <div className='more-prods-cont'>

                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    </> 

  );
}

export default ProductPage;
