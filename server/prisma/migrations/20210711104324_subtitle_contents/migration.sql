/*
  Warnings:

  - You are about to drop the column `subtitle` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `subtitle`,
    ADD COLUMN `contents` VARCHAR(191);
