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