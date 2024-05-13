import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot de react-dom/client
//import Login from './Components/logIn'; // Importe o componente de login que você criou
import Teste from './Components/teste';

const root = createRoot(document.getElementById('root')); // Use createRoot de react-dom/client
root.render(
  <React.StrictMode>
  <Teste/>
</React.StrictMode>
);

// Se você deseja começar a medir o desempenho em sua aplicação, passe uma função
// para registrar resultados (por exemplo: reportWebVitals(console.log))
// ou envie para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
function reportWebVitals(onPerfEntry) {
  // Aqui você pode implementar a lógica para medir o desempenho da sua aplicação
  // Consulte a documentação do Web Vitals para obter mais informações: https://web.dev/vitals/
}
