/**
 * Manual API smoke test — run while the server is already listening.
 * Usage: API_BASE=http://localhost:5001/api node src/scripts/smoke-api.js
 */
const base = process.env.API_BASE || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const { headers: extraHeaders = {}, ...rest } = options;
  const response = await fetch(`${base}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

async function run() {
  const results = [];

  function record(name, passed, detail = '') {
    results.push({ name, passed, detail });
    const mark = passed ? 'PASS' : 'FAIL';
    console.log(`${mark} ${name}${detail ? ` — ${detail}` : ''}`);
  }

  const health = await request('/health');
  record('GET /health', health.ok && health.data.status === 'ok');

  const list = await request('/products');
  record('GET /products', list.ok && Array.isArray(list.data.products));

  const badLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: '', password: '' }),
  });
  record('POST /auth/login validation', badLogin.status === 400);

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'demo.student@campusmart.test',
      password: 'demo123',
    }),
  });
  record('POST /auth/login demo', login.ok && Boolean(login.data.token));

  if (!login.ok) {
    console.log('\nDemo user missing? Run: npm run seed');
    process.exit(1);
  }

  const token = login.data.token;
  const authHeader = { Authorization: `Bearer ${token}` };

  const create = await request('/products', {
    method: 'POST',
    headers: authHeader,
    body: JSON.stringify({
      title: 'Smoke Test Item',
      description: 'Created by smoke-api.js',
      price: 10,
      category: 'Misc',
    }),
  });
  record(
    'POST /products',
    create.ok && Boolean(create.data.product?._id),
    create.ok ? '' : create.data.message || `status ${create.status}`
  );

  const productId = create.data.product?._id;
  if (productId) {
    const del = await request(`/products/${productId}`, {
      method: 'DELETE',
      headers: authHeader,
    });
    record('DELETE /products/:id', del.ok);
  }

  const noAuth = await request('/products', { method: 'POST', body: '{}' });
  record('POST /products without token → 401', noAuth.status === 401);

  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Smoke test error:', err.message);
  console.error('Is the server running? Set API_BASE if not on port 5000.');
  process.exit(1);
});
