/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `compositions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `packagings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `volumetries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "User_githubId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_compositions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formula" TEXT NOT NULL,
    "keyIngredients" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_compositions" ("createdAt", "formula", "id", "keyIngredients", "updatedAt", "userCreate", "userUpdate") SELECT "createdAt", "formula", "id", "keyIngredients", "updatedAt", "userCreate", "userUpdate" FROM "compositions";
DROP TABLE "compositions";
ALTER TABLE "new_compositions" RENAME TO "compositions";
CREATE TABLE "new_packagings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "material" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_packagings" ("createdAt", "id", "material", "type", "updatedAt", "userCreate", "userUpdate") SELECT "createdAt", "id", "material", "type", "updatedAt", "userCreate", "userUpdate" FROM "packagings";
DROP TABLE "packagings";
ALTER TABLE "new_packagings" RENAME TO "packagings";
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_products" ("brand", "createdAt", "description", "id", "name", "updatedAt", "userCreate", "userUpdate") SELECT "brand", "createdAt", "description", "id", "name", "updatedAt", "userCreate", "userUpdate" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_skus" (
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
    CONSTRAINT "skus_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "compositions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_volumetryId_fkey" FOREIGN KEY ("volumetryId") REFERENCES "volumetries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skus_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "packagings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_skus" ("commercialDescription", "compositionId", "createdAt", "description", "id", "packagingId", "productId", "skuCode", "status", "updatedAt", "userCreate", "userUpdate", "volumetryId") SELECT "commercialDescription", "compositionId", "createdAt", "description", "id", "packagingId", "productId", "skuCode", "status", "updatedAt", "userCreate", "userUpdate", "volumetryId" FROM "skus";
DROP TABLE "skus";
ALTER TABLE "new_skus" RENAME TO "skus";
CREATE TABLE "new_volumetries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_volumetries" ("createdAt", "id", "unit", "updatedAt", "userCreate", "userUpdate", "value") SELECT "createdAt", "id", "unit", "updatedAt", "userCreate", "userUpdate", "value" FROM "volumetries";
DROP TABLE "volumetries";
ALTER TABLE "new_volumetries" RENAME TO "volumetries";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
