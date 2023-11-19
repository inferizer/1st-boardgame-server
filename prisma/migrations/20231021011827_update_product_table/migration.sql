/*
  Warnings:

  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearpublished` VARCHAR(191) NULL;
