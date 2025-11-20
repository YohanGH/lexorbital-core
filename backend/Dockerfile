FROM node:20-alpine

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source code (will be overridden by volume in dev)
COPY . .

EXPOSE 4000

# For development, use tsx watch (override in docker-compose if needed)
CMD ["pnpm", "dev"]
