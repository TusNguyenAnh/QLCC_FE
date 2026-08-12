# syntax=docker/dockerfile:1
# Build stage
# tai version node 20
FROM node:20-alpine AS builder
#thu muc lam viec trong container
WORKDIR /app

# Copy package files tu host vao container
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the application
RUN npm run build:skip-typecheck || vite build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
