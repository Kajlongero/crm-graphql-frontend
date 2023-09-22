import { useReducer } from "react";
import { Client } from "../interfaces/client-interface";
import { orderReducer, orderReducerInitialState } from "../reducers/order-reducer";

export const useOrder = () => {

  const [orderState, payload] = useReducer(orderReducer, orderReducerInitialState);

  const assignClient = (client: Client) => {
    payload({ type: 'SELECT_CLIENT', payload: client });
  }
  
  return {
    orderState,
    assignClient,
  };
}