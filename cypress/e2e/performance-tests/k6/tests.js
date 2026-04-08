import { sleep } from 'k6';
import { createOrder } from './scripts.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js'

export const options = {
    //vus: 1,          // virtual users
    //duration: '10s',  // test duration
    //iterations: 1,        // number of iterations per virtual user

    stages: [
        { duration: '5s', target: 10 }, // ramp up to 10 users over 1 minute
        { duration: '20s', target: 10 }, // stay at 10 users for 3 minutes
        { duration: '10s', target: 0 },  // ramp down to 0 users over 1 minute
    ],
    thresholds: {
        'http_req_duration': ['p(95)<1000'], // 95% of requests should be below 1000ms
        'http_req_failed': ['rate<0.01'], // less than 1% of requests should fail
    },
};

export default function () {
    createOrder();
    sleep(1);
}

export function handleSummary(data) {
  return {
    'k6-summary.html': htmlReport(data),
  }
}