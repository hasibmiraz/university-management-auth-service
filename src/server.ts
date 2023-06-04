/* eslint-disable no-console */
import mongoose from 'mongoose';
import { app } from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () =>
      logger.info(`App listening to port ${config.port}`)
    );
    logger.info(`DB connected successfully`);
  } catch (err: unknown) {
    errorLogger.error(`Failed to connect to db: ${err}`);
  }
}

main();
