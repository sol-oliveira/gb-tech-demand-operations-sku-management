/*
  Warnings:

  - Added the required column `compositionUniqueKey` to the `compositions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packagingUniqueKey` to the `packagings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumetryUniqueKey` to the `volumetries` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_compositions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formula" TEXT NOT NULL,
    "keyIngredients" TEXT NOT NULL,
    "compositionUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_compositions" ("createdAt", "formula", "id", "keyIngredients", "updatedAt", "userCreate", "userUpdate") SELECT "createdAt", "formula", "id", "keyIngredients", "updatedAt", "userCreate", "userUpdate" FROM "compositions";
DROP TABLE "compositions";
ALTER TABLE "new_compositions" RENAME TO "compositions";
CREATE UNIQUE INDEX "compositions_compositionUniqueKey_key" ON "compositions"("compositionUniqueKey");
CREATE TABLE "new_packagings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "material" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "packagingUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_packagings" ("createdAt", "id", "material", "type", "updatedAt", "userCreate", "userUpdate") SELECT "createdAt", "id", "material", "type", "updatedAt", "userCreate", "userUpdate" FROM "packagings";
DROP TABLE "packagings";
ALTER TABLE "new_packagings" RENAME TO "packagings";
CREATE UNIQUE INDEX "packagings_packagingUniqueKey_key" ON "packagings"("packagingUniqueKey");
CREATE TABLE "new_volumetries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "volumetryUniqueKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userCreate" TEXT NOT NULL,
    "userUpdate" TEXT
);
INSERT INTO "new_volumetries" ("createdAt", "id", "unit", "updatedAt", "userCreate", "userUpdate", "value") SELECT "createdAt", "id", "unit", "updatedAt", "userCreate", "userUpdate", "value" FROM "volumetries";
DROP TABLE "volumetries";
ALTER TABLE "new_volumetries" RENAME TO "volumetries";
CREATE UNIQUE INDEX "volumetries_volumetryUniqueKey_key" ON "volumetries"("volumetryUniqueKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
