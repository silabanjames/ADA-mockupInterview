// const { PrismaClient } = require('../generated/prisma/client');
// const { PrismaPg } = require('@prisma/adapter-pg');

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });

// const prisma = new PrismaClient({ adapter });

// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function sample(arr) {
//   return arr[randomInt(0, arr.length - 1)];
// }

// function sampleSize(arr, size) {
//   const copy = arr.slice();
//   const out = [];
//   while (out.length < size && copy.length > 0) {
//     const idx = randomInt(0, copy.length - 1);
//     out.push(copy.splice(idx, 1)[0]);
//   }
//   return out;
// }

// function randomYear(from = 1970, to = new Date().getFullYear()) {
//   return randomInt(from, to);
// }

// function randomDateWithinLastYear() {
//   const now = Date.now();
//   const oneYearMs = 365 * 24 * 60 * 60 * 1000;
//   const t = new Date(now - Math.floor(Math.random() * oneYearMs));
//   return t;
// }

// async function main() {
//   console.log("Start seeding...");

//   // --- Constants
//   const GENRES = [
//     "Action", "Adventure", "Comedy", "Drama", "Horror",
//     "Thriller", "Sci-Fi", "Fantasy", "Romance", "Mystery",
//     "Crime", "Animation", "Documentary", "Family", "Musical"
//   ]; // 15

//   const COUNTRIES = [
//     { code: "US", name: "United States" },
//     { code: "GB", name: "United Kingdom" },
//     { code: "ID", name: "Indonesia" },
//     { code: "JP", name: "Japan" },
//     { code: "FR", name: "France" }
//   ]; // 5

//   const ACTOR_FIRST = [
//     "Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie",
//     "Drew", "Cameron", "Robin", "Avery", "Rowan", "Quinn", "Shawn"
//   ];
//   const ACTOR_LAST = [
//     "Smith", "Johnson", "Brown", "Williams", "Jones", "Miller", "Davis",
//     "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson"
//   ];
//   const ACTORS_COUNT = 30;

//   const USERS = [
//     { name: "Alice", date_of_birth: new Date(1990, 4, 12) },
//     { name: "Bob", date_of_birth: new Date(1985, 9, 1) },
//     { name: "Charlie", date_of_birth: new Date(1995, 2, 22) },
//     { name: "Dina", date_of_birth: new Date(2000, 6, 3) },
//   ];

//   const MOVIES_COUNT = 150;

//   // --- Clean up existing data (OPTIONAL)
//   // If you want to start fresh, uncomment the following lines.
//   // WARNING: destructive. Use only in dev seeds.
//   // await prisma.savedMovie.deleteMany();
//   // await prisma.movieAvailability.deleteMany();
//   // await prisma.cast.deleteMany();
//   // await prisma.movieGenre.deleteMany();
//   // await prisma.movie.deleteMany();
//   // await prisma.actor.deleteMany();
//   // await prisma.genre.deleteMany();
//   // await prisma.country.deleteMany();
//   // await prisma.user.deleteMany();

//   // --- Create genres
//   console.log("Seeding genres...");
//   const genresData = GENRES.map((name) => ({ name }));
//   await prisma.genre.createMany({
//     data: genresData,
//     skipDuplicates: true
//   });
//   const genres = await prisma.genre.findMany();
//   console.log(`Created/found ${genres.length} genres.`);

//   // --- Create countries
//   console.log("Seeding countries...");
//   const countriesData = COUNTRIES.map((c) => ({ code: c.code, name: c.name }));
//   await prisma.country.createMany({ data: countriesData, skipDuplicates: true });
//   const countries = await prisma.country.findMany();
//   console.log(`Created/found ${countries.length} countries.`);

//   // --- Create actors
//   console.log("Seeding actors...");
//   const actorNames = [];
//   for (let i = 0; i < ACTORS_COUNT; i++) {
//     const first = sample(ACTOR_FIRST);
//     const last = sample(ACTOR_LAST);
//     // ensure some variation
//     actorNames.push({ name: `${first} ${last} ${i + 1}` });
//   }
//   await prisma.actor.createMany({ data: actorNames, skipDuplicates: true });
//   const actors = await prisma.actor.findMany();
//   console.log(`Created/found ${actors.length} actors.`);

