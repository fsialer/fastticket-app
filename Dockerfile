# Multi-stage build
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application for production
RUN npm run build -- --output-path=dist

# Production stage
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app directly to nginx html directory
COPY --from=build /app/dist/browser /usr/share/nginx/html/

# Create assets directory and copy config template
RUN mkdir -p /usr/share/nginx/html/assets
COPY config.template.js /usr/share/nginx/html/assets/

# Create entrypoint script for dynamic config
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "API_URL value: $API_URL"' >> /docker-entrypoint.sh && \
    echo 'export API_URL=${API_URL:-http://localhost:8080/v1}' >> /docker-entrypoint.sh && \
    echo 'echo "Generating config.js with API_URL: $API_URL"' >> /docker-entrypoint.sh && \
    echo 'envsubst < /usr/share/nginx/html/assets/config.template.js > /usr/share/nginx/html/assets/config.js' >> /docker-entrypoint.sh && \
    echo 'echo "Generated config.js content:"' >> /docker-entrypoint.sh && \
    echo 'cat /usr/share/nginx/html/assets/config.js' >> /docker-entrypoint.sh && \
    echo 'ls -la /usr/share/nginx/html/assets/' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Run nginx
ENTRYPOINT ["/docker-entrypoint.sh"]