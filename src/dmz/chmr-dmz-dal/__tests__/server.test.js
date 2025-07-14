import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../server/server.js';

// Mock the Redis client
vi.mock('../server/redisClient.js', async () => {
  return await import('../server/__mocks__/redisClient.js');
});

describe('Server Regression Tests', () => {
  it('should respond to the root route with 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });

  it('should respond to an unknown route with 404', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});