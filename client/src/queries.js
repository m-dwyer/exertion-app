import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`

export const CREATE_ACTIVITY_MUTATION = gql`
  mutation createActivity($type: String!, $duration: Int!, $comment: String) {
    createActivity(type: $type, duration: $duration, comment: $comment) {
      type {
        name
      }
      duration
      comment
    }
  }
`

export const GET_ACTIVITIES = gql`
  query getActivities {
    getActivities {
      id
      type {
        name
      }
      duration
      comment
      user {
        username
      }
    }
  }
`

export const GET_ACTIVITY_TYPES = gql`
  query getActivityTypes {
    getActivityTypes {
      name
    }
  }
`

export const ACTIVITY_ADDED_SUBSCRIPTION = gql`
  subscription activityAdded {
    activityAdded {
      type {
        name
      }
      duration
      comment
      user {
        username
      }
    }
  }
`
