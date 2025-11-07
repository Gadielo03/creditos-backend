# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only dependency manifests first (for caching)
COPY package*.json ./

# Remove old cache and node_modules before install
RUN rm -rf /root/.npm /root/.cache /usr/src/app/node_modules && \
    npm cache clean --force && \
    npm install --prefer-offline --no-audit --no-fund

# Copy source code
COPY . .

ARG CACHEBUST=1
# Clean dist before building
RUN rm -rf dist && npm run build

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "dist/app.js"]
