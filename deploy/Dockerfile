FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy project files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Command to run development server
CMD ["pnpm", "dev", "--host"]