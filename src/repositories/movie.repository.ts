import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../../generated/prisma/client';
import { Request } from 'express';
import { getMessage } from '../helpers/messages/messagesUtil';
import { MessagesKey } from '../helpers/messages/messagesKey';
import { MovieItem } from '../helpers/dtos/movie.dto';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export class MovieRepository {
  async findAllPagedBasedCountryAndGenre(
    req: Request,
    page: number,
    pageSize: number,
    country: string,
    sort: 'year' | '-year',
    genreId?: string | null,
  ): Promise<{
    data: MovieItem[];
    total: number;
  }> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      // where clause
      const where: Prisma.MovieWhereInput = {
        movieAvailabilities: {
          some: { countryCode: country.toUpperCase() },
        },
      };

      if (genreId) {
        where.movieGenres = { some: { genreId } };
      }

      const orderBy =
        sort === 'year' ? { year: 'asc' as const } : { year: 'desc' as const };

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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  // async findAllPagedBasedCountryAndUser(
  //   req: Request,
  //   page: number,
  //   pageSize: number,
  //   country: string,
  //   userId: string,
  //   sort: 'date_added' | '-date_added',
  // ): Promise<{
  //   data: MovieItem[];
  //   total: number;
  // }> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const take = pageSize;

  //     // where clause
  //     const where: Prisma.MovieWhereInput = {
  //       movieAvailabilities: {
  //         some: { countryCode: country.toUpperCase() },
  //       },
  //       savedMovies: {
  //         some: { userId },
  //       }
  //     };

  //     // order by
  //     const orderBy: Prisma.MovieOrderByWithRelationInput =
  //     sort === 'date_added' ? {
  //       savedMovies: {
  //         _min: {
  //           dataAdded: 'asc' as const
  //         }
  //       },
  //     } : {
  //       savedMovies: {
  //         dateAdded: 'desc' as const
  //       },
  //     }
      
  //     const [total, data] = await Promise.all([
  //       prisma.movie.count({ where }),
  //       prisma.movie.findMany({
  //         where,
  //         orderBy,
  //         skip,
  //         take,
  //         select: {
  //           id: true,
  //           title: true,
  //           year: true,
  //         },
  //       }),
  //     ]);

  //     return {
  //       data,
  //       total,
  //     };
      
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(
  //         getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
  //       );
  //     }
  //     throw error;
  //   }
  // }
}
