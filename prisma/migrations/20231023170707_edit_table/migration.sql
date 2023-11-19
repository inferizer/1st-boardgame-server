/*
  Warnings:

  - You are about to drop the column `boardgame_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `add_date` on the `user_collections` table. All the data in the column will be lost.
  - Added the required column `productsId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `boardgame_id`,
    ADD COLUMN `productsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_collections` DROP COLUMN `add_date`;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
