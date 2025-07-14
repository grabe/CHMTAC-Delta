import { vi } from 'vitest';

const redisClient = {
  exists: vi.fn((key) => {
    if (key === 'Report:1') return true; // Simulate key exists for ID 1
    return false; // Simulate key does not exist for other IDs
  }),
  get: vi.fn((key) => {
    if (key === 'Report:1') {
      return JSON.stringify({
        id: 1,
        title: 'Mock Report',
        description: 'This is a mock report.',
        filereferences: [],
      });
    }
    return null; // Simulate no report found for other keys
  }),
  set: vi.fn(),
  del: vi.fn(),
};

export default redisClient;