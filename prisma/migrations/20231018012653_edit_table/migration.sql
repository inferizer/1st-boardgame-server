/*
  Warnings:

  - You are about to drop the column `usersId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `boardgameID` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `ordersId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `boardgameID` on the `user_collections` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `user_collections` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardgame_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardgame_id` to the `user_collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ordersId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `user_collections` DROP FOREIGN KEY `user_collections_usersId_fkey`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `usersId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `boardgameID`,
    DROP COLUMN `usersId`,
    ADD COLUMN `boardgame_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `ordersId`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `usersId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_collections` DROP COLUMN `boardgameID`,
    DROP COLUMN `usersId`,
    ADD COLUMN `boardgame_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_collections` ADD CONSTRAINT `user_collections_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
