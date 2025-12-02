import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import genreRoute from './routes/genre.route';
import movieRoute from './routes/movie.route';
import savedMovieRoute from './routes/savedMovie.route';

const app = express();

app.use(cors());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));
// Serve Swagger UI di /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
