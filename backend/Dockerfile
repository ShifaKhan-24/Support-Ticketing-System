# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json (if available) first for caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy everything from the 'backend' folder to the working directory in the container
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application (pointing to server.js)
CMD ["node", "server.js"]
