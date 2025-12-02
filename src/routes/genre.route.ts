import { Router } from 'express';
import { GenreController } from '../controllers/genre.controller';
import { verifyToken } from '../helpers/utility/verifyToken';

const router = Router();
const genreController = new GenreController();

router.get('/', verifyToken, (req, res) =>
  genreController.findAllGenres(req, res),
);

export default router;
