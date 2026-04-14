import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://simple-grocery-store-api.click';

export function createOrder(cartId, accessToken) {
    const url = `${baseUrl}/orders`;
    const payload = JSON.stringify({
        "cartId": cartId,
        "customerName": "Christian",
    });
    const params = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        tags: { name: 'Create order',
            vu: `${__VU}`,
            iterations: `${__ITER}`
         }
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Create order status is 201': (r) => r.status === 201,
    });
}