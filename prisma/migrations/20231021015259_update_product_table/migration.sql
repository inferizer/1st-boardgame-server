/*
  Warnings:

  - Added the required column `bgg_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `bgg_id` VARCHAR(191) NOT NULL;
