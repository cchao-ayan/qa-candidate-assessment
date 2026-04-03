import http, { get } from 'k6/http';
import { check, sleep } from 'k6';
import { createOrder } from './scripts.js';

export const options = {
    //vus: 1,          // virtual users
    //duration: '10s',  // test duration
    //iterations: 1,        // number of iterations per virtual user

    stages: [
        { duration: '1m', target: 10 }, // ramp up to 10 users over 1 minute
        { duration: '3m', target: 10 }, // stay at 10 users for 3 minutes
        { duration: '1m', target: 0 },  // ramp down to 0 users over 1 minute
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
        'http_req_failed': ['rate<0.01'], // less than 1% of requests should fail
    },
};

export default function () {
    createOrder();
    sleep(1);
}