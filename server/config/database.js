import { MongoMemoryServer } from 'mongodb-memory-server';
import log4js from 'log4js';
import mongoose from 'mongoose';

const log = log4js.getLogger('database');

async function connectWithRetry() {
  mongoose.set('useFindAndModify', false);
  mongoose.Promise = require('bluebird');
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    auto_reconnect: true,
    bufferMaxEntries: 0,
  });
}

async function connectMock() {
  const mongoServer = new MongoMemoryServer();
  const mongoURI = await mongoServer.getUri();
  mongoose.set('useFindAndModify', false);
  mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    auto_reconnect: true,
    bufferMaxEntries: 0,
    reconnectInterval: 500, // Reconnect every 500ms
  });
}

if (process.env.NODE_ENV === 'test') {
  connectMock();
} else {
  connectWithRetry();
}

mongoose.connection.on('connected', () => {
  log.info(`Mongoose connection open to ${process.env.MONGO_URI}`);
});

mongoose.connection.on('error', (error) => {
  log.error(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  log.info('Mongoose connection disconnected');
});

mongoose.connection.on('reconnected', () => {
  log.info('Reconnected to MongoDB Server');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.info('Force to close the MongoDB conection');
    process.exit(0);
  });
});

export default mongoose;
