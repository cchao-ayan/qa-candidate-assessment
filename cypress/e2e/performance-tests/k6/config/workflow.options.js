export const options = {
  scenarios: {
    order_flow: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s'
    }
  },

  thresholds: {
    'http_req_duration': ['p(95)<1000']
  },
};