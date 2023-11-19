/*
  Warnings:

  - You are about to drop the column `boardgame_id` on the `user_collections` table. All the data in the column will be lost.
  - Added the required column `productsId` to the `user_collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_collections` DROP COLUMN `boardgame_id`,
    ADD COLUMN `productsId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_collections` ADD CONSTRAINT `user_collections_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
