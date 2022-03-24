-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "imageUrl" TEXT,
    "published" BOOLEAN DEFAULT false,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
