// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Car shop',
    description: 'Projeto back-end de criação de APIs REST para uma concessionário de veículos',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);