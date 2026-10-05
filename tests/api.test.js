const request = require('supertest');
const app = require('../src/app');

test('GET /PAN returns full route', async () => {
  const res = await request(app).get('/PAN');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    destination: 'PAN',
    path: ['USA', 'MEX', 'GTM', 'HND', 'NIC', 'CRI', 'PAN'],
  });
});

test('lowercase input works', async () => {
  const res = await request(app).get('/blz');
  expect(res.body.path).toEqual(['USA', 'MEX', 'BLZ']);
});

test('unsupported country returns 404', async () => {
  const res = await request(app).get('/FRA');
  expect(res.status).toBe(404);
});

test('invalid input also returns 404', async () => {
  const res = await request(app).get('/ab');
  expect(res.status).toBe(404);
});