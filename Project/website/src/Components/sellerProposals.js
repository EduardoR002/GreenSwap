import React, { useEffect, useState } from 'react';
import '../CSS/ranking.css'; // TO CHANGE
import '../CSS/navbar.css';
import Navbar from './navbar';
import { fetchUserId } from '../APIF/user.fetch';
import { getSellerProposals, acceptProposal, rejectProposal } from '../APIF/proposal.fetch'; // Adicione as funções para aceitar e recusar propostas

function SellerProposals() {
  const [proposals, setProposals] = useState([]);
  const [userId, setUserId] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function loadUserProposals() {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userData = await fetchUserId(token);
        setUserId(userData.id);
        
        const proposalsData = await getSellerProposals(userData.id);
        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching user proposals:', error);
        setProposals([]);
      }
    }

    loadUserProposals();
  }, []);

  const handleAccept = async (idproposal) => {
    try {
      await acceptProposal(idproposal);
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.idproposal === idproposal ? { ...proposal, state: 'Accepted' } : proposal
        )
      );
      setPopupMessage('Proposal accepted successfully');
      setShowPopup(true);
    } catch (error) {
      console.error('Error accepting proposal:', error);
      setPopupMessage('Failed to accept proposal');
      setShowPopup(true);
    }
  };

  const handleReject = async (idproposal) => {
    try {
      await rejectProposal(idproposal);
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.idproposal === idproposal ? { ...proposal, state: 'Rejected' } : proposal
        )
      );
      setPopupMessage('Proposal rejected successfully');
      setShowPopup(true);
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      setPopupMessage('Failed to reject proposal');
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload(); // Dar refresh à página
  };

  return (
    <div className="navbar-position">
      <Navbar />
      <div className="proposals-container">
        <h2 className="proposals-title">My Proposals</h2>
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Proponent</th>
              <th>Product Name</th>
              <th>Type Product</th>
              <th>Price</th>
              <th>New Price</th>
              <th>State</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Future Date</th>
              <th>Start Day</th>
              <th>Actions</th> {/* Nova coluna para ações */}
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal.idproposal}>
                <td>{proposal.idproposal}</td>
                <td>{proposal.proponent}</td>
                <td>{proposal.name}</td>
                <td>{proposal.type_product}</td>
                <td>{proposal.price}</td>
                <td>{proposal.newprice}</td>
                <td>{proposal.state}</td>
                <td>{proposal.type}</td>
                <td>{proposal.quantity}</td>
                <td>{proposal.futuredate || 'N/A'}</td>
                <td>{proposal.startday || 'N/A'}</td>
                <td>
                  {proposal.state === 'Pending' && (
                    <>
                      <button onClick={() => handleAccept(proposal.idproposal)}>Accept</button>
                      <button onClick={() => handleReject(proposal.idproposal)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>{popupMessage}</p>
              <button onClick={handleClosePopup}>Ok</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProposals;
