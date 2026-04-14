import { getProductID } from "../endpoints/products.js";
import { createAPIClient } from "../endpoints/api-clients.js";
import { createCart, addItemToCart } from "../endpoints/carts.js";
import { createOrder } from "../endpoints/orders.js";

export function createOrderFlow() {
    const accessToken = createAPIClient();
        if (!accessToken) {
        console.error(`VU: ${__VU} - Iteration ${__ITER}: Failed to create API client`);
        return;
    }

    const cartId = createCart();
    if (!cartId) {
        console.error(`VU: ${__VU} - Iteration: ${__ITER}: Failed to create cart`);
        return;
    }

    addItemToCart(cartId, getProductID);
    createOrder(cartId, accessToken);
}
