## TrustLayer Coding Challenge

The TrustLayer Coding Challenge asks that a small project be built that stores quizzes and users in a persistent datastore. This datastore will allow Create, Read, Update, and Delete (CRUD) operations by an authenticated and authorized user. CRUD operations must be performed via an API with a REST or GraphQL interface. These are the broad strokes.

## Tech Stack
Component         | Implementation   | 
------------------|------------------|
Datastore | MongoDB - live instance   |
Security | Bcrypt, JWT  |
API | Express, GraphQL  |
Test | Jest  |


## Setup
There is one modification that must be made for the project to work. Because the MongoDB instance is live, a password is required for the connection to work.

From the root:

1. Rename ```src/constants.example.js``` to ```src/constants.js```  
2.  Contact me to get the MongoDB password to test. 
3. ```$ npm install```
4. ```$ npm start```

## Testing
```
$ npm test
```

## Security



[![Coverage Status](https://github.com/taciturnip/TrustLayer/workflows/Node.js%20CI/badge.svg)](https://github.com/taciturnip/TrustLayer/actions/workflows/node.js.yml)

