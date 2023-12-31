FROM node:18 as base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./.swcrc ./
COPY prisma/ ./prisma/
COPY src ./src

RUN mkdir -p public/images
RUN chmod -R 755 public

RUN npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

ENV NODE_ENV production

EXPOSE 3000

CMD ["pnpm", "run", "start"]
