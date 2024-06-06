const API_BASE_URL = 'http://localhost:3000';

async function createDirectPurchase(buydate, quantity, price, idproduct, idUser){
    const directPurchasePath = `${API_BASE_URL}/purchase/createDirectPurchase`;
    const formData = {
        buydate: buydate,
        quantity: quantity,
        price: price,
        idproduct: idproduct,
        idUser: idUser
    }
    try {
        const res = await fetch(directPurchasePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Fetched product data:', data); // Adicione este log para verificar os dados recebidos
            return true;
        } else {
            throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

async function getUserPurchases(userId) {
    const userPurchasesPath = `${API_BASE_URL}/purchase/getUserPurchase`;
    const formData = {
      userId: userId
    };
    try {
      const res = await fetch(userPurchasesPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Fetched user purchases:', data);
        // Convert object with numeric keys to array
        return Object.values(data);
      } else {
        throw new Error(`Failed to fetch user purchases: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

export  {createDirectPurchase, getUserPurchases}