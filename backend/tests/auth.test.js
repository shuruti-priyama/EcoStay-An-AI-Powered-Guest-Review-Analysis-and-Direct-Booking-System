require('./setup');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  const guest = {
    name: 'Test Guest',
    email: 'testguest@example.com',
    password: 'password123',
  };

  it('registers a new guest successfully', async () => {
    const res = await request(app).post('/api/auth/register').send(guest);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.role).toBe('guest');
    expect(res.body.data.token).toBeDefined();
  });

  it('rejects duplicate email registration', async () => {
    await request(app).post('/api/auth/register').send(guest);
    const res = await request(app).post('/api/auth/register').send(guest);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('logs in with correct credentials', async () => {
    await request(app).post('/api/auth/register').send(guest);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: guest.email, password: guest.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it('rejects login with wrong password', async () => {
    await request(app).post('/api/auth/register').send(guest);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: guest.email, password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
  });

  it('blocks access to /me without a token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });
});
