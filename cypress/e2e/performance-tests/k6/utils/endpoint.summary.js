import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
    return {
        'cypress/e2e/performance-tests/k6/reports/k6-endpoint-summary.html': htmlReport(data),
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        'cypress/e2e/performance-tests/k6/reports/k6-endpoint-summary.json': JSON.stringify(data),
    }
}