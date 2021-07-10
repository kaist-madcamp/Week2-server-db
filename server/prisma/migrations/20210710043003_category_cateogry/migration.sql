/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_ibfk_2`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `content`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `contents` VARCHAR(191);

-- DropTable
DROP TABLE `_CategoryToPost`;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
