/*
  Warnings:

  - You are about to drop the column `penalties` on the `matchresult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `matchresult` DROP COLUMN `penalties`,
    ADD COLUMN `fouls` INTEGER NULL;
