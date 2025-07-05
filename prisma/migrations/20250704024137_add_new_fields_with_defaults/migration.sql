/*
  Warnings:

  - Added the required column `black` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `white` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "black" TEXT NOT NULL,
ADD COLUMN     "end" BOOLEAN NOT NULL,
ADD COLUMN     "preservation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "result" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resultBlack" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resultWhite" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "watch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "white" TEXT NOT NULL;
