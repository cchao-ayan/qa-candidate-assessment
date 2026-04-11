import { sleep } from 'k6';
import { createOrder } from './scripts.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export const options = {
    scenarios: {
        'create-order-per-vu-iteration': {
            executor: 'per-vu-iterations',
            vus: 5,
            iterations: 10
        },
        'create-order-constant-vus': {
            executor: 'constant-vus',
            vus: 10,
            duration: '30s'
        },
        'create-order-ramping-vus': {
            executor: 'ramping-vus',
            stages: [
                { duration: '5s', target: 10 },
                { duration: '20s', target: 20 },
                { duration: '10s', target: 0 }
            ]
        },
        // 'create-order-arrival-rate': {
        //     executor: 'constant-arrival-rate',
        //     rate: 5,
        //     timeUnit: '5s',
        //     duration: '30s',
        //     preAllocatedVUs: 20,
        //     maxVUs: 50
        //  },
        // 'create-order-ramping-arrival-rate': {
        //     executor: 'ramping-arrival-rate',
        //     startRate: 1,
        //     timeUnit: '5s',
        //     stages: [
        //         { duration: '10s', target: 10 },
        //         { duration: '30s', target: 20 },
        //         { duration: '10s', target: 0 }
        //     ],
        //     preAllocatedVUs: 20,
        //     maxVUs: 50
        // }
    },
    thresholds: {
        'http_req_duration': ['p(95)<1000'], // 95% of requests should be below 1000ms
        'http_req_failed': ['rate<0.02'], // less than 2% of requests should fail
    }

};

export default function () {
    createOrder();
    sleep(1);
}

export function handleSummary(data) {
    return {
        'cypress/e2e/performance-tests/k6/k6-summary.html': htmlReport(data),
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        'cypress/e2e/performance-tests/k6/summary.json': JSON.stringify(data),
    }
}