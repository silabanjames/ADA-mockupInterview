"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenreList = getGenreList;
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const client_1 = require("../generated/prisma/client");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
// const genreRepository = new GenreRepository();
async function getGenreList() {
    // return prisma.country.create({ data: { code: code.toUpperCase(), name } });
    const data = await prisma.genre.findMany({ take: 1, skip: 20 });
    return data;
}
