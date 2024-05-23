-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('STARTER', 'PRO', 'ENTREPRISE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'STARTER';
