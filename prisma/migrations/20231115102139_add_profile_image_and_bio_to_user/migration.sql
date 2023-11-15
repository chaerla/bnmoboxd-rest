/*
  Warnings:

  - You are about to drop the column `bio` on the `curator_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `curator_reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "curator_reviews" DROP COLUMN "bio",
DROP COLUMN "profile_image";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "profile_image" TEXT;
