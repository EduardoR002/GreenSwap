import React from "react";
import '../CSS/home.css';
import '../CSS/navbar.css';
//import Navbar from './Components/navBar';

//Function that will apresent website Home page
function Home() {

    return(
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
        </div>
    )


    //Arranjar forma de meter a navbar, provavelmente com routes, pra ir buscar o componenten Navbar
    /*
        <React.StrictMode>
            <Navbar />
        </React.StrictMode>                   ?????

    */

}

export default Home;
