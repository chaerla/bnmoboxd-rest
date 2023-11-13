FROM node:18 as base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./.swcrc ./
COPY prisma/ ./prisma/

RUN npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

COPY dist ./dist

ENV NODE_ENV production

EXPOSE 3000


CMD ["node", "./dist/server.js"]
