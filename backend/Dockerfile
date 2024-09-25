# Dockerfile for Node.js backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy everything from the 'backend' folder to /app in the container
COPY ./backend/ .

# Install dependencies (production only)
RUN yarn install --production

# Command to run the application (pointing to server.js)
CMD ["node", "server.js"]

# Expose the application port
EXPOSE 3001
