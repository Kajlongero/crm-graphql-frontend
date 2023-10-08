import { Client } from "./client-interface";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface BestSellers {
  seller: User[];
  total: number;
}

export interface BestClients {
  client: Client[];
  total: number;
} 