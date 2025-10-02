/* prisma/seed.ts */
/* eslint-disable no-console */
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const Env = z.object({
  SEED_ADMIN_EMAIL: z.string().email(),
  SEED_ADMIN_NAME: z.string().min(1),
  SEED_ADMIN_PASSWORD: z.string().min(8),
  SEED_BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
});
const env = Env.parse(process.env);

async function main(): Promise<void> {
  // 1) Role "Admin" (tal como lo chequeas en hasRole(user, "Admin"))
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'Admin' },
    update: {},
    create: { nombre: 'Admin' },
  });

  // 2) Hash con bcrypt
  const hash = await bcrypt.hash(env.SEED_ADMIN_PASSWORD, env.SEED_BCRYPT_ROUNDS);

  // 3) Usuario admin (upsert por correo)
  const user = await prisma.usuario.upsert({
    where: { correo: env.SEED_ADMIN_EMAIL },
    update: { password: hash, activo: true, nombre: env.SEED_ADMIN_NAME },
    create: {
      correo: env.SEED_ADMIN_EMAIL,
      password: hash,
      nombre: env.SEED_ADMIN_NAME,
      activo: true,
    },
  });

  // 4) Vincular rol (tabla puente compuesta)
  await prisma.usuarioRol.upsert({
    where: { usuarioId_rolId: { usuarioId: user.id, rolId: rolAdmin.id } },
    update: {},
    create: { usuarioId: user.id, rolId: rolAdmin.id },
  });

  console.log('✅ Seed OK:', { user: user.correo, rol: rolAdmin.nombre });
}

main()
  .catch((e: unknown) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error:', e.code, e.message);
    } else {
      console.error(e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
