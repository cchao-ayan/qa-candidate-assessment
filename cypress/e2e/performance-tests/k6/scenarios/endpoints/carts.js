import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = 'https://simple-grocery-store-api.click';

export function createCart() {
    const url = `${baseUrl}/carts`;
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
        tags: { name: 'Create cart',
            vu: `${__VU}`,
            iterations: `${__ITER}` }
    };

    const response = http.post(url, null, params);

    check(response, {
        'Create cart status is 201': (r) => r.status === 201,
    });
    sleep(1);
    return response.json().cartId;
}

export function addItemToCart(cartId, productIdCallback) {
    const productId = productIdCallback();
    const response = http.post(`${baseUrl}/carts/${cartId}/items`, JSON.stringify({
        "productId": productId
    }), {
        headers: {
            "Content-Type": "application/json"
        },
        tags: { name: 'Add item to cart',
            vu: `${__VU}`,
            iterations: `${__ITER}`
         }
    });
    check(response, {
        'Add item to cart status is 201': (r) => r.status === 201,
    });
    sleep(1);
    return response.json().itemId;
}