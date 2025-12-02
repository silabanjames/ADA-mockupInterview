import { Router } from 'express';
import { SavedMovieController } from '../controllers/savedMovie.controller';
import { verifyToken } from '../helpers/utility/verifyToken';

const router = Router();
const savedMovieController = new SavedMovieController();

router.get('/', verifyToken, (req, res) =>
  savedMovieController.findAllSavedMoviesBasedCountryAndUser(req, res),
);

router.post('/', verifyToken, (req, res) =>
  savedMovieController.createSavedMovie(req, res),
);

router.delete('/', verifyToken, (req, res) =>
  savedMovieController.removeSavedMovie(req, res),
);

export default router;
