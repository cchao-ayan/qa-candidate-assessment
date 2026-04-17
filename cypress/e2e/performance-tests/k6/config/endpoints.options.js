export const options = {
  scenarios: {
    create_cart: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '5s',
      duration: '30s',
      preAllocatedVUs: 20,
      exec: 'createCart'
    },

    create_user: {
      executor: 'constant-arrival-rate',
      rate: 5,
      timeUnit: '5s',
      duration: '30s',
      preAllocatedVUs: 20,
      exec: 'createAPIClient'
    },
  },

  thresholds: {
    'http_req_duration{scenario:create_cart}': ['p(95)<1000'],
    'http_req_duration{scenario:create_user}': ['p(95)<1000']
  },
};