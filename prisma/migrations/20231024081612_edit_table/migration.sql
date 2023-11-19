/*
  Warnings:

  - You are about to drop the column `quantity` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_user_id_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `addresses`;
