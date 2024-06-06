const API_BASE_URL = 'http://localhost:3000';

async function createDirectProposal(newPrice, idProduct, idUser, quantity) {
    const directProposalPath = `${API_BASE_URL}/proposal/createDirectProposal`;
    const formData = {
      newprice: newPrice,
      idproduct: idProduct,
      iduser: idUser,
      quantity: quantity
    };
    try {
      const res = await fetch(directProposalPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched proposal data:', data); // Adicione este log para verificar os dados recebidos
        return true;
      } else {
        throw new Error(`Failed to create proposal: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
}

async function createPeriodicProposal(newPrice, idProduct, idUser, quantity, startDay) {
    const periodicProposalPath = `${API_BASE_URL}/proposal/periodicproposal`;
    const formData = {
      newprice: newPrice,
      idproduct: idProduct,
      iduser: idUser,
      quantity: quantity,
      startday: startDay,
    };
    try {
      const res = await fetch(periodicProposalPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched periodic proposal data:', data); // Adicione este log para verificar os dados recebidos
        return true;
      } else {
        throw new Error(`Failed to create periodic proposal: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
}

async function createFutureProposal(newPrice, idProduct, idUser, quantity, futurePurchase) {
    const futureProposalPath = `${API_BASE_URL}/proposal/futureproposal`;
    const formData = {
      newprice: newPrice,
      idproduct: idProduct,
      iduser: idUser,
      quantity: quantity,
      futurepurchase: futurePurchase,
    };
    try {
      const res = await fetch(futureProposalPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched future proposal data:', data);
        return true;
      } else {
        throw new Error(`Failed to create future proposal: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
}

async function getUserProposals(userId) {
  const userProposalsPath = `${API_BASE_URL}/proposal/getUserProposals`;
  const formData = {
      userId: userId
    };
    try {
      const res = await fetch(userProposalsPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched user proposals:', data);
        // Convert object with numeric keys to array
        return Object.values(data);
      } else {
        throw new Error(`Failed to fetch user proposals: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
}

async function getSellerProposals(userId) {
  const sellerProposalsPath = `${API_BASE_URL}/proposal/getSellerProposals`;
  const formData = {
    userId: userId
  };
  try {
    const res = await fetch(sellerProposalsPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Fetched seller proposals:', data);
      // Convert object with numeric keys to array
      return Object.values(data);
    } else {
      throw new Error(`Failed to fetch seller proposals: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function acceptProposal(idproposal) {
  const response = await fetch(`${API_BASE_URL}/proposal/acceptproposal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idproposal})
  });
  if (!response.ok) {
    throw new Error('Failed to accept proposal');
  }
  return await response.json();
}

async function rejectProposal(idproposal) {
  const response = await fetch(`${API_BASE_URL}/proposal/refuseproposal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idproposal})
  });
  if (!response.ok) {
    throw new Error('Failed to reject proposal');
  }
  return await response.json();
}

export {createDirectProposal, createPeriodicProposal, createFutureProposal, getUserProposals, getSellerProposals, acceptProposal, rejectProposal}