const express = require('express');
const expressJwt = require('express-jwt');
const CONSTANTS = require('./constants');
const { graphqlHTTP } = require('express-graphql'); // Alternately use Apollo-Server
const schema = require('./typeDefs/index.js'); 

// The rootValue provides a resolver function for every API call
const rootValue = require('./resolvers/index.js'); 
const pathsNotRequiringAJWT = ['/graphql/authenticate'];

const app = express();
app.use(express.json());

// Build GraphQL
app.use('/graphql',
  expressJwt({ secret: CONSTANTS.jwt.secret, algorithms: ['HS256'] }).unless({path: pathsNotRequiringAJWT}),
  (_req, _res, next) => next()
);

// Build GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

