require('./setup');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

const adminData = { name: 'Admin', email: 'admin@test.com', password: 'password123' };
const sampleRoom = {
  name: 'Test Cottage',
  description: 'A cozy test cottage',
  pricePerNight: 1500,
  maxGuests: 2,
  totalRooms: 2,
};

const registerAsAdmin = async () => {
  const User = require('../models/User');
  await request(app).post('/api/auth/register').send(adminData);
  await User.findOneAndUpdate({ email: adminData.email }, { role: 'admin' });
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: adminData.email, password: adminData.password });
  return loginRes.body.data.token;
};

describe('Room API', () => {
  it('lists rooms publicly with no auth required', async () => {
    const res = await request(app).get('/api/rooms');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('blocks room creation for guests', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Guest',
      email: 'guest2@test.com',
      password: 'password123',
    });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'guest2@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`)
      .send(sampleRoom);

    expect(res.statusCode).toBe(403);
  });

  it('allows an admin to create, update and delete a room', async () => {
    const token = await registerAsAdmin();

    const createRes = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleRoom);
    expect(createRes.statusCode).toBe(201);
    const roomId = createRes.body.data._id;

    const updateRes = await request(app)
      .put(`/api/rooms/${roomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ pricePerNight: 1800 });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.data.pricePerNight).toBe(1800);

    const deleteRes = await request(app)
      .delete(`/api/rooms/${roomId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteRes.statusCode).toBe(200);
  });
});
