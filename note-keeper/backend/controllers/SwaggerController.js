const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

class SwaggerController {
  constructor(app) {
    const swaggerDocument = YAML.load(path.join(__dirname, '../../openapi.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

module.exports = SwaggerController;
