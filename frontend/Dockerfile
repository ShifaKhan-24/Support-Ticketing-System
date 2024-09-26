# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) first for caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm build

RUN npm install --production

# Copy everything except the node_modules folder
COPY . ./
RUN rm -rf node_modules  # In case it still gets copied accidentally

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
