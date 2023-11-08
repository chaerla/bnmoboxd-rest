-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "curator_reviews" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "user_verification" (
    "user_id" SERIAL NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "user_verification_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "user_verification" ADD CONSTRAINT "user_verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
