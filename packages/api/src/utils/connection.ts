import mongoose from 'mongoose';
import logger from './logger';
import './cache/injectCache';

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
});

mongoose.Promise = global.Promise;

logger.info('Initializing Connection...');

const db = mongoose.connection;
db.on('error', (e) => logger.error(e));
db.once('open', () => logger.info('Connected to the database!'));

export default db;
