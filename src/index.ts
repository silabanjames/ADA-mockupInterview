import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import genreRoute from './routes/genre.route';
import movieRoute from './routes/movie.route';
import savedMovieRoute from './routes/savedMovie.route';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const app = express();

app.use(cors());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, Prisma with Express!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/genre', genreRoute);
app.use('/api/movie', movieRoute);
app.use('/api/savedmovie', savedMovieRoute);
