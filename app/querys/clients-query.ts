import { gql } from "@apollo/client";

export const GET_CLIENTS_BY_TOKEN = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    firstName
    lastName
    company
    email
    phone
    seller
  }
}
`;

export const GET_CLIENT_BY_ID = gql`
query getClientById($id: ID!) {
  getClientById(id: $id) {
    id
    firstName
    lastName
    email
    phone
    company
    seller
  }
}
`;

export const ADD_NEW_CLIENT = gql`
  mutation addClient($input: ClientInput!) {
    addClient(input: $input) {
      id
      firstName
      lastName
      company
      email
      phone
      seller
    }
  }
`;

export const CLIENTS_BY_SELLER = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    firstName
    lastName
    company
    email
    phone
  }
}
`;

export const EDIT_CLIENT_QUERY = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      firstName
      lastName
      company
      email
      phone
      seller
    }
  }
`;

export const DELETE_CLIENTS_QUERY = gql`
mutation deleteClient($id: ID!) {
  deleteClient(id: $id) 
}
`;
