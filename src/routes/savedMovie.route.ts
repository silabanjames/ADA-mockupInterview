import { Router } from "express";
import { SavedMovieController } from "../controllers/savedMovie.controller";

const router = Router();
const savedMovieController = new SavedMovieController();

router.get('/', (req, res) =>
  savedMovieController.findAllSavedMoviesBasedCountryAndUser(req, res),
);

router.post('/', (req, res) =>
  savedMovieController.createSavedMovie(req, res),
);

router.delete('/', (req, res) =>
  savedMovieController.removeSavedMovie(req, res),
);

export default router;