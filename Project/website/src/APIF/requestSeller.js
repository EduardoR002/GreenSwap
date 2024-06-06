const API_BASE_URL = 'http://localhost:3000';

async function fetchRequestSeller() {
    const path = `${API_BASE_URL}/requestseller/getall`;
    try {
      const res = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const data = await res.json();
      console.log(data.requestSellers);
      if (res.ok) {
        return data.requestSellers;
      } else {
        throw new Error(`Failed to fetch seller requests: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
  
async function fetchAcceptSellerRequest(idrequestseller, idcertifier){
  const path = `${API_BASE_URL}/certificate/acceptseller`;

  const formData = { 
    idrequestseller : idrequestseller,
    idcertifier : idcertifier
  };

  try {
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function fetchRefuseSellerRequest(idrequestseller){
  const path = `${API_BASE_URL}/certificate/refuseseller`;

  const formData = { 
    idrequestseller : idrequestseller,
  };

  try {
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export { fetchRequestSeller, fetchAcceptSellerRequest, fetchRefuseSellerRequest };