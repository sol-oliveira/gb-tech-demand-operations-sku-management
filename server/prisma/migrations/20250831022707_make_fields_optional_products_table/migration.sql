-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
