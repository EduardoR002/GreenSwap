const API_BASE_URL = 'http://localhost:3000';

async function fetchUserId(token){
    const path = `${API_BASE_URL}/tokens/getid`;
    const formData = { 
        token: token
    };
    try {
        const res = await fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

        if (res.ok) {
            const data = await res.json(); // Corrigido para obter os dados corretamente
            return data;
        } else {
            throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

export { fetchUserId };