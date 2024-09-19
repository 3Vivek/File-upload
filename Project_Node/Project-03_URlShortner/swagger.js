const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Short URL API',
    version: '1.0.0',
    description: 'A simple API for creating and managing short URLs',
  },
  servers: [
    {
      url: 'http://localhost:8001',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./Routes/*.js'], // Update this path according to your project structure
};

module.exports = swaggerJSDoc(options);