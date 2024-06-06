const API_BASE_URL = 'http://localhost:3000';

async function fetchProduct(idproduct) {
  const prodPath = `${API_BASE_URL}/product/getproduct`;
  const formData = { 
      idproduct: idproduct
  };
  try {
      const res = await fetch(prodPath, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
          console.log('Fetched product data:', data); // Adicione este log para verificar os dados recebidos
          return data;
      } else {
          throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
      }
  } catch (error) {
      throw new Error(`Error: ${error.message}`);
  }
}

async function fetchProductType(){
  const prodTypePath = `${API_BASE_URL}/tproduct/getall`;

  try {
    const res = await fetch(prodTypePath, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data.types;
    } else {
        throw new Error(`Failed to fetch types: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export { fetchProduct, fetchProductType };