## TrustLayer Coding Challenge

The TrustLayer Coding Challenge asks that a small project be built that stores quizzes and users in a persistent datastore. This datastore will allow Create, Read, Update, and Delete (CRUD) operations by an authenticated and authorized user. CRUD operations must be performed via an API with a REST or GraphQL interface. These are the broad strokes.

## Tech Stack
Component         | Implementation   | 
------------------|------------------|
Datastore | MongoDB - live instance   |
Security | Bcrypt, JasonWebToken (JWT)  |
API | Express, GraphQL  |
Test | Jest  |


## Setup
There is one modification that must be made for the project to work. Because the MongoDB instance is live, a password is required.

From the root:

1. Rename ```src/constants.example.js``` to ```src/constants.js```  
2. Supply the MongoDB password, which I can provide.
3. ```$ npm install```
4. ```$ npm start```

## Use
Once the app starts on your local machine, a GraphQL endpoint is available for testing at ```http://localhost:4000/graphql```.

1. Authenticate ```http://localhost:4000/graphql/authenticate``` returns a JWT that must be passed in the HTTP request ```Authorization``` header as ```Bearer {JWT}``` for all subsequent calls to ```http://localhost:4000/graphql```. There should be a user with the following credentials: ```{email: "firstUser@tl.com", password: "firstUser"}```
2. Run CRUD operations however you want.

## Testing
```
$ npm test
```

## Security
1. You must be authenticated to make any successful call to ```http://localhost:4000/graphql```.
2. You should only be able to perform CRUD operations on a quiz, if you are the creator of the quiz. 



[![Coverage Status](https://github.com/taciturnip/TrustLayer/workflows/Node.js%20CI/badge.svg)](https://github.com/taciturnip/TrustLayer/actions/workflows/node.js.yml)

