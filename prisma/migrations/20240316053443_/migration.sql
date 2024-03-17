/*
  Warnings:

  - Added the required column `username` to the `user_kopi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_kopi` ADD COLUMN `username` VARCHAR(100) NOT NULL;
