import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './typeDefs/index.js'; // The rootValue provides a resolver function for each API endpoint
import rootValue from './resolvers/index.js';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
