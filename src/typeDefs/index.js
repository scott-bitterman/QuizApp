import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    id: ID!
    email: String!
  }
  input UserInput {
      email: String!
      password: String!
  }
  type Answer {
      text: String!
      correct: Boolean
  }
  input AnswerInput {
      text: String!
      correct: Boolean
  }
  type Quiz {
      id: ID!
      question: String!
      answers: [Answer!]!
  }
  input QuizInput {
      id: ID
      question: String!
      answers: [AnswerInput!]!
  }

  type Query {
      "Health Check"
      hello: String!
      quizFind(input: ID): [Quiz!]!
  }
  type Mutation {
      authenticate(input: UserInput): String
      userCreate(input: UserInput): User

      quizCreate(input: QuizInput): String
      quizDelete(input: ID): String
      quizUpdate(input: QuizInput): String
  }
`);
