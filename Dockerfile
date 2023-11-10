# Use an official Node.js runtime as the base image
FROM node:18 as base

# Set the working directory in the container
WORKDIR /app

# Copy your application files to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Add files
COPY tsconfig.json ./tsconfig.json
COPY .swcrc ./.swcrc
COPY prisma/ ./prisma/

RUN npm install
RUN npx prisma generate
# Copy the built code to the container
COPY dist ./dist

# Set the production environment variable
ENV ENV production

# Define the command to start your application
CMD ["node", "./dist/server.js"]
