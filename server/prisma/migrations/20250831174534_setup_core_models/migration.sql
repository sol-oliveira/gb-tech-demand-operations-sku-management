-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "packagings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "material" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "volumetries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "compositions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formula" TEXT NOT NULL,
    "keyIngredients" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "skus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" INTEGER NOT NULL,
    "skuCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commercialDescription" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "compositionId" INTEGER NOT NULL,
    "volumetryId" INTEGER NOT NULL,
    "packagingId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT,
    CONSTRAINT "skus_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "compositions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_volumetryId_fkey" FOREIGN KEY ("volumetryId") REFERENCES "volumetries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "packagings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
