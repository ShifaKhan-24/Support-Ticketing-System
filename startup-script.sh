#!/bin/bash

# Navigate to the frontend directory and install dependencies
cd frontend
npm install

# Build the React app
npm run build

# Navigate back to the root and then to the backend directory
cd ../backend

# Install backend dependencies
npm install

# Start the Node.js server
npm start
