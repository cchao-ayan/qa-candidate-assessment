import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://simple-grocery-store-api.click';

function randomEmail() {
    return `user_${Date.now()}@example.com`;
}

export function createAPIClient() {
    const url = `${baseUrl}/api-clients`;
    const payload = JSON.stringify({
        "clientName": "Christian",
        "clientEmail": randomEmail()
    });
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
        tags: { name: 'Create API client',
            vu: `${__VU}`,
            iterations: `${__ITER}`
         }
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Create API client status is 201': (r) => r.status === 201,
    });

    return response.json().accessToken;
}