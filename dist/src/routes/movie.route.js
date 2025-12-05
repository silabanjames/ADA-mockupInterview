"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const verifyToken_1 = require("../helpers/utility/verifyToken");
const router = (0, express_1.Router)();
const movieController = new movie_controller_1.MovieController();
router.get('/', verifyToken_1.verifyToken, (req, res) => movieController.findAllMoviesBasedCountryAndGenre(req, res));
exports.default = router;
