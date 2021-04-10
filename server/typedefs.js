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

  type ActivityType {
    id: ID!
    name: String!
  }

  type Activity {
    id: ID!
    user: User!
    type: ActivityType!
    duration: Int!
    comment: String
  }

  type Mutation {
    createUser(username: String!, password: String!): User

    loginUser(username: String!, password: String!): Token

    createActivity(type: String!, duration: Int!, comment: String): Activity
  }

  type Query {
    me: User

    getActivities: [Activity]!

    getActivityTypes: [ActivityType]!
  }

  type Subscription {
    activityAdded: Activity
  }
`

module.exports = typeDefs
