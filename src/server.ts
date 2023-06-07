/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', () => {
  console.log(`Uncaught exception detected. Closing the server...`);
  process.exit(1);
});

async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () =>
      logger.info(`App listening to port ${config.port}`)
    );
    logger.info(`DB connected successfully`);
  } catch (err: unknown) {
    errorLogger.error(`Failed to connect to db: ${err}`);
  }

  process.on('unhandledRejection', error => {
    console.log(`Unhandled rejection. Closing the server...`);
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    }
    process.exit(1);
  });
}

main();
