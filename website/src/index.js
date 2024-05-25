import React from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';
import { validateToken } from './Components/home';

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
import SellerProposals from './Components/sellerProposals';
import Proposals from './Components/proposals';
import ProductPage from './Components/productPage';

let vt_res = await validateToken();

const role = vt_res.role;
const isLoggedIn = vt_res.loggedin;

console.log("This user is logged in? -> "+isLoggedIn+" Role: "+role);

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
    element: (role === "seller") ? <SellerOptions /> : <Login />
  },

  {
    path: 'productRegist',
    element: (role === "seller") ? <ProductRegister /> : <Login/>
  },

  {
    path: 'sellerRegist',
    element: (role === "seller") ? <SellerRegister /> : <Login/>
  },

  {
    path: 'sellerProducts',
    element: (role === "seller") ? <SellerProducts /> : <Login/>
  },

  {
    path: 'sellerOrders',
    element: (role === "seller") ? <SellerOrders /> : <Login/>
  },

  {
    path: 'sellerProposals',
    element: (role === "seller") ? <SellerProposals /> : <Login/>
  },

  {
    path: 'profileView',
    element: isLoggedIn ? <ProfileView/> : <Login/>
  },

  { 
    path: 'buy',
    element: isLoggedIn ? <Buy /> : <Login/>
  },
 
  {
    path: 'orders',
    element: isLoggedIn ? <Orders /> : <Login/>
  },

  {
    path: 'proposals',
    element: isLoggedIn ? <Proposals /> : <Login/>
  },

  {
    path: 'ranking',
    element: <Ranking />
  },

  {
    path: 'favorites',
    element: isLoggedIn ? <Favorites /> : <Login/>
  },

  {
    path: 'aboutUs',
    element: <AboutUs />
  },
  {
    path: 'products/:productId', // Make sure the path includes a parameter for the product ID
    element: <ProductPage />, 
  }
];

async function getProds() {
  const product = [];

  const formData = {
    search_name: " ",
    max_price: 0,
    min_price: 0
  };

  try {
    const res = await fetch('http://localhost:3000/product/getall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) { // Verifica se o status da resposta está no intervalo 200-299
      const products = Object.values(data.products[0]);
      for (let i = 0; i < products.length; i++) {

        product[i]={
          "idproduct": products[i].idproduct,
          "name": products[i].name,
          "description": products[i].description,
          "price": products[i].price,
          "stock": products[i].stock,
          "idtypeproduct": products[i].idtypeproduct,
          "idseller": products[i].idseller,
          "typeproduct": products[i].typeproduct,
          "seller_name": products[i].seller_name
        }
      }
      return product;

    } else {
      console.error('Failed to fetch products:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Função para gerar rotas de produtos dinamicamente
const generateProductRoutes = async () => {
  try {
    const product = await getProds();

    const productRoutes = [];

    console.log(product[0].idproduct)

    for (let i = 0; i <= product.length; i++) {
      productRoutes.push({
        path: `products/${product[i].idproduct}`,
        element: <ProductPage />, 
      });
    }

    return productRoutes;
  } catch (error) {
    console.error('Error generating product routes:', error);
    return []; // Return an empty array in case of error
  }
};


// Combinando as rotas principais com as rotas de produtos geradas dinamicamente
const combinedRoutes = [...mainRoutes, ...await generateProductRoutes()];

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
