# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) first for caching
COPY ./backend/package*.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy everything from the 'backend' folder to /app in the container
COPY ./backend/ .
RUN rm -rf node_modules  # In case it still gets copied accidentally

# Expose the application port
EXPOSE 3001

# Command to run the application (pointing to server.js)
CMD ["node", "server.js"]
