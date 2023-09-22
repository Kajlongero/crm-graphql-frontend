import { Client } from "./client-interface";
import { Product } from "./product-interface";

export interface OrderContextInterface {
  orderState: OrderReducerInitialState;
  assignClient: (client: Client) => void;
}

export interface OrderReducerInitialState {
  client: Client;
  products: Product[]
  total: number;
}