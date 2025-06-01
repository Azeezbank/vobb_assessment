// test login route with jest unit testing
import request from 'supertest';
import app from '../index';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose'


dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST!); // Use test DB
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/login', () => {

  it('should login successfully with valid credentials', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create test user
    const user = await User.create({ name: 'Test', email: 'test@example.com', password: hashedPassword });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login Successful');
    expect(res.headers['set-cookie']).toBeDefined(); // cookie should be set
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should return 401 for invalid password', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name: 'Test', email: 'test@example.com', password: hashedPassword });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should handle server errors', async () => {
    // Mock User.findOne to throw error
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Server error');

    // Restore original implementation
    (User.findOne as jest.Mock).mockRestore();
  });
});