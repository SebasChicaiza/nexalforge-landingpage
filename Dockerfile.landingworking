# ---------- DEPS ----------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat bash wget openssl
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- BUILD ----------
FROM node:20-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache bash wget openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY prisma ./prisma
RUN npx --yes prisma generate
RUN npx --yes next telemetry disable || true
RUN npm run build

# ---------- RUNTIME ----------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
RUN apk add --no-cache bash wget openssl

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

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
