import path from 'path';
import SwaggerParser from 'swagger-parser';
import yamljs from 'yamljs';

import routes from './routes';

// load YAML swagger file
// const document = yamljs.load(path.resolve(__dirname, './swagger/swagger.yml'));

// validate document
/*
SwaggerParser.validate(document, (err) => {
  if (err) {
    throw Error('./swagger.yml does not conform to the Swagger 3.0 schema');
  }
});
*/
export default {
  // swaggerConfig: document,
  routes,
  basePath: `/${__dirname.split(path.sep).pop()}`,
};
