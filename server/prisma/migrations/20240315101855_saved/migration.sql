/*
  Warnings:

  - You are about to drop the column `content` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "content",
DROP COLUMN "published";
