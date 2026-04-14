import { sleep } from 'k6';
import { options } from '../config/workflow.options.js';
import { handleSummary } from '../utils/summary.js';
import { createOrderFlow } from '../scenarios/workflow/createOrder.js';

export { options, handleSummary }

export default function () {
    createOrderFlow();
}

