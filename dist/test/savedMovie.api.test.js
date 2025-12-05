"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/savedMovie.api.test.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importStar(require("../src/test/app"));
const apiKeyHeader = { 'x-api-key': process.env.TOKEN_SECRET || 'test-secret' };
beforeEach(() => {
    (0, app_1.resetMockDb)();
});
describe('SavedMovie APIs (test app, in-memory mock DB)', () => {
    test('GET /api/savedmovie returns saved movies (200)', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/savedmovie?country=US&user_id=u1&page=1&page_size=10')
            .set(apiKeyHeader)
            .expect(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body).toHaveProperty('page', 1);
        expect(res.body).toHaveProperty('page_size', 10);
        expect(res.body.data.map((m) => m.id)).toContain('m-us-1');
    });
    test('POST /api/savedmovie success returns 201 and persists in mock DB', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
            .expect(201);
        const list = await (0, supertest_1.default)(app_1.default)
            .get('/api/savedmovie?country=ID&user_id=u1&page=1&page_size=10')
            .set(apiKeyHeader)
            .expect(200);
        expect(list.body.data.map((m) => m.id)).toContain('m-id-1');
    });
    test('POST duplicate returns 409', async () => {
        // save once
        await (0, supertest_1.default)(app_1.default)
            .post('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
            .expect(201);
        // save again -> 409
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ country: 'ID', user_id: 'u1', movie_id: 'm-id-1' })
            .expect(409);
        expect(res.body.error.code).toBe('409 DUPLICATE_SAVE');
    });
    test('POST unavailable returns 422', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ country: 'US', user_id: 'u1', movie_id: 'm-id-1' })
            .expect(422);
    });
    test('DELETE success -> 204 and actually removed', async () => {
        // seeded m-us-1 saved for u1
        await (0, supertest_1.default)(app_1.default)
            .delete('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ user_id: 'u1', movie_id: 'm-us-1' })
            .expect(204);
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/savedmovie?country=US&user_id=u1&page=1&page_size=10')
            .set(apiKeyHeader)
            .expect(200);
        expect(res.body.data.map((m) => m.id)).not.toContain('m-us-1');
    });
    test('DELETE not-saved -> 404', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete('/api/savedmovie')
            .set(apiKeyHeader)
            .send({ user_id: 'u1', movie_id: 'nope' })
            .expect(404);
        expect(res.body).toHaveProperty('code', 'NOT_SAVED');
    });
    test('403 when x-api-key missing', async () => {
        await (0, supertest_1.default)(app_1.default).get('/api/savedmovie').expect(403);
        await (0, supertest_1.default)(app_1.default).post('/api/savedmovie').send({}).expect(403);
        await (0, supertest_1.default)(app_1.default).delete('/api/savedmovie').send({}).expect(403);
    });
});
