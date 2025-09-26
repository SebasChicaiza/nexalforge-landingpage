/*
  Warnings:

  - You are about to drop the `Etiqueta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publicacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicacionEtiqueta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuscriptorNewsletter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioRol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VistaPublicacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "landing"."Publicacion" DROP CONSTRAINT "Publicacion_autorId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."PublicacionEtiqueta" DROP CONSTRAINT "PublicacionEtiqueta_etiquetaId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."PublicacionEtiqueta" DROP CONSTRAINT "PublicacionEtiqueta_publicacionId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."UsuarioRol" DROP CONSTRAINT "UsuarioRol_rolId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."UsuarioRol" DROP CONSTRAINT "UsuarioRol_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "landing"."VistaPublicacion" DROP CONSTRAINT "VistaPublicacion_publicacionId_fkey";

-- DropTable
DROP TABLE "landing"."Etiqueta";

-- DropTable
DROP TABLE "landing"."Publicacion";

-- DropTable
DROP TABLE "landing"."PublicacionEtiqueta";

-- DropTable
DROP TABLE "landing"."Rol";

-- DropTable
DROP TABLE "landing"."SuscriptorNewsletter";

-- DropTable
DROP TABLE "landing"."Usuario";

-- DropTable
DROP TABLE "landing"."UsuarioRol";

-- DropTable
DROP TABLE "landing"."VistaPublicacion";

-- CreateTable
CREATE TABLE "landing"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "estado_borrado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "landing"."Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "contentMd" TEXT,
    "coverUrl" TEXT,
    "categoryId" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "readMinutes" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT,
    "estado_borrado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Status" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."PostTag" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "landing"."PostView" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "landing"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "landing"."Role"("name");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "landing"."UserRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "landing"."Post"("slug");

-- CreateIndex
CREATE INDEX "Post_categoryId_idx" ON "landing"."Post"("categoryId");

-- CreateIndex
CREATE INDEX "Post_publishedAt_statusId_idx" ON "landing"."Post"("publishedAt", "statusId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "landing"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "landing"."Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_code_key" ON "landing"."Status"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "landing"."Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "landing"."Tag"("name");

-- CreateIndex
CREATE INDEX "PostTag_tagId_idx" ON "landing"."PostTag"("tagId");

-- CreateIndex
CREATE INDEX "PostView_postId_createdAt_idx" ON "landing"."PostView"("postId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "landing"."NewsletterSubscriber"("email");

-- AddForeignKey
ALTER TABLE "landing"."UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "landing"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "landing"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "landing"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Post" ADD CONSTRAINT "Post_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "landing"."Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "landing"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "landing"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "landing"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."PostView" ADD CONSTRAINT "PostView_postId_fkey" FOREIGN KEY ("postId") REFERENCES "landing"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
