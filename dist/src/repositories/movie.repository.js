"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRepository = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const messagesUtil_1 = require("../helpers/messages/messagesUtil");
const messagesKey_1 = require("../helpers/messages/messagesKey");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
class MovieRepository {
    async findAllPagedBasedCountryAndGenre(req, page, pageSize, country, sort, genreId) {
        try {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            // where clause
            const where = {
                movieAvailabilities: {
                    some: { countryCode: country.toUpperCase() },
                },
            };
            if (genreId) {
                where.movieGenres = { some: { genreId } };
            }
            const orderBy = sort === 'year' ? { year: 'asc' } : { year: 'desc' };
            const [total, data] = await Promise.all([
                prisma.movie.count({ where }),
                prisma.movie.findMany({
                    where,
                    orderBy,
                    skip,
                    take,
                    select: {
                        id: true,
                        title: true,
                        year: true,
                    },
                }),
            ]);
            return {
                data,
                total,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }
}
exports.MovieRepository = MovieRepository;
