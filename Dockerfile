# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Build argument for environment
ARG BUILD_CONFIGURATION=production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the Angular application with specified configuration
RUN npm run env && npx ng build --configuration ${BUILD_CONFIGURATION}

# Production stage
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
