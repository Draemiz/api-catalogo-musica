/*
  Warnings:

  - Added the required column `generoId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "generoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
