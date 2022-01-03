const express = require('express');

// GraphQL server-side package trends:
// https://www.npmtrends.com/apollo-server-vs-express-graphql-vs-graphql-yoga-vs-prisma-vs-apollo-server-express
const { graphqlHTTP } = require('express-graphql'); // Alternately use Apollo-Server
const schema = require('./typeDefs/index.js'); 

// The rootValue provides a resolver function for every possible API call
const rootValue = require('./resolvers/index.js'); 

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

