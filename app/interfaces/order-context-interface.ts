import { Client } from "./client-interface";
import { ProductOrder } from "./product-interface";

export interface OrderContextInterface {
  orderState: OrderReducerInitialState;
  assignClient: (client: Client) => void;
  addOrRemoveProducts: (products: ProductOrder[]) => void;
  assignQuantity: (product: ProductOrder, quantity: number | string) => void;
  refreshOrderState: () => void;
}

export interface OrderReducerInitialState {
  client: Client;
  products: ProductOrder[]
  total: number;
}