import React from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Component imports
import Register from './Components/register'
import E404 from './Components/e404'
import Login from './Components/logIn'
import Home from './Components/home'
import ProductRegister from './Components/productRegist';

// #region Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
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
    path: 'productRegister',
    element: <ProductRegister />
  },

  /*
  {
    path: 'profileView'
    element: <ProfileView/>
  }

  {
    path: 'profileEdit'
    element: <ProfileEdit/>
  }

  {
    path:'order'
    elements: <Order />
  }

  {
    path: 'ranking'
    element: <Ranking />
  }

  {
    path: 'aboutUs'
    element: <AboutUs/>
  }

  {
    path: 'productView'
    element: <ProductView />
  }


  */
]);
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
