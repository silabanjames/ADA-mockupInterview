import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { verifyToken } from "../helpers/utility/verifyToken";

const router = Router();
const movieController = new MovieController();

router.get('/', verifyToken, (req, res) =>
  movieController.findAllMoviesBasedCountryAndGenre(req, res),
);

export default router;