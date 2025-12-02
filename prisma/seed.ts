import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// async function main() {
//   console.log('🌱 Starting seed...');

//   // Clear existing data
//   await prisma.post.deleteMany();
//   await prisma.user.deleteMany();

//   // Create users with posts
//   await prisma.user.create({
//     data: {
//       name: 'Alice Johnson',
//       email: 'alice@example.com',
//       posts: {
//         create: [
//           {
//             title: 'Alice First Post',
//             content: 'Hello world from Alice!',
//             published: true,
//           },
//           {
//             title: 'Alice Draft Post',
//             content: 'This is still a draft...',
//             published: false,
//           },
//         ],
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       name: 'Bob Williams',
//       email: 'bob@example.com',
//       posts: {
//         create: [
//           {
//             title: "Bob's Introduction",
//             content: "I'm Bob and I love coding.",
//             published: true,
//           },
//         ],
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       name: 'Charlie Smith',
//       email: 'charlie@example.com',
//       posts: {
//         create: [
//           {
//             title: "Charlie's Post",
//             content: "Charlie's first blog post content.",
//             published: true,
//           },
//         ],
//       },
//     },
//   });

//   console.log('🌱 Seeding completed.');
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
