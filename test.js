import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

export default function () {
  const url = 'https://0opuhux1ri.execute-api.us-east-1.amazonaws.com/dev/placeOrder';
  const payload = JSON.stringify({
    user: 'user' + Math.floor(Math.random() * (101 - 1) + 1),
    shop: 'shop' + Math.floor(Math.random() * (11 - 1) + 1),
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200
  });
}
