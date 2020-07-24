import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gqlMiddleware } from './gql';
import { logger } from './utils';

const app = express();

app.get('/', (req, res) => res.json({ hello: 'world' }));
app.use(cors());
app.use(bodyParser.json());

logger.debug(`GraphQL path: ${gqlMiddleware.graphqlPath}`);
gqlMiddleware.applyMiddleware({ app });

export default app;
