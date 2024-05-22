import React from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';

//Component imports
import Register from './Components/register'
import E404 from './Components/e404'
import Login from './Components/logIn'
import Home from './Components/home'
import ProfileView from './Components/profileView';
import Buy from './Components/buy';
import ProductRegister from './Components/productRegist';
import SellerRegister from './Components/sellerRegist';
import SellerOrders from './Components/sellerOrders';
import SellerProducts from './Components/sellerProducts';
import Orders from './Components/orders';
import Ranking from './Components/ranking';
import Favorites from './Components/favorites';
import AboutUs from './Components/aboutUs';
import SellerOptions from './Components/sellerOptions';

// #region Routes
const mainRoutes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <E404 />
  },

  {
    path: 'login',
    element: <Login />,
  },
  
  {
    path: 'register',
    element: <Register />
  },

  {
    path: 'home',
    element: <Home />
  },

  {
    path: 'sellerOptions',
    element: <SellerOptions />
  },

  {
    path: 'productRegist',
    element: <ProductRegister />
  },

  {
    path: 'sellerRegist',
    element: <SellerRegister />
  },

  {
    path: 'sellerProducts',
    element: <SellerProducts />
  },

  {
    path: 'sellerOrders',
    element: <SellerOrders />
  },

  {
    path: 'profileView',
    element: <ProfileView/>
  },

  { 
    path: 'buy',
    element: <Buy />
  },
 
  {
    path: 'orders',
    element: <Orders />
  },

  {
    path: 'ranking',
    element: <Ranking />
  },

  {
    path: 'favorites',
    element: <Favorites />
  },

  {
    path: 'aboutUs',
    element: <AboutUs />
  },

];

// Função para gerar rotas de produtos dinamicamente
const generateProductRoutes = () => {
  const productRoutes = [];
  
  for (let i = 1; i <= 9; i++) {
    productRoutes.push({
      path: `products/${i}`,
      element: <Home />, // Substitua <Home /> pelo componente apropriado para detalhes do produto
    });
  }
  return productRoutes;
};

const prodRoutes = [
  {
    path: 'products',
    element: <Home/>
  }
];

// Combinando as rotas principais com as rotas de produtos geradas dinamicamente
const combinedRoutes = [...mainRoutes, ...prodRoutes, ...generateProductRoutes()];

// Criando o roteador
const router = createBrowserRouter(createRoutesFromElements(
  combinedRoutes.map(route => (
    <Route key={route.path} path={route.path} element={route.element} errorElement={route.errorElement} />
  ))
));

//-------------------------------------------STOP HERE-----------------------------------
/*const prodRoutes = [
  {
    path: 'teste',
    element: <Home/>
  }
];*/

//const combinedRoutes = [...mainRoutes,...prodRoutes];

//const router = createBrowserRouter(combinedRoutes);

// #endregion

const root = createRoot(document.getElementById('root')); // Use createRoot de react-dom/client
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



// Se você deseja começar a medir o desempenho em sua aplicação, passe uma função
// para registrar resultados (por exemplo: reportWebVitals(console.log))
// ou envie para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
function reportWebVitals(onPerfEntry) {
  // Aqui você pode implementar a lógica para medir o desempenho da sua aplicação
  // Consulte a documentação do Web Vitals para obter mais informações: https://web.dev/vitals/
}
