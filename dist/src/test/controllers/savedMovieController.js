"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSavedMoviesBasedCountryAndUser = findAllSavedMoviesBasedCountryAndUser;
exports.createSavedMovie = createSavedMovie;
exports.removeSavedMovie = removeSavedMovie;
const repositories_1 = require("../repositories");
async function findAllSavedMoviesBasedCountryAndUser(req, res) {
    const { country, user_id } = req.query;
    const page = Number(req.query.page || 1);
    const page_size = Number(req.query.page_size || 20);
    try {
        const { data, total } = await repositories_1.savedRepo.findAllPagedBasedCountryAndUser(page, page_size, String(country), String(user_id));
        return res.json({ data, page, page_size, total });
    }
    catch (err) {
        return res
            .status(500)
            .json({ code: 'INTERNAL_ERROR', message: String(err?.message || err) });
    }
}
async function createSavedMovie(req, res) {
    const { country, user_id, movie_id } = req.body;
    try {
        const movie = await repositories_1.savedRepo.saveMovieForUser(country, user_id, movie_id);
        return res.status(201).json({ data: movie });
    }
    catch (err) {
        if (err.name === 'DuplicateSaveError')
            return res
                .status(409)
                .json({ error: { code: '409 DUPLICATE_SAVE', message: err.message } });
        if (err.name === 'UnavailableInCountryError')
            return res.status(422).json({
                error: { code: 'UNAVAILABLE_IN_COUNTRY', message: err.message },
            });
        if (err.name === 'NotFoundError')
            return res
                .status(404)
                .json({ error: { code: 'NOT_FOUND', message: err.message } });
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: String(err?.message || err) },
        });
    }
}
async function removeSavedMovie(req, res) {
    const { user_id, movie_id } = req.body;
    try {
        await repositories_1.savedRepo.removeSavedMovie(user_id, movie_id);
        return res.status(204).send();
    }
    catch (err) {
        if (err.name === 'NotFoundError')
            return res.status(404).json({ code: 'NOT_SAVED', message: err.message });
        return res
            .status(500)
            .json({ code: 'INTERNAL_ERROR', message: String(err?.message || err) });
    }
}
