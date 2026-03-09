-- CreateTable
CREATE TABLE "landing"."WaConsent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "phoneE164" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'whatsapp',
    "purposes" TEXT[],
    "policyVersion" TEXT NOT NULL,
    "textShown" TEXT NOT NULL,
    "textHash" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'es-EC',
    "status" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "optoutMethod" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "evidence" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."PaisDemo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "codigoTelefonico" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaisDemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."CiudadDemo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CiudadDemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."EstadoSolicitudDemo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstadoSolicitudDemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing"."SolicitudDemo" (
    "id" TEXT NOT NULL,
    "nombreRepresentante" TEXT NOT NULL,
    "nombreClinica" TEXT NOT NULL,
    "ciudadId" INTEGER NOT NULL,
    "numeroWhatsApp" TEXT NOT NULL,
    "usuarioInstagram" TEXT,
    "emailContacto" TEXT NOT NULL,
    "problemaPrincipal" TEXT NOT NULL,
    "profesionalesYServicios" TEXT NOT NULL,
    "comentariosAdicionales" TEXT,
    "estadoId" INTEGER NOT NULL,
    "origen" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolicitudDemo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wa_consent_phone_idx" ON "landing"."WaConsent"("phoneE164");

-- CreateIndex
CREATE UNIQUE INDEX "PaisDemo_nombre_key" ON "landing"."PaisDemo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PaisDemo_iso2_key" ON "landing"."PaisDemo"("iso2");

-- CreateIndex
CREATE INDEX "CiudadDemo_paisId_idx" ON "landing"."CiudadDemo"("paisId");

-- CreateIndex
CREATE UNIQUE INDEX "CiudadDemo_paisId_nombre_key" ON "landing"."CiudadDemo"("paisId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoSolicitudDemo_nombre_key" ON "landing"."EstadoSolicitudDemo"("nombre");

-- CreateIndex
CREATE INDEX "SolicitudDemo_creadoEn_idx" ON "landing"."SolicitudDemo"("creadoEn");

-- CreateIndex
CREATE INDEX "SolicitudDemo_estadoId_idx" ON "landing"."SolicitudDemo"("estadoId");

-- CreateIndex
CREATE INDEX "SolicitudDemo_ciudadId_idx" ON "landing"."SolicitudDemo"("ciudadId");

-- CreateIndex
CREATE INDEX "SolicitudDemo_emailContacto_idx" ON "landing"."SolicitudDemo"("emailContacto");

-- AddForeignKey
ALTER TABLE "landing"."CiudadDemo" ADD CONSTRAINT "CiudadDemo_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "landing"."PaisDemo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."SolicitudDemo" ADD CONSTRAINT "SolicitudDemo_ciudadId_fkey" FOREIGN KEY ("ciudadId") REFERENCES "landing"."CiudadDemo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing"."SolicitudDemo" ADD CONSTRAINT "SolicitudDemo_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "landing"."EstadoSolicitudDemo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed statuses for demo leads
INSERT INTO "landing"."EstadoSolicitudDemo" ("nombre", "actualizadoEn")
VALUES
  ('NUEVO', NOW()),
  ('EN_CONTACTO', NOW()),
  ('CERRADO', NOW())
ON CONFLICT ("nombre") DO NOTHING;

-- Seed countries used by /demo-1 form
INSERT INTO "landing"."PaisDemo" ("nombre", "iso2", "codigoTelefonico", "actualizadoEn")
VALUES
  ('Ecuador', 'EC', '+593', NOW()),
  ('Peru', 'PE', '+51', NOW()),
  ('Colombia', 'CO', '+57', NOW()),
  ('Mexico', 'MX', '+52', NOW()),
  ('Chile', 'CL', '+56', NOW()),
  ('Argentina', 'AR', '+54', NOW()),
  ('Espana', 'ES', '+34', NOW()),
  ('Otro', 'OT', NULL, NOW())
ON CONFLICT ("iso2")
DO UPDATE SET
  "nombre" = EXCLUDED."nombre",
  "codigoTelefonico" = EXCLUDED."codigoTelefonico",
  "actualizadoEn" = NOW();

-- Seed initial cities (Ecuador full list + one base city per country)
WITH country_ids AS (
  SELECT "id", "iso2" FROM "landing"."PaisDemo"
),
seed_cities AS (
  SELECT * FROM (VALUES
    ('EC', 'Quito'),
    ('EC', 'Guayaquil'),
    ('EC', 'Cuenca'),
    ('EC', 'Santo Domingo'),
    ('EC', 'Machala'),
    ('EC', 'Manta'),
    ('EC', 'Ambato'),
    ('EC', 'Loja'),
    ('EC', 'Portoviejo'),
    ('EC', 'Riobamba'),
    ('PE', 'Lima'),
    ('CO', 'Bogota'),
    ('MX', 'Ciudad de Mexico'),
    ('CL', 'Santiago'),
    ('AR', 'Buenos Aires'),
    ('ES', 'Madrid'),
    ('OT', 'Otra ciudad')
  ) AS v("iso2", "nombre")
)
INSERT INTO "landing"."CiudadDemo" ("paisId", "nombre", "actualizadoEn")
SELECT c."id", s."nombre", NOW()
FROM seed_cities s
JOIN country_ids c
  ON c."iso2" = s."iso2"
ON CONFLICT ("paisId", "nombre") DO NOTHING;
