FROM node:22-alpine

WORKDIR /workspace

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable && pnpm config set store-dir /pnpm/store && pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "pnpm config set store-dir /pnpm/store && pnpm install --frozen-lockfile && pnpm dev"]
