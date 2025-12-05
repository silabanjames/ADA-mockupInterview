"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = require("../controllers/genre.controller");
const verifyToken_1 = require("../helpers/utility/verifyToken");
const router = (0, express_1.Router)();
const genreController = new genre_controller_1.GenreController();
router.get('/', verifyToken_1.verifyToken, (req, res) => genreController.findAllGenres(req, res));
exports.default = router;
