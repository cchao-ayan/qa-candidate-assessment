
function randomEmail() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
}

export function getAccessToken() {
  const response = http.post('https://simple-grocery-store-api.click/api-clients', JSON.stringify({
    "clientName": "Christian",
    "clientEmail": randomEmail()
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  });
  //console.log('getAccessToken response: ', response.body);
  return response.json().accessToken;
}

export function getProductID() {
  const response = http.get('https://simple-grocery-store-api.click/products');
  //console.log('product IDs:', response.json()[0].id);
  return response.json()[0].id;
}

export function createCart() {
  const response = http.post('https://simple-grocery-store-api.click/carts', null, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  //console.log('Cart ID:', response.json().cartId);
  return response.json().cartId;
}

export function addItemToCart(cartId) {
  const productId = getProductID();
  console.log('productID type:', typeof productId);
  console.log(`https://simple-grocery-store-api.click/carts/${cartId}/items`);
  const response = http.post(`https://simple-grocery-store-api.click/carts/${cartId}/items`, JSON.stringify({
    "productId": productId
  }), {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.json().itemId;
}

export function createOrder() {
  // create token
  const accessToken = getAccessToken();
  console.log('Access Token:', accessToken);
  //create cart ID
  const cartId = createCart();
  console.log('Cart ID:', cartId);
  //add to cart using the product ID selected
  const itemId = addItemToCart(cartId);
  console.log('Item ID:', itemId);

  const response = http.post(`https://simple-grocery-store-api.click/orders`, JSON.stringify({
    "cartId": cartId,
    "customerName": "Christian",
  }), {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  });

  console.log('create order response: ', response.body);

  check(response, {
    'status is 201': (r) => r.status === 201,
  });
}