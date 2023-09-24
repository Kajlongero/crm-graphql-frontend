import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
query getAllProducts {
  getAllProducts {
    id
    name
    price
    stock
    createdAt
  }
}
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
query getProductById($id: ID!) {
  getProductById(id: $id) {
    id
    name
    price
    stock
    createdAt
  }
}
`

export const NEW_PRODUCT_QUERY = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      stock
      createdAt
    }
  }
`;

export const EDIT_PRODUCT_QUERY = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
      createdAt
    }
  }
`;

export const DELETE_PRODUCT_QUERY = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`