//   // --- Create users
//   console.log("Seeding users...");
//   const usersData = USERS.map(u => ({
//     name: u.name,
//     date_of_birth: u.date_of_birth
//   }));
//   await prisma.user.createMany({ data: usersData, skipDuplicates: true });
//   const users = await prisma.user.findMany();
//   console.log(`Created/found ${users.length} users.`);

//   // --- Create movies
//   console.log(`Seeding ${MOVIES_COUNT} movies (with relationships)...`);
//   const createdMovieIds = [];

//   // A small pool of words to synthesize titles
//   const titleWordsA = ["Shadow", "Last", "First", "Lost", "Red", "Blue", "Secret", "Silent", "Midnight", "Golden", "Broken", "Hidden", "Infinite", "Forgotten", "Rising"];
//   const titleWordsB = ["Road", "Moon", "City", "Empire", "Promise", "Storm", "Light", "Song", "Game", "Kingdom", "Dream", "Code", "Bridge", "River", "Echo"];

//   for (let i = 0; i < MOVIES_COUNT; i++) {
//     const title = `${sample(titleWordsA)} ${sample(titleWordsB)} ${i + 1}`; // e.g. "Shadow Empire 1"
//     const year = randomYear(1980, 2025);

//     // Choose 1-3 genres
//     const genresForMovie = sampleSize(genres, randomInt(1, 3));
//     // Choose 2-6 actors
//     const actorsForMovie = sampleSize(actors, randomInt(2, 6));
//     // Choose availability in 1-4 countries
//     const countriesForMovie = sampleSize(countries, randomInt(1, Math.min(4, countries.length)));

//     // create movie with relation records via relation models
//     const created = await prisma.movie.create({
//       data: {
//         title,
//         year,
//         movieGenres: {
//           create: genresForMovie.map(g => ({
//             genre: { connect: { id: g.id } }
//           }))
//         },
//         casts: {
//           create: actorsForMovie.map(a => ({
//             actor: { connect: { id: a.id } }
//           }))
//         },
//         movieAvailabilities: {
//           create: countriesForMovie.map(c => ({
//             country: { connect: { code: c.code } }
//           }))
//         }
//       },
//       select: { id: true }
//     });

//     createdMovieIds.push(created.id);

//     if ((i + 1) % 25 === 0) {
//       console.log(`  created ${i + 1} movies...`);
//     }
//   }

//   console.log(`Created ${createdMovieIds.length} movies.`);

//   // --- Seed saved movies for users (random)
//   console.log("Seeding saved movies (user savedMovie records)...");
//   const savedMovieRecords = [];
//   for (const user of users) {
//     // each user saves between 5 and 20 movies, unique per user
//     const numSaved = randomInt(5, 20);
//     const savedForUser = sampleSize(createdMovieIds, Math.min(numSaved, createdMovieIds.length));
//     for (const movieId of savedForUser) {
//       savedMovieRecords.push({
//         userId: user.id,
//         movieId,
//         dateAdded: randomDateWithinLastYear()
//       });
//     }
//   }

//   // To avoid duplicate primary key errors, use createMany with skipDuplicates where supported.
//   // Note: createMany with skipDuplicates works for unique constraints/composite PKs on supported DBs.
//   try {
//     // chunking createMany to avoid very large payloads
//     const chunkSize = 200;
//     for (let i = 0; i < savedMovieRecords.length; i += chunkSize) {
//       const chunk = savedMovieRecords.slice(i, i + chunkSize);
//       await prisma.savedMovie.createMany({
//         data: chunk,
//         skipDuplicates: true
//       });
//     }
//     console.log(`Created ${savedMovieRecords.length} savedMovie entries (attempted).`);
//   } catch (err) {
//     console.error("Error creating savedMovie entries:", err);
//     // fallback: individual creates (slower)
//     for (const rec of savedMovieRecords) {
//       try {
//         await prisma.savedMovie.create({ data: rec });
//       } catch (e) {
//         // skip duplicates / errors
//       }
//     }
//   }

//   console.log("Seeding finished.");
// }

// main()
