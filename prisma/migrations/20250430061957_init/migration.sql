/*
  Warnings:

  - Added the required column `turn` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `board` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "turn" INTEGER NOT NULL,
DROP COLUMN "board",
ADD COLUMN     "board" JSONB NOT NULL;
