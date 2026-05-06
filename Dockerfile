# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy prisma schema BEFORE npm ci
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npm run prisma:generate

# Copy application
COPY src ./src

EXPOSE 5000

# Run migrations and start server
CMD ["sh", "-c", "npm run prisma:migrate && npm start"]
