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

async function fetchUser(userId) {
    const userPath = `${API_BASE_URL}/users/getuser/${userId}`;
    try {
      const res = await fetch(userPath, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched user data:', data);
        return data.user;
      } else {
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
}

async function editUser(userId, updatedUserData) {
    const userPath = `${API_BASE_URL}/users/edituser/${userId}`;
    try {
      const res = await fetch(userPath, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      const data = await res.json();
      if (res.ok) {
        return data.user;
      } else {
        throw new Error(`Failed to update user: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
export { fetchUserId, fetchUser, editUser};