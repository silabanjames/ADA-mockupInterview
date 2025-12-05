"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedMovieRepository = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const messagesUtil_1 = require("../helpers/messages/messagesUtil");
const messagesKey_1 = require("../helpers/messages/messagesKey");
const errors_1 = require("../helpers/errors/errors");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
class SavedMovieRepository {
    async findAllPagedBasedCountryAndUser(req, page, pageSize, country, userId, sort) {
        try {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const countryCode = (country || '').toUpperCase();
            // where clause
            const where = {
                userId,
                movie: {
                    movieAvailabilities: {
                        some: { countryCode },
                    },
                },
            };
            //order by
            const orderBy = sort === 'date_added'
                ? {
                    dateAdded: 'asc',
                }
                : {
                    dateAdded: 'desc',
                };
            const [total, data] = await Promise.all([
                prisma.savedMovie.count({ where }),
                prisma.savedMovie.findMany({
                    where,
                    orderBy,
                    skip,
                    take,
                    include: {
                        movie: {
                            select: {
                                id: true,
                                title: true,
                                year: true,
                            },
                            include: {
                                movieAvailabilities: {
                                    select: {
                                        country: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                    },
                                },
                            }
                        },
                    },
                }),
            ]);
            const movieData = data.map((savedMovie) => ({
                id: savedMovie.movie.id,
                title: savedMovie.movie.title,
                year: savedMovie.movie.year,
                country: savedMovie.movie.movieAvailabilities[0].country.name,
            }));
            return {
                data: movieData,
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
    async createSavedMovie(req, country, userId, movieId) {
        try {
            const countryCode = (country || '').toUpperCase();
            // 1. Ensure the movie is existed
            const movie = await prisma.movie.findFirst({
                where: {
                    id: movieId,
                },
                select: {
                    id: true,
                    title: true,
                    year: true,
                },
            });
            if (!movie) {
                throw new errors_1.NotFoundError(`Movie with id ${movieId} not found`);
            }
            // 2. Cannot save the same
            const savedMovie = await prisma.savedMovie.findFirst({
                where: {
                    movieId,
                    userId,
                },
                select: {
                    movieId: true,
                },
            });
            if (savedMovie) {
                throw new errors_1.DuplicateSaveError(`Movie with id ${movieId} already saved by this user`);
            }
            // 3. Cannot save if movie is not available in country
            const movieAvailability = await prisma.movieAvailability.findFirst({
                where: {
                    movieId,
                    countryCode,
                },
                select: {
                    movieId: true,
                },
            });
            if (!movieAvailability) {
                throw new errors_1.UnavailableInCountryError(`Movie with id ${movieId} is not available in country ${country}`);
            }
            // 4. Save movie
            const savedMovieItem = await prisma.savedMovie.create({
                data: {
                    movieId,
                    userId,
                    dateAdded: new Date(),
                },
            });
            return {
                id: savedMovieItem.movieId,
                title: movie.title,
                year: movie.year,
            };
        }
        catch (error) {
            if (error instanceof errors_1.DuplicateSaveError ||
                error instanceof errors_1.UnavailableInCountryError ||
                error instanceof errors_1.NotFoundError ||
                error instanceof errors_1.BadRequest) {
                throw error;
            }
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }
    async removeSavedMovie(req, movieId, userId) {
        try {
            // 1. Ensure the movie is existed
            const movie = await prisma.movie.findFirst({
                where: {
                    id: movieId,
                },
                select: {
                    id: true,
                },
            });
            if (!movie) {
                throw new errors_1.NotFoundError(`Movie with id ${movieId} is not found`);
            }
            await prisma.savedMovie.deleteMany({
                where: {
                    movieId,
                    userId,
                },
            });
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                throw error;
            }
            if (error instanceof Error) {
                throw new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }
}
exports.SavedMovieRepository = SavedMovieRepository;
