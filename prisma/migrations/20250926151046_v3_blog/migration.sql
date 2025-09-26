/*
  Warnings:

  - You are about to drop the column `slug` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Estado` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Estado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "landing"."Categoria_slug_key";

-- DropIndex
DROP INDEX "landing"."Estado_codigo_key";

-- AlterTable
ALTER TABLE "landing"."Categoria" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "landing"."Estado" DROP COLUMN "codigo";

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nombre_key" ON "landing"."Estado"("nombre");
