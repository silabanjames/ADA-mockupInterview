import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

const router = Router();
const movieController = new MovieController();

router.get('/', (req, res) =>
  movieController.findAllMoviesBasedCountryAndGenre(req, res),
);

export default router;