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
  mutation createActivity($type: String!, $duration: Int!) {
    createActivity(type: $type, duration: $duration) {
      type
      duration
    }
  }
`
