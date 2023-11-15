FROM node:18 as base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./.swcrc ./
COPY prisma/ ./prisma/
COPY src ./src

RUN mkdir public
RUN mkdir public/images
RUN chmod 777 public
RUN chmod 777 public/images

RUN npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

ENV NODE_ENV production

EXPOSE 3000

CMD ["pnpm", "run", "start"]
