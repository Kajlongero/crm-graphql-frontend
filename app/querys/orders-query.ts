import { gql } from "@apollo/client";

export const GET_ORDERS_BY_SELLER = gql`
query getOrdersBySeller {
  getOrdersBySeller {
    id
    order {
      id
      name
      price
      quantity
    }
    client {
      id 
      firstName
      lastName
      company 
      email
      phone
    }
    total
    status
    createdAt
  }
}
`

export const NEW_ORDER = gql`
mutation newOrder($input: OrderInput!) {
  newOrder(input: $input) {
    id
    order {
      id
      name
      price
      quantity
    }
    seller
    status
    total
  }
}
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
      status
    }
  }
`;

export const UPDATE_ORDER_BY_STATUS = gql`
mutation updateOrderByStatus($id: ID!, $status: OrderStatus!) {
  updateOrderByStatus(id: $id, status: $status) {
    status
  }
}
`;

export const DELETE_ORDER = gql`
mutation deleteOrder($id: ID!) {
  deleteOrder(id: $id)
}
`
