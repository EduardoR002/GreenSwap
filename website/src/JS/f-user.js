//{products.map((product, index) => (CODE HERE))}
async function getProducts() {
    const formData = {
        search_name: " ",
        max_price: 0,
        min_price: 0
    };

    console.log('Sending request with data:', formData);

    try {
        const res = await fetch('http://localhost:3000/product/getall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) { // Check if response status is in the range 200-299
            const flattenedProducts = Object.values(data.products[0]);
            setProducts(flattenedProducts);
        } else {
            console.error('Failed to fetch products:', res.status, res.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export default getProducts
