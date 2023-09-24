import { useReducer } from "react";
import { Client } from "../interfaces/client-interface";
import { orderReducer, orderReducerInitialState } from "../reducers/order-reducer";
import { Product, ProductOrder } from "../interfaces/product-interface";

export const useOrder = () => {

  const [orderState, dispatch] = useReducer(orderReducer, orderReducerInitialState);

  const assignClient = (client: Client) => {
    dispatch({ type: 'SELECT_CLIENT', payload: client });
  }

  const addOrRemoveProducts = (products: ProductOrder[]) => {  
    const oldCopy = [...orderState.products];

    // if products is major than the oldCopy, we need to add to the oldCopy the last product of the new products array, to maintain the state correctly  
    if(oldCopy.length < products.length) {
      oldCopy.push(products[products.length - 1]);

      calculateTotal(oldCopy);
      dispatch({ type: 'ADD_OR_REMOVE_PRODUCT', payload: oldCopy });
    }

    // if oldCopy is major than the new products, then we need to remove from the oldCopy and dispatch the oldCopy again to maintain the state without any changes 
    if(oldCopy.length > products.length) {
      let index = 0;

      oldCopy.forEach((p, ind) => {
        if(!products.some(pr => pr.id === p.id)) 
          index = ind;
      });
      oldCopy.splice(index, 1);

      calculateTotal(oldCopy);
      dispatch({ type: 'ADD_OR_REMOVE_PRODUCT', payload: oldCopy})
    }
  }
  
  const calculateTotal = (products: ProductOrder[]) => {
    let total = 0;

    products.forEach(({ price, quantity }) => {
      !isNaN(quantity) ? (total += price * quantity) : (total += price * 0);
    });

    dispatch({ type: 'SET_TOTAL', payload: total });
  }

  const assignQuantity = (product: ProductOrder, quantity: string | number) => {
    const ifProductIsNaN = isNaN(parseInt(quantity as string)) ? 0 : parseInt(quantity as string);

    const index = orderState.products.findIndex((p) => p.id === product.id);
    const productFound = orderState.products[index];

    const productModified: ProductOrder = {...productFound, quantity: ifProductIsNaN};
    const newProducts = [...orderState.products];

    newProducts.splice(index, 1, productModified);
  
    dispatch({ type: 'ADD_OR_REMOVE_PRODUCT', payload: newProducts });
    calculateTotal(newProducts);
  }

  const refreshOrderState = () => {
    dispatch({ type: 'REFRESH_ORDER_STATE' });
  }
   
  return {
    orderState,
    assignClient,
    addOrRemoveProducts,
    assignQuantity,
    refreshOrderState,
  };
}