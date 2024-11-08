/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `auth` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `auth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth` DROP COLUMN `expiresAt`,
    DROP COLUMN `token`;
