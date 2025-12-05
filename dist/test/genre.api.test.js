"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyHeader = void 0;
require("dotenv/config");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
exports.apiKeyHeader = {
    'x-api-key': process.env.TOKEN_SECRET || 'test-secret',
};
describe('GET /api/genre', () => {
    it('should return a paged list of genres', async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get('/api/genre?page=1&page_size=10')
            .set(exports.apiKeyHeader)
            .expect(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(10);
        expect(response.body).toHaveProperty('page', 1);
        expect(response.body).toHaveProperty('page_size', 10);
    });
    it('should require x-api-key header', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/api/genre').expect(403);
        expect(response.body.message).toBe('Unauthorized.');
    });
});
