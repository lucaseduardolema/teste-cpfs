const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Test Max Milhas',
    description: 'Esta documentação é destinada ao test da Max Milhas',
  },
  host: 'localhost:3001',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Cpf',
      description: 'Endpoitns',
    },
  ],
  definitions: {
    Cpf: {
      $cpf: '73289612015',
    },
    ExistsCpfException: {
      message: 'Cpf already exists',
    },
    InvalidCpfExeception: {
      message: 'CPF is not valid',
    },
    NotFoundCpfException: {
      message: 'CPF is not found',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './dist/src/controllers/CpfController.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./dist/src/App.js');
});
