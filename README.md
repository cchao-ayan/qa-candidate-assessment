# QA Candidate Assessment

## Running Tests Locally

This project contains three types of automated tests:
- **Cypress** (UI tests)
- **k6** (Performance tests)
- **Postman/Newman** (API tests)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [k6](https://k6.io/docs/getting-started/installation/) (for performance tests)

### 1. Install Dependencies

```
npm ci
```

### 2. Run Cypress Tests

- **Headless mode:**
  ```
  npm run cy:run
  ```
- **Open Cypress Test Runner:**
  ```
  npm run cy:open
  ```

### 3. Run k6 Performance Tests

```
npm run k6:run
```

> Ensure you have k6 installed globally or available in your PATH.

### 4. Run Postman API Tests (with Newman)

```
npm run postman:run
```

---

## Test Locations
- **Cypress UI tests:** `cypress/ui-tests/`
- **k6 performance tests:** `cypress/performance-tests/`
- **Postman collection:** `cypress/e2e/api-tests/postman_collection.json`

## Notes
- All test scripts are defined in `package.json` under the `scripts` section.
- For more options, refer to the documentation for [Cypress](https://docs.cypress.io/), [k6](https://k6.io/docs/), and [Newman](https://www.npmjs.com/package/newman).
