import { Router } from "express";
import { GenreController } from "../controllers/genre.controller";

const router = Router();
const genreController = new GenreController();

router.get('/', (req, res) =>
  genreController.findAllGenres(req, res),
);

export default router;