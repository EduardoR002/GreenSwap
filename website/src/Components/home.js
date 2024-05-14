import React from "react";
import '../CSS/home.css';
import '../CSS/navbar.css';
//import Navbar from './Components/navBar';

//Function that will apresent website Home page
<<<<<<< Updated upstream
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
=======
export default function Home() {
    return(
        <>
            {/*Navigation Topper*/}
            <div id="navigation" />
            {/*Page Content*/}
            {/*Text box that allows the user to write the product they want to search for*/}
            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>
            <a href="logIn.html">
                Login
            </a>
        </>
    );
}

>>>>>>> Stashed changes
