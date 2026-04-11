import http, { get } from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://simple-grocery-store-api.click';

function randomEmail() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
}

export function getAccessToken() {
  const response = http.post(`${baseUrl}/api-clients`, JSON.stringify({
    "clientName": "Christian",
    "clientEmail": randomEmail()
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  },
    {
      tags: { name: 'Create API client' }
    });

  check(response, {
    'Create API client status is 201': (r) => r.status === 201,
  });
  return response.json().accessToken;
}

export function getProductID() {
  const response = http.get(`${baseUrl}/products`);
  return response.json()[0].id;
}

export function createCart() {
  const response = http.post(`${baseUrl}/carts`, null, {
    headers: {
      "Content-Type": "application/json"
    },
    tags: { name: 'Create cart' }
  });
  check(response, {
    'Create cart status is 201': (r) => r.status === 201,
  });
  return response.json().cartId;
}

export function addItemToCart(cartId) {
  const productId = getProductID();
  const response = http.post(`${baseUrl}/carts/${cartId}/items`, JSON.stringify({
    "productId": productId
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  },
    {
      tags: { name: 'Add item to cart' }
    });
  check(response, {
    'Add item to cart status is 201': (r) => r.status === 201,
  });
  return response.json().itemId;
}

export function createOrder() {
  // create token
  const accessToken = getAccessToken();
  //create cart ID
  const cartId = createCart();
  //add to cart using the product ID selected
  const itemId = addItemToCart(cartId);

  const response = http.post(`${baseUrl}/orders`, JSON.stringify({
    "cartId": cartId,
    "customerName": "Christian",
  }), {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  },
    {
      tags: { name: 'Create order' }
    });

  check(response, {
    'Create order status is 201': (r) => r.status === 201,
  });
}