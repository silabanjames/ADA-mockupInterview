// tests/savedMovie.api.test.ts
import request from 'supertest';
import app, { resetMockDb } from '../src/test/app';

const apiKeyHeader = { 'x-api-key': process.env.TOKEN_SECRET || 'test-secret' };

beforeEach(() => {
  resetMockDb();
});

describe('SavedMovie APIs (test app, in-memory mock DB)', () => {
  test('GET /api/savedmovie returns saved movies (200)', async () => {
    const res = await request(app)
      .get('/api/savedmovie?country=US&user_id=u1&page=1&page_size=10')
      .set(apiKeyHeader)
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('page_size', 10);
    expect(res.body.data.map((m: any) => m.id)).toContain('m-us-1');
  });

  test('POST /api/savedmovie success returns 201 and persists in mock DB', async () => {
    await request(app)
      .post('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
      .expect(201);

    const list = await request(app)
      .get('/api/savedmovie?country=ID&user_id=u1&page=1&page_size=10')
      .set(apiKeyHeader)
      .expect(200);

    expect(list.body.data.map((m: any) => m.id)).toContain('m-id-1');
  });

  test('POST duplicate returns 409', async () => {
    // save once
    await request(app)
      .post('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
      .expect(201);
    // save again -> 409
    const res = await request(app)
      .post('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
      .expect(409);
    expect(res.body.error.code).toBe('409 DUPLICATE_SAVE');
  });

  test('POST unavailable returns 422', async () => {
    await request(app)
      .post('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ country: 'US', user_id: 'u1', movie_id: 'm-id-1' })
      .expect(422);
  });

  test('DELETE success -> 204 and actually removed', async () => {
    // seeded m-us-1 saved for u1
    await request(app)
      .delete('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ user_id: 'u1', movie_id: 'm-us-1' })
      .expect(204);
    const res = await request(app)
      .get('/api/savedmovie?country=US&user_id=u1&page=1&page_size=10')
      .set(apiKeyHeader)
      .expect(200);
    expect(res.body.data.map((m: any) => m.id)).not.toContain('m-us-1');
  });

  test('DELETE not-saved -> 404', async () => {
    const res = await request(app)
      .delete('/api/savedmovie')
      .set(apiKeyHeader)
      .send({ user_id: 'u1', movie_id: 'nope' })
      .expect(404);
    expect(res.body).toHaveProperty('code', 'NOT_SAVED');
  });

  test('403 when x-api-key missing', async () => {
    await request(app).get('/api/savedmovie').expect(403);
    await request(app).post('/api/savedmovie').send({}).expect(403);
    await request(app).delete('/api/savedmovie').send({}).expect(403);
  });
});
