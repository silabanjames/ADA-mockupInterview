-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" UUID NOT NULL,
    "genreId" UUID NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cast" (
    "movieId" UUID NOT NULL,
    "actorId" UUID NOT NULL,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("movieId","actorId")
);

-- CreateTable
CREATE TABLE "Country" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "MovieAvailability" (
    "movieId" UUID NOT NULL,
    "countryCode" CHAR(2) NOT NULL,

    CONSTRAINT "MovieAvailability_pkey" PRIMARY KEY ("movieId","countryCode")
);

-- CreateTable
CREATE TABLE "SavedMovie" (
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedMovie_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Movie_year_idx" ON "Movie"("year");

-- CreateIndex
CREATE INDEX "MovieAvailability_countryCode_movieId_idx" ON "MovieAvailability"("countryCode", "movieId");

-- CreateIndex
CREATE INDEX "SavedMovie_userId_movieId_idx" ON "SavedMovie"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAvailability" ADD CONSTRAINT "MovieAvailability_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAvailability" ADD CONSTRAINT "MovieAvailability_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMovie" ADD CONSTRAINT "SavedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMovie" ADD CONSTRAINT "SavedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
