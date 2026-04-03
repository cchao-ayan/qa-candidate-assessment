import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // virtual users
  duration: '10s',  // test duration
};

export function login() {
  const response = http.post('https://simple-grocery-store-api.click/api-clients', JSON.stringify({
    "username": "test_user",
    "password": "test_password"
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.json().accessToken;
}

export function getProducts() {
  const response = http.get('https://simple-grocery-store-api.click/products');
  return response.json().products[0].id;
}

export function createCart() {
  const response = http.post('https://simple-grocery-store-api.click/carts', null, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.json().cartId;
}

export function addItemToCart() {
  const cartId = createCart();
  const response = http.post(`https://simple-grocery-store-api.click/carts/${cartId}/items`, JSON.stringify({
    "productId": getProducts()
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.json().itemId;
}

export function createOrder() {
  const accessToken = login();
  const cartId = createCart();
  addItemToCart();
  const url = 'https://simple-grocery-store-api.click/orders';

  const payload = JSON.stringify({
    "cartId": cartId,
    "customerName": "Ella Nikolaus"
  });

  const params = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 201': (r) => r.status === 201,
  });
}

export default function () {
  createOrder();
  sleep(1);
}