/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsletterSubscriber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "landing"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."Post" DROP CONSTRAINT "Post_statusId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."PostTag" DROP CONSTRAINT "PostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."PostView" DROP CONSTRAINT "PostView_postId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropTable
DROP TABLE "landing"."Category";

-- DropTable
DROP TABLE "landing"."NewsletterSubscriber";

-- DropTable
DROP TABLE "landing"."Post";

-- DropTable
DROP TABLE "landing"."PostTag";

-- DropTable
DROP TABLE "landing"."PostView";

-- DropTable
DROP TABLE "landing"."Role";

-- DropTable
DROP TABLE "landing"."Status";

-- DropTable
DROP TABLE "landing"."Tag";

-- DropTable
DROP TABLE "landing"."User";

-- DropTable
DROP TABLE "landing"."UserRole";

-- CreateTable
CREATE TABLE "landing"."Usuario" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT,
    "avatarUrl" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "estado_borrado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."UsuarioRol" (
    "usuarioId" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("usuarioId","rolId")
);

-- CreateTable
CREATE TABLE "landing"."Publicacion" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "extracto" TEXT NOT NULL,
    "contenidoMd" TEXT,
    "portadaUrl" TEXT,
    "categoriaId" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "minutosLectura" INTEGER NOT NULL,
    "publicadoEn" TIMESTAMP(3),
    "autorId" TEXT,
    "estado_borrado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Estado" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Etiqueta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."PublicacionEtiqueta" (
    "publicacionId" TEXT NOT NULL,
    "etiquetaId" TEXT NOT NULL,

    CONSTRAINT "PublicacionEtiqueta_pkey" PRIMARY KEY ("publicacionId","etiquetaId")
);

-- CreateTable
CREATE TABLE "landing"."VistaPublicacion" (
    "id" TEXT NOT NULL,
    "publicacionId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "ipHash" TEXT,
    "agenteUsuario" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VistaPublicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."SuscriptorNewsletter" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "origen" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuscriptorNewsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "landing"."Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "landing"."Rol"("nombre");

-- CreateIndex
CREATE INDEX "UsuarioRol_rolId_idx" ON "landing"."UsuarioRol"("rolId");

-- CreateIndex
CREATE UNIQUE INDEX "Publicacion_slug_key" ON "landing"."Publicacion"("slug");

-- CreateIndex
CREATE INDEX "Publicacion_categoriaId_idx" ON "landing"."Publicacion"("categoriaId");

-- CreateIndex
CREATE INDEX "Publicacion_publicadoEn_estadoId_idx" ON "landing"."Publicacion"("publicadoEn", "estadoId");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "landing"."Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "landing"."Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_codigo_key" ON "landing"."Estado"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Etiqueta_slug_key" ON "landing"."Etiqueta"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Etiqueta_nombre_key" ON "landing"."Etiqueta"("nombre");

-- CreateIndex
CREATE INDEX "PublicacionEtiqueta_etiquetaId_idx" ON "landing"."PublicacionEtiqueta"("etiquetaId");

-- CreateIndex
CREATE INDEX "VistaPublicacion_publicacionId_creadoEn_idx" ON "landing"."VistaPublicacion"("publicacionId", "creadoEn");

-- CreateIndex
CREATE UNIQUE INDEX "SuscriptorNewsletter_correo_key" ON "landing"."SuscriptorNewsletter"("correo");

-- AddForeignKey
ALTER TABLE "landing"."UsuarioRol" ADD CONSTRAINT "UsuarioRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "landing"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."UsuarioRol" ADD CONSTRAINT "UsuarioRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "landing"."Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Publicacion" ADD CONSTRAINT "Publicacion_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "landing"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Publicacion" ADD CONSTRAINT "Publicacion_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "landing"."Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Publicacion" ADD CONSTRAINT "Publicacion_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "landing"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."PublicacionEtiqueta" ADD CONSTRAINT "PublicacionEtiqueta_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES "landing"."Publicacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."PublicacionEtiqueta" ADD CONSTRAINT "PublicacionEtiqueta_etiquetaId_fkey" FOREIGN KEY ("etiquetaId") REFERENCES "landing"."Etiqueta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."VistaPublicacion" ADD CONSTRAINT "VistaPublicacion_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES "landing"."Publicacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
