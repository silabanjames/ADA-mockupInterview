# ---- Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
COPY openapi.yaml ./
RUN npm run prisma:generate
RUN npm run build

# ---- Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install runtime dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled app and Prisma artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/openapi.yaml ./dist/
# COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

COPY prisma.config.js ./
# COPY prisma/seed.js ./prisma/

# Expose port and start app
EXPOSE 3000
CMD ["node", "dist/src/index.js"]