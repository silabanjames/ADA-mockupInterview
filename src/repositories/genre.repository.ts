import { PrismaPg } from "@prisma/adapter-pg";
import { Request } from 'express';
import { Genre, PrismaClient } from '../../generated/prisma/client';
import { getMessage } from "../helpers/messages/messagesUtil";
import { MessagesKey } from "../helpers/messages/messagesKey";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export class GenreRepository {
  async findAll(req: Request): Promise<Genre[]> {
    try {
      return await prisma.genre.findMany();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  async findAllPaged(
    req: Request, 
    page: number,
    pageSize: number,
  ): Promise<{
    data: Genre[],
    total: number
  }> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize

      const [total, data] =  await Promise.all([
        prisma.genre.count(),
        prisma.genre.findMany({ 
          skip, 
          take 
        })
      ])
      
      return {
        data: data,
        total: total
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  async findByID(
    req: Request,
    pkid: string,
  ): Promise<Genre | null> {
    try {
      return await prisma.genre.findUnique({ where: { id: pkid } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGBYID) + ': ' + error.message,
        );
      }
      throw error;
    }
  }
}