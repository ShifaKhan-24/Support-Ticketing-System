# Stage 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy only package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's source code and build the app
COPY . .
RUN yarn build

# Stage 2: Production Stage
FROM node:18-alpine

# Install a simple static server to serve the built React app
RUN npm install -g serve

# Set working directory for final stage
WORKDIR /app

# Copy only the build output from the build stage
COPY --from=build /app/build ./build

# Serve the app
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000
