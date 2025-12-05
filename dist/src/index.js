"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const genre_route_1 = __importDefault(require("./routes/genre.route"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const savedMovie_route_1 = __importDefault(require("./routes/savedMovie.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Parse JSON and url-encoded query
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '..', 'openapi.yaml'));
// Serve Swagger UI di /api-docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', (_, res) => {
    res.send('Hello, Prisma with Express!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is running on port ${PORT}`);
});
app.use('/api/genre', genre_route_1.default);
app.use('/api/movie', movie_route_1.default);
app.use('/api/savedmovie', savedMovie_route_1.default);
exports.default = app;
