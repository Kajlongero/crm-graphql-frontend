import { Client } from "./client-interface";

export interface MakeOrder {
  client: string;
  order: OrderProducts[],
  total: number;
  status: OrderStatus;
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export type OrderProducts = {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: string;
  order: OrderProducts[],
  client: Client;
  seller: string;
  status: OrderStatus;
  total: number
}