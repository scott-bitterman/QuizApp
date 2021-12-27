import { buildSchema } from 'graphql';

export default buildSchema(`
    type User {
        id: ID!
        email: String!
    }
    type Quiz {
        id: ID!
        createdBy: User!
    }
    input UserInput {
        email: String!
        password: String!
    }
    type Query {
        hello: String!
    }
    type Mutation {
        authenticate: String
        userCreate(input: UserInput): User
    }
`);
