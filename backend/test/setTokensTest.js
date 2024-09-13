import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5000,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    idToken: "your-id-token",
    accessToken: "your-access-token",
    refreshToken: "your-refresh-token"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post('http://localhost:4396/api/user/setTokens', payload, params);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}
