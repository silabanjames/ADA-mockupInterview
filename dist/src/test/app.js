"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMockDb = void 0;
// src/test/app.test.ts
const express_1 = __importDefault(require("express"));
const savedMovieController_1 = require("./controllers/savedMovieController");
const mockDb_1 = require("./mockDb");
Object.defineProperty(exports, "resetMockDb", { enumerable: true, get: function () { return mockDb_1.resetMockDb; } });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// x-api-key middleware (same behaviour as your real app)
app.use((req, res, next) => {
    const key = req.header('x-api-key');
    const expected = process.env.TOKEN_SECRET || 'test-secret';
    if (!key || key !== expected)
        return res.status(403).json({ message: 'Unauthorized.' });
    next();
});
// routes (mirror your real routes)
app.get('/api/savedmovie', savedMovieController_1.findAllSavedMoviesBasedCountryAndUser);
app.post('/api/savedmovie', savedMovieController_1.createSavedMovie);
app.delete('/api/savedmovie', savedMovieController_1.removeSavedMovie);
exports.default = app;
