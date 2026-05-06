FROM node:18-alpine

WORKDIR /app

# Install OpenSSL (VERY IMPORTANT for Prisma)
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy full app
COPY . .

# Expose port
EXPOSE 5000

# Run migrations + start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]