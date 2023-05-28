import mongoose from 'mongoose';
import config from './config';
import { app } from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () =>
      console.log(`App listening to port ${config.port}`)
    );
    console.log(`DB connected successfully`);
  } catch (err: unknown) {
    console.log(`Failed to connect to db: ${err}`);
  }
}

main();
