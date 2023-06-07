import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
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
    errorLogger.error(error);
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

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
