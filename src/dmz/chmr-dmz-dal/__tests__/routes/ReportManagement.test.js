import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../../server/server.js';
import redisClient from '../../server/redisClient.js';

vi.mock('../../server/redisClient.js'); // Mock Redis client

describe('Report Management API Tests', () => {
  beforeEach(() => {
    // Reset mock calls before each test
    redisClient.exists.mockClear();
    redisClient.get.mockClear();
  });

  it('should return a specific report by ID', async () => {
    const response = await request(app).get('/report/management/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title', 'Mock Report');
  });

  it('should return 404 for a non-existent report ID', async () => {
    const response = await request(app).get('/report/management/9999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Report not found' });
  });
});