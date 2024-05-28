import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../CSS/navbar.css';
import Navbar from './navbar';
import '../CSS/logIn.css';
import '../CSS/certifier.css';
import { fetchRequestSeller } from '../APIF/requestSeller';

//Function that will present About Us page of the website
function Certifier() {
  //COPY COPY COPY COPY COPY
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    fetchRequestSeller()
      .then(data => {
        if (data) {
          const requests = Object.values(data);
          setRequests(requests); // Definindo o produto no estado
        } else {
          console.error("Requests are undefined or null.");
        }
      })
      .catch(error => {
        console.error('Error fetching Requests:', error);
      });
  }, []); 
  //COPY COPY COPY COPY COPY

    return (
        <>
            <div id="bg-04" />
            <div className="navbar-position"> {/* Navbar common to all pages*/}
                <Navbar />
                <div className="main-04 formDiv-04 space-15">
                   {requests ? (
                    <table>
                        <thead>
                            <tr>
                                <th className='poppins-regular'><b>Req ID</b></th>
                                <th className='poppins-regular'><b>User ID</b></th>
                                <th className='poppins-regular'><b>NIF</b></th>
                                <th className='poppins-regular'><b>Photo</b></th>
                                <th className='poppins-regular'><b>Req State</b></th>
                            </tr>
                        </thead>
                        <tbody>
                        {requests.map((request, index) => (
                            <tr>
                                <td className='poppins-regular'>{request[index].idrequestseller}</td>
                                <td className='poppins-regular'>{request[index].iduser}</td>
                                <td className='poppins-regular'>{request[index].nif}</td>
                                {/*<td className='poppins-regular'>{request.photo}</td>*/}
                                <td className='poppins-regular'>{request[index].idstate}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                   ) : (
                    <p>Loading...</p>
                   )}
                </div>
            </div>
        </>
    )
}

export default Certifier;