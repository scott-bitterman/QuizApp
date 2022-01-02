import express from 'express';

// GraphQL server-side package trends:
// https://www.npmtrends.com/apollo-server-vs-express-graphql-vs-graphql-yoga-vs-prisma-vs-apollo-server-express
import { graphqlHTTP } from 'express-graphql'; // Alternately use Apollo-Server
import schema from './typeDefs/index.js'; 

// The rootValue provides a resolver function for every possible API call
import rootValue from './resolvers/index.js'; 

const app = express();
const middleware = (req, res, next) => {
  // console.log(req.headers);
  next();
};

app.use(middleware);
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

