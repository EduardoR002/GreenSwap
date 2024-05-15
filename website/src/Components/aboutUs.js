import React, { useRef }  from "react";
import '../CSS/aboutUs.css'
import logo from '../images/VerDev.png'
import { Link } from "react-router-dom";

//Function that will present About Us page of the website
function AboutUs() {

    return (
        <div>
          
          <div className="cont-09">
            <h1>&emsp;GreenSwap:</h1>
            
            
            <p>
              &emsp;&emsp;&emsp;GreenSwap is a digital platform that revolutionizes the trade of organic products, offering an intuitive and accessible interface for both independent
              producers and consumers to interact directly and efficiently. Through this application, producers have the opportunity to sell their products, highlighting their quality
              and sustainable origin, while consumers can explore a wide variety of options and make their purchases conveniently and securely.
            </p>
            
            <br />
            
            <h1>&emsp;VerDev:</h1>
            
            <p>
              &emsp;&emsp;&emsp;VerDev is a forward-thinking tech company driven by a passion for environmental sustainability. Our dedicated team of developers is committed to crafting innovative software 
              solutions that tackle pressing ecological issues. Through collaboration and inclusivity, we strive to pave the way for a greener future, one line of code at a time. Join us as we 
              redefine the intersection of technology and environmentalism, setting new standards for sustainable innovation.
            </p>
          
          <br />
          
          <h1>&emsp;Contacts:</h1>
          
          <p>&emsp;<u>Email</u>: GreenSwap@gmail.com / VerDev@gmail.com</p>
          <p>&emsp;<u>Telephone</u>: 253270996</p>
          <p>&emsp;<u>Location</u>: Rua dos Sebosos, Barcelos 4705-670</p>
          
          <img
                    src={logo}
                    style={{ width: "10%", height: "10%" }}
                    className="icon-04"
            />

          </div>
        </div>
      );
    }

export default AboutUs;