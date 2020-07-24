import { ApolloServer } from 'apollo-server-express';
import schema from './schemas';

export default new ApolloServer({
  schema,
});
