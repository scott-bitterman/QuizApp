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
  input UserUpdateInput {
    id: ID!
    email: String
    password: String
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
    createdBy: String!
  }
  input QuizInput {
    id: ID
    name: String!
    questions: [QuestionInput!]!
  }
  input QuizUpdateInput {
    id: ID!
    name: String
    questions: [QuestionInput!]
  }

  type Query {
    hi: String!
    quizFind(input: ID): [Quiz!]!
    userFind(input: ID): [User!]!
  }

  type Mutation {
    authenticate(input: UserInput): String
    userCreate(input: UserInput): String
    userDelete(input: ID): String
    userUpdate(input: UserUpdateInput): String

    quizCreate(input: QuizInput): String
    quizDelete(input: ID): String
    quizUpdate(input: QuizUpdateInput): String
  }
`);
