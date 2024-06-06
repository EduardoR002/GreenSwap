import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { fetchUserId } from '../APIF/user.fetch';
import { getUserProposals } from '../APIF/proposal.fetch'; // Certifique-se de criar e importar a função corretamente
import '../CSS/userproposal.css';

function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadUserProposals() {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userData = await fetchUserId(token);
        setUserId(userData.id);
        
        const proposalsData = await getUserProposals(userData.id);
        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching user proposals:', error);
        setProposals([]);
      }
    }

    loadUserProposals();
  }, []);

  return (
    <div className="navbar-position">
      <Navbar />
      <div className="proposals-container">
        <h2 className="proposals-title">My Proposals</h2>
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Original Price</th>
              <th>New Price</th>
              <th>Type</th>
              <th>State</th>
              <th>Start Day</th>
              <th>Future Date</th>
              <th>Seller Name</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal.idproposal}>
                <td>{proposal.idproposal}</td>
                <td>{proposal.product_name}</td>
                <td>{proposal.product_description}</td>
                <td>{proposal.quantity}</td>
                <td>{proposal.product_price}</td>
                <td>{proposal.newprice}</td>
                <td>{proposal.proposal_type}</td>
                <td>{proposal.proposal_state}</td>
                <td>{proposal.startday || 'N/A'}</td>
                <td>{proposal.futuredate || 'N/A'}</td>
                <td>{proposal.seller_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Proposals;