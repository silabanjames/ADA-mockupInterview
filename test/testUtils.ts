import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// const genreRepository = new GenreRepository();

export async function getGenreList() {
  // return prisma.country.create({ data: { code: code.toUpperCase(), name } });
  const data = await prisma.genre.findMany({ take: 1,  skip: 20 })
  return data
}