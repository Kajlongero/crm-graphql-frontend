import { Client } from "../interfaces/client-interface"
import { OrderReducerInitialState } from "../interfaces/order-context-interface";
import { Product } from "../interfaces/product-interface";

export const orderReducerInitialState: OrderReducerInitialState = {
  client: {} as Client,
  products: [],
  total: 0,
}

type OrderReducerActionTypes = |
{ type: 'SELECT_CLIENT', payload: Client } | 
{ type: 'SELECT_PRODUCT', payload: Product }

const orderReducer = (state: typeof orderReducerInitialState, action: OrderReducerActionTypes): OrderReducerInitialState => {
  switch(action.type) {
    case 'SELECT_CLIENT': 

      return {
        ...state,
        client: action.payload,
      };

    case 'SELECT_PRODUCT': 

      return {
        ...state
      };

    default: 
      return state;
  }
}

export { orderReducer };