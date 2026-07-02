-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetSlug" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_targetType_targetSlug_idx" ON "Comment"("targetType", "targetSlug");
