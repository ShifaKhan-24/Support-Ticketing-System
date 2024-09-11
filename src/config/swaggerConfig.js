// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Support System',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API base URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes,
  
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecs;
