import 'dotenv/config';
import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Prisma with Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on port ${PORT}`);
});

// Create new user
app.post('/user', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

// Read all user
app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Update
app.put('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  });
  res.json(user);
});

//
app.delete('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json(user);
});
