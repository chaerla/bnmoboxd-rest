# Use an official Node.js runtime as the base image
FROM node:18 as base

# Set the working directory in the container
WORKDIR /app

# Copy your application files to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Add files
COPY tsconfig.json ./tsconfig.json
COPY .swcrc ./.swcrc
COPY src ./src

# Generate prisma client
RUN npx prisma generate

# Build dist
RUN pnpm run build:tsc

# Copy the built code to the container
COPY dist ./dist

# Set the production environment variable
ENV ENV production

# Define the command to start your application
CMD ["node", "./dist/server.js"]
