import React, { useRef }  from "react";
import '../CSS/sellerRegist.css'
import logo from '../images/GreenSwap.png'
import { Link } from "react-router-dom";

//Function that will present user Regist page of the website
function SellerRegister() {
    const handleSellerRegister = async () => {
      const formData = {
        email: document.getElementById('email').value,
        description: document.getElementById('productDescription').value,
      }
      try {
        const res = await fetch('http://localhost:3000/seller/create', {
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
        <div className="main-08">
          {/* Form */}
          <div className="formDiv-08">
            <h1>USER REQUEST TO BE A SELLER</h1>
        

            <div className="input-box-07">
                <label for="email">Email:
                <input
                className="poppins-regular input-08"
                type="text"
                id="email"
                placeholder=""
                />
                </label>
            </div>
            
            

            <div className="input-box-08">
            <label for="price">Description:
                <input
                className="poppins-regular input-08"
                type="text"
                id="productDescription"
                placeholder=""
                />
                </label>
            </div>
            
            {/*Button that will send user request to be a seller */}
            <button className="poppins-regular button-08" onClick={handleSellerRegister}>
              Submit Request
            </button>

            <br></br>

        </div>
    </div>
      </>

    )
}

export default SellerRegister;