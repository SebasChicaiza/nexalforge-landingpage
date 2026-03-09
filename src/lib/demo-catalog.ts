import type { PrismaClient, Prisma } from "@prisma/client";

const COUNTRIES = [
  { nombre: "Ecuador", iso2: "EC", codigoTelefonico: "+593" },
  { nombre: "Peru", iso2: "PE", codigoTelefonico: "+51" },
  { nombre: "Colombia", iso2: "CO", codigoTelefonico: "+57" },
  { nombre: "Mexico", iso2: "MX", codigoTelefonico: "+52" },
  { nombre: "Chile", iso2: "CL", codigoTelefonico: "+56" },
  { nombre: "Argentina", iso2: "AR", codigoTelefonico: "+54" },
  { nombre: "Espana", iso2: "ES", codigoTelefonico: "+34" },
  { nombre: "Otro", iso2: "OT", codigoTelefonico: null },
] as const;

const CITIES_BY_ISO2: Record<string, string[]> = {
  EC: [
    "Quito",
    "Guayaquil",
    "Cuenca",
    "Santo Domingo",
    "Machala",
    "Manta",
    "Ambato",
    "Loja",
    "Portoviejo",
    "Riobamba",
  ],
  PE: ["Lima"],
  CO: ["Bogota"],
  MX: ["Ciudad de Mexico"],
  CL: ["Santiago"],
  AR: ["Buenos Aires"],
  ES: ["Madrid"],
  OT: ["Otra ciudad"],
};

const LEAD_STATUSES = ["NUEVO", "EN_CONTACTO", "CERRADO"] as const;

type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export async function ensureLeadStatuses(db: PrismaCtx): Promise<void> {
  for (const statusName of LEAD_STATUSES) {
    await db.estadoSolicitudDemo.upsert({
      where: { nombre: statusName },
      update: {},
      create: { nombre: statusName },
    });
  }
}

export async function bootstrapDemoCatalogIfEmpty(db: PrismaCtx): Promise<void> {
  const countriesCount = await db.paisDemo.count();
  if (countriesCount > 0) return;

  for (const country of COUNTRIES) {
    await db.paisDemo.create({
      data: {
        nombre: country.nombre,
        iso2: country.iso2,
        codigoTelefonico: country.codigoTelefonico,
      },
    });
  }

  const countries = await db.paisDemo.findMany({
    select: { id: true, iso2: true },
  });
  const countryByIso2 = new Map(countries.map((item) => [item.iso2, item.id]));

  for (const [iso2, cityNames] of Object.entries(CITIES_BY_ISO2)) {
    const countryId = countryByIso2.get(iso2);
    if (!countryId) continue;

    for (const cityName of cityNames) {
      await db.ciudadDemo.upsert({
        where: {
          paisId_nombre: { paisId: countryId, nombre: cityName },
        },
        update: {},
        create: {
          paisId: countryId,
          nombre: cityName,
        },
      });
    }
  }
}
