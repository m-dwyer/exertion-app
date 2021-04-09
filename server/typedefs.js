const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Activity {
    id: ID!
    user: User!
    type: String!
    duration: Int!
  }

  type Mutation {
    createUser(username: String!, password: String!): User

    loginUser(username: String!, password: String!): Token

    createActivity(type: String!, duration: Int!): Activity
  }

  type Query {
    me: User

    getActivities: [Activity]!
  }

  type Subscription {
    activityAdded: Activity
  }
`

module.exports = typeDefs
