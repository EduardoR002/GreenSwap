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
      if (res.ok) {
        return data;
      } else {
        throw new Error(`Failed to fetch seller requests: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
  
  export { fetchRequestSeller };