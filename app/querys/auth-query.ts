import { gql } from "@apollo/client";

export const IS_VALID_TOKEN = gql`
  query isValidToken($token: String!) {
    isValidToken(token: $token)
  }
`;

export const AUTHENTICATE_QUERY = gql`
  mutation authenticate($input: AuthInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;

export const GET_USER_BY_TOKEN = gql`
query getUserByToken($token: String!) {
  getUserByToken(token: $token) {
    id
    firstName
    lastName
    email
    createdAt
  }
}
`;

export const NEW_ACCOUNT_QUERY = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`