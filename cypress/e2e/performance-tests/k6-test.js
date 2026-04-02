import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // virtual users
  duration: '10s',  // test duration
};

export default function () {
  const url = 'https://simple-grocery-store-api.click/orders';

  const payload = JSON.stringify({
    "cartId": "oFd2hATO1zDQPsEy0kZxX",
    "customerName": "Ella Nikolaus"
  });

  const params = {
    headers: {
        "Authorization": "Bearer 69df154bea6db63fe073522ff55c3c2b0e0528c47ba2fe3b5792e22c4ba2f9c1",
        "Content-Type": "application/json"
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}