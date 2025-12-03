import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';

export const apiKeyHeader = {
  'x-api-key': process.env.TOKEN_SECRET || 'test-secret',
};

describe('GET /api/movie (API-only)', () => {
  it('returns 200 and paged list when x-api-key present', async () => {
    const response = await request(app)
      .get('/api/movie?country=US&page=1&page_size=10')
      .set(apiKeyHeader)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('page_size', 10);
  });

  it('returns 403 when x-api-key missing or wrong', async () => {
    await request(app)
      .get('/api/movie?country=US')
      .expect(403)
      .then(res => {
        expect(res.body).toHaveProperty('message', 'Unauthorized.');
      });

    await request(app)
      .get('/api/movie?country=US')
      .set('x-api-key', 'wrong-key')
      .expect(401);
  });
});