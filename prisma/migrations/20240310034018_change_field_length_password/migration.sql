/*
  Warnings:

  - You are about to drop the column `username` on the `user_kopi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_kopi` DROP COLUMN `username`,
    MODIFY `password` VARCHAR(100) NOT NULL;
