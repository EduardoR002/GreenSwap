import React, { useRef }  from "react";
import '../CSS/profileView.css'
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';

//Function that will present  user profile page on website
function ProfileView() {

    return (

      <div className="navbar-position"> {/* Navbar common to all pages*/}
        <Navbar />

           
        <div>
          <div className="profile">
            <img className="profile-pic" src="../images/exemploPerfil.png" alt="Foto de Perfil" />
            <div className="profile-info">
              <label htmlFor="nome">Name:</label>
              <p id="nome">Pedro Daniel Fernandes Rei</p>
              <br />
              <label htmlFor="data-nascimento">Birth Date:</label>
              <p id="data-nascimento">dd/mm/aaaa</p>
              <br />
              <label htmlFor="morada">Adress:</label>
              <p id="morada">Ferreiros, Braga</p>
              <br />
              <label htmlFor="biografia">Biography:</label>
              <p id="biografia">Desde pequena que adoro vender fruta e legumes das minhas hortas naturais e quero levar para o mundo os meus produtos</p>
            </div>
          </div>
    
          <div className="yourProducts">
            <h1>My Products</h1>
            <div className="row">
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 1" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 3" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 2" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 2" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 3" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 3" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 4" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
              <div className="column">
                <img src="../images/exemploProduto.png" alt="Foto 2" />
                <p><b>Green Grapes<br />(55$/Kg)</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }

export default ProfileView;