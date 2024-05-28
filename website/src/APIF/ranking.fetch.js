const API_BASE_URL = 'http://localhost:3000';

async function fetchBestProducts() {
    const prodPath = `${API_BASE_URL}/product/getBestProducts`;
    try {
      const res = await fetch(prodPath, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
  
  export { fetchBestProducts };