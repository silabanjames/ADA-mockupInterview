// src/test/app.test.ts
import express from 'express';
import {
  findAllSavedMoviesBasedCountryAndUser,
  createSavedMovie,
  removeSavedMovie,
} from './controllers/savedMovieController';
import { resetMockDb } from './mockDb';

const app = express();
app.use(express.json());

// x-api-key middleware (same behaviour as your real app)
app.use((req, res, next) => {
  const key = req.header('x-api-key');
  const expected = process.env.TOKEN_SECRET || 'test-secret';
  if (!key || key !== expected)
    return res.status(403).json({ message: 'Unauthorized.' });
  next();
});

// routes (mirror your real routes)
app.get('/api/savedmovie', findAllSavedMoviesBasedCountryAndUser);
app.post('/api/savedmovie', createSavedMovie);
app.delete('/api/savedmovie', removeSavedMovie);

// export reset helper for tests
export { resetMockDb };
export default app;
