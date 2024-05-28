import React, { useState, useEffect } from 'react';
import '../CSS/navbar.css';
import Navbar from './navbar';
import '../CSS/login.css';
import '../CSS/certifier.css';
import { fetchRequestSeller } from '../APIF/requestSeller';

function Certifier() {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    fetchRequestSeller()
      .then(data => {
        if (data) {
          setRequests(data); // Set the data directly to the requests state
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
      <div className="navbar-position">
        <Navbar />
        <div className="main-04 formDiv-04 space-15">
          {requests ? (
            <table>
              <thead>
                <tr>
                  <th className='poppins-regular'><b>Req ID</b></th>
                  <th className='poppins-regular'><b>User ID</b></th>
                  <th className='poppins-regular'><b>NIF</b></th>
                  <th className='poppins-regular'><b>Req State</b></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index}>
                    <td className='poppins-regular'>{request.idrequestseller}</td>
                    <td className='poppins-regular'>{request.iduser}</td>
                    <td className='poppins-regular'>{request.nif}</td>
                    <td className={`poppins-regular ${getStateClass(request.idstate)}`}>{request.idstate}</td>
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
  );
}

export default Certifier;