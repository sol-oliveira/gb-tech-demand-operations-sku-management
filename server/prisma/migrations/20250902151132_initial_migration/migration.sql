-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "packagings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "material" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "packagingUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "volumetries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "volumetryUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "compositions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formula" TEXT NOT NULL,
    "keyIngredients" TEXT NOT NULL,
    "compositionUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);

-- CreateTable
CREATE TABLE "skus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "skuCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commercialDescription" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "compositionId" TEXT NOT NULL,
    "volumetryId" TEXT NOT NULL,
    "packagingId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT,
    CONSTRAINT "skus_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "compositions" ("compositionUniqueKey") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_volumetryId_fkey" FOREIGN KEY ("volumetryId") REFERENCES "volumetries" ("volumetryUniqueKey") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "packagings" ("packagingUniqueKey") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "packagings_packagingUniqueKey_key" ON "packagings"("packagingUniqueKey");

-- CreateIndex
CREATE UNIQUE INDEX "volumetries_volumetryUniqueKey_key" ON "volumetries"("volumetryUniqueKey");

-- CreateIndex
CREATE UNIQUE INDEX "compositions_compositionUniqueKey_key" ON "compositions"("compositionUniqueKey");
