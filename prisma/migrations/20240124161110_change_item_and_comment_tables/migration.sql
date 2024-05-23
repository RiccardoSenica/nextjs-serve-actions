/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ItemComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ItemComment" DROP COLUMN "updatedAt",
ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "regret" SET DEFAULT false;
