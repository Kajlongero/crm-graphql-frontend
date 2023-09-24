import { Client } from "../interfaces/client-interface"
import { OrderReducerInitialState } from "../interfaces/order-context-interface";
import { ProductOrder } from "../interfaces/product-interface";

export const orderReducerInitialState: OrderReducerInitialState = {
  client: {} as Client,
  products: [],
  total: 0,
}

type OrderReducerActionTypes = |
{ type: 'SELECT_CLIENT', payload: Client } | 
{ type: 'ADD_OR_REMOVE_PRODUCT', payload: ProductOrder[] } |
{ type: 'SET_TOTAL', payload: number } |
{ type: 'REFRESH_ORDER_STATE' };

const orderReducer = (state: typeof orderReducerInitialState, action: OrderReducerActionTypes): OrderReducerInitialState => {
  switch(action.type) {
    case 'SELECT_CLIENT': 

      return {
        ...state,
        client: action.payload,
      };

    case 'ADD_OR_REMOVE_PRODUCT': 
      return {
        ...state,
        products: [...action.payload]
      };

    case 'SET_TOTAL': 
      return {
        ...state,
        total: action.payload,
      }

    case 'REFRESH_ORDER_STATE': 
      return {
        ...state,
      }

    default: 
      return state;
  }
}

export { orderReducer };