import React, { useState, useEffect } from 'react';
import '../CSS/navbar.css';
import Navbar from './navbar';
import '../CSS/login.css';
import '../CSS/certifier.css';
import { fetchRequestSeller } from '../APIF/requestSeller';

//Function that will present About Us page of the website
function Certifier() {
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

  function getStateClass(idstate) {
    switch (idstate) {
        case 1:
            return 'pending';
        case 2:
            return 'accepted';
        case 3:
            return 'refused';
        default:
            return '';
    }
}

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
                                {/*<th className='poppins-regular'><b>Photo</b></th>*/}
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
                                <td className={`poppins-regular ${getStateClass(request[index].idstate)}`}>{request[index].idstate}</td>
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