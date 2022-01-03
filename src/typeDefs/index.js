const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Answer {
    text: String!
    correct: Boolean
  }
  input AnswerInput {
    text: String!
    correct: Boolean
  }

  type User {
    id: ID!
    email: String!
  }
  input UserInput {
    email: String!
    password: String!
  }

  type Question {
    text: String!
    answers: [Answer!]!
  }
  input QuestionInput {
    text: String!
    answers: [AnswerInput!]!
  }

  type Quiz {
    id: ID!
    name: String!
    questions: [Question!]!
  }
  input QuizInput {
    id: ID
    name: String!
    questions: [QuestionInput!]!
  }

  type Query {
    hi: String!
    quizFind(input: ID): [Quiz!]!
  }

  type Mutation {
    authenticate(input: UserInput): String
    userCreate(input: UserInput): String
    userDelete(input: ID): String
    userUpdate(input: UserInput): String

    quizCreate(input: QuizInput): String
    quizDelete(input: ID): String
    quizUpdate(input: QuizInput): String
  }
`);
