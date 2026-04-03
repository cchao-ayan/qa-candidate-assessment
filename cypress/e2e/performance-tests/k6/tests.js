import http, { get } from 'k6/http';
import { check, sleep } from 'k6';
import { createOrder } from './scripts.js';

export const options = {
  vus: 1,          // virtual users
  //duration: '10s',  // test duration
  iterations: 1        // number of iterations per virtual user
};

export default function () {
  createOrder();
  sleep(1);
}