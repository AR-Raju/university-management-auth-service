import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`Appliication listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', err => {
    logger.info(
      'Unhandled Rejection is detected, we are closing our server....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

startServer();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
