import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';

export const apiKeyHeader = {
  'x-api-key': process.env.TOKEN_SECRET || 'test-secret',
};

describe('GET /api/genre', () => {
  it('should return a paged list of genres', async () => {

    const response = await request(app)
      .get('/api/genre?page=1&page_size=10')
      .set(apiKeyHeader)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(10);

    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('page_size', 10);
  });

  it('should require x-api-key header', async () => {
    const response = await request(app).get('/api/genre').expect(403);

    expect(response.body.message).toBe('Unauthorized.');
  });
});
