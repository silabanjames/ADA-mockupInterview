"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreRepository = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const messagesUtil_1 = require("../helpers/messages/messagesUtil");
const messagesKey_1 = require("../helpers/messages/messagesKey");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
class GenreRepository {
    async findAll(req) {
        try {
            return await prisma.genre.findMany();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }
    async findAllPaged(req, page, pageSize) {
        try {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const [total, data] = await Promise.all([
                prisma.genre.count(),
                prisma.genre.findMany({
                    skip,
                    take
                })
            ]);
            return {
                data: data,
                total: total
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }
    async findByID(req, pkid) {
        try {
            return await prisma.genre.findUnique({ where: { id: pkid } });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGBYID) + ': ' + error.message);
            }
            throw error;
        }
    }
}
exports.GenreRepository = GenreRepository;
