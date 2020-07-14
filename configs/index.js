import dotenv from 'dotenv';
import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

const log = log4js.getLogger('config');

log.info('loading env configuration files');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if (process.env.npm_lifecycle_event === 'dev') {
  dotenv.config({ silent: true });
}

const envFile = path.resolve(
  process.cwd(),
  `configs/config.${process.env.NODE_ENV}.json`
);
if (fs.existsSync(envFile)) {
  const configString = fs.readFileSync(envFile, {
    encoding: 'utf8',
  });

  try {
    const envConfig = JSON.parse(configString);
    Object.entries(envConfig).forEach(([key, value]) => {
      process.env[key] = process.env[key] || value;
    });
    log.info(`Loaded config file: ${envFile}`);
  } catch (err) {
    log.error(err);
  }
} else {
  log.info(`Couldn't find file: ${envFile}`);
}

const requiredVars = ['NODE_ENV', 'MONGO_URI', 'MONGO_DBNAME'];

const missingVars = requiredVars.filter(
  (required) =>
    process.env[required] === undefined || process.env[required] === null
);

if (missingVars.length > 0) {
  const missingVarsText = missingVars.join(', ');
  log.error(`${missingVarsText} not found in environment variables.`);
  throw new Error(`${missingVarsText} not found in environment variables.`);
}

log.info('env configuration files loaded successfully');
