/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Review', 'Accepted');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Full', 'Partial');

-- DropTable
DROP TABLE "Orders";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "applicationFee" DOUBLE PRECISION NOT NULL,
    "postedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Pending',
    "sscResult" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hscResult" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "documents" TEXT NOT NULL,
    "appliedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_applicationId_key" ON "Payment"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
