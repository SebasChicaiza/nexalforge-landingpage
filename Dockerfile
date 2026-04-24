# ---------- DEPS ----------
FROM node:20-alpine AS deps
# Toolchain para compilar bcrypt en Alpine (musl)
RUN apk add --no-cache libc6-compat bash wget openssl python3 make g++
WORKDIR /app
RUN corepack enable

# Instala deps + devDeps (incluye @types/bcrypt para el build de TS)
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- BUILD ----------
FROM node:20-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache bash wget openssl
RUN corepack enable

# Reutiliza node_modules (incluye devDeps necesarios para el build)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY . .

# Genera Prisma Client y compila Next en modo standalone
RUN npx --yes prisma generate
RUN npx --yes next telemetry disable || true
RUN npm run build

# ---------- RUNTIME ----------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
RUN apk add --no-cache bash wget openssl
RUN corepack enable

# Prisma schema (para migrate deploy)
COPY --from=builder /app/prisma ./prisma
# Mantener node_modules simplifica Prisma en runtime y npx prisma
COPY --from=builder /app/node_modules ./node_modules

# Artefactos de Next
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Entrypoint
RUN printf '%s\n' \
  '#!/bin/sh' \
  'set -e' \
  'if [ "${MIGRATE_ON_START:-true}" = "true" ]; then' \
  '  echo "[prisma] migrate deploy"; npx prisma migrate deploy; fi' \
  'if [ -f "./server.js" ]; then' \
  '  echo "[start] usando ./server.js (standalone root)"; exec node ./server.js; fi' \
  'if [ -f "./.next/standalone/server.js" ]; then' \
  '  echo "[start] usando ./.next/standalone/server.js"; exec node ./.next/standalone/server.js; fi' \
  'echo "[start] usando next start (fallback)";' \
  'exec node node_modules/next/dist/bin/next start -p "${PORT:-3000}"' \
  > /app/start.sh && chmod +x /app/start.sh

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["/app/start.sh"]
