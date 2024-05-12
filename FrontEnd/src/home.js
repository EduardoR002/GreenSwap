import React, { useEffect } from 'react';
import './home.css';
import './navbar.css';
import NavigationTab from './navigationTab'; // Importe o componente NavigationTab corretamente

function HomePage() {
  useEffect(() => {
    // Este useEffect pode ser removido, pois a lógica para fetch e estilizar já está no componente NavigationTab
  }, []);

  return (
    <div>
      <NavigationTab /> {/* Use o componente NavigationTab aqui */}
      
      {/* Restante do conteúdo da página */}
      {/* Text box que permite ao usuário escrever o produto que deseja pesquisar */}
      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>

      <a href="logIn.html">Login</a>
      <br />
      <br />
    </div>
  );
}

export default HomePage;