import React, { useRef }  from "react";
import '../CSS/productRegist.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";


//Function that will present user Regist page of the website
function ProductRegister() {
    const handleProductRegister = async () => {
      const formData = {
        name: document.getElementById('productName').value,
        type: document.getElementById('productType').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value,
        description: document.getElementById('productDescription').value,
      }
      try {
        const res = await fetch('http://localhost:3000/product/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        if (res.status === 200) {
          const data = await res.json();
          document.cookie = `user=${data.user.name}; path=/`;
          alert("Criado com sucesso");
      }      
        else if (res.status === 422) {
          alert("Phone number must be 9 digits long")  //--------------- MUDAR ERROS ------------------------------
        }
        else if(res.status === 409){
          const data = await res.json()
          if (data.message === "Email already exists") {
            alert("Email already exist")
          }
          else if(data.message === "Phone number already exists"){
            alert("Phone number already exist")
          }
          
        }
      } catch (error) {
        console.error('Erro:', error.message);
      }
    }
    return(
        <>
        
        <div className="main-07">
          {/* Form */}
          <div className="formDiv-07">
            <h1>ADD PRODUCT</h1>

            <div className="input-box-07">
                <label for="productPhoto" >Foto do Produto:
                <input
                className="poppins-regular input-07"
                type="file"
                id="productPhoto"
                accept="image/*"
                />
                </label>
            </div>

            <div className="input-box-07">
                <label for="name">Product Name:
                <input
                className="poppins-regular input-07"
                type="text"
                id="productName"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07">
            <label for="type">Product Type:
                <input
                className="poppins-regular input-07"
                type="text"
                id="productType"
                placeholder=""
                />
                </label>
            </div>
            
            
            <div className="input-box-07">
            <label for="price">Price ($/Kg):
                <input
                className="poppins-regular input-07"
                type="number"
                id="productPrice"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07">
            <label for="name">Quantity (Kg):
                <input
                className="poppins-regular input-07"
                type="number"
                id="productQuantity"
                placeholder=""
                />
                </label>
            </div>

            <div className="input-box-07">
            <label for="price">Description:
                <input
                className="poppins-regular input-07"
                type="text"
                id="productDescription"
                placeholder=""
                />
                </label>
            </div>
            
            {/*Button that will regist the new product */}
            <button className="poppins-regular button-07" onClick={handleProductRegister}>
              Regist Product
            </button>

            <br></br>

        </div>
    </div>

      </>

    )
}

export default ProductRegister;