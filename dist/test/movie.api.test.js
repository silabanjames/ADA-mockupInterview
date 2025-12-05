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
describe('GET /api/movie (API-only)', () => {
    it('returns 200 and paged list when x-api-key present', async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get('/api/movie?country=US&page=1&page_size=10')
            .set(exports.apiKeyHeader)
            .expect(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body).toHaveProperty('page', 1);
        expect(response.body).toHaveProperty('page_size', 10);
    });
    it('returns 403 when x-api-key missing or wrong', async () => {
        await (0, supertest_1.default)(index_1.default)
            .get('/api/movie?country=US')
            .expect(403)
            .then(res => {
            expect(res.body).toHaveProperty('message', 'Unauthorized.');
        });
        await (0, supertest_1.default)(index_1.default)
            .get('/api/movie?country=US')
            .set('x-api-key', 'wrong-key')
            .expect(401);
    });
});
