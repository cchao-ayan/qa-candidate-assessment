import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://simple-grocery-store-api.click';

export function getProductID() {
    const url = `${baseUrl}/products`;
    const param = {
        tags: { name: 'Get products',
            // vu: `${__VU}`,
            // iterations: `${__ITER}`
         }
    };

    const response = http.get(url, param);
    check(response, {
        'products status is 200': (r) => r.status === 200
    });

    return getRandomProductID(response.json());
}

const getRandomProductID = (response) => {
    const ids = response.map(p => p.id); // Extract product IDs from the response
    do {
        const randomId = ids[Math.floor(Math.random() * ids.length)]; // Select a random product ID - indexes instead of IDs
        const product = response.find(p => p.id === randomId); // Find the product with the selected ID
        const inStock = product.inStock; // Get the in-stock status of the selected product
        if (inStock === true) {
            return randomId; // Return the random product ID if it's in stock
        }
    } while (true);
}