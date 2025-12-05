"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMockDb = resetMockDb;
exports.getMovies = getMovies;
exports.getAvailabilities = getAvailabilities;
exports.getSaved = getSaved;
exports.addSaved = addSaved;
exports.removeSaved = removeSaved;
let movies = [];
let availabilities = [];
let saved = [];
function resetMockDb() {
    movies = [
        { id: 'm-us-1', title: 'US Movie 1', year: 2020 },
        { id: 'm-us-2', title: 'US Movie 2', year: 2019 },
        { id: 'm-id-1', title: 'ID Movie 1', year: 2021 },
        { id: 'm-global', title: 'Global Movie', year: 2022 },
    ];
    availabilities = [
        { movieId: 'm-us-1', countryCode: 'US' },
        { movieId: 'm-us-2', countryCode: 'US' },
        { movieId: 'm-id-1', countryCode: 'ID' },
        { movieId: 'm-global', countryCode: 'US' },
        { movieId: 'm-global', countryCode: 'ID' },
    ];
    saved = [
        {
            userId: 'u1',
            movieId: 'm-us-1',
            dateAdded: new Date('2023-01-01T00:00:00Z'),
        },
    ];
}
function getMovies() {
    return movies;
}
function getAvailabilities() {
    return availabilities;
}
function getSaved() {
    return saved;
}
function addSaved(userId, movieId, date) {
    saved.push({ userId, movieId, dateAdded: date ?? new Date() });
}
function removeSaved(userId, movieId) {
    const idx = saved.findIndex((s) => s.userId === userId && s.movieId === movieId);
    if (idx !== -1)
        saved.splice(idx, 1);
}
// init
resetMockDb();
