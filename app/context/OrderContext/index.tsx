'use client';
import { createContext } from "react";
import { OrderContextInterface } from "@/app/interfaces/order-context-interface";
import { useOrder } from "@/app/hooks/useOrder";

export const OrderContext = createContext({} as OrderContextInterface);

type Children = { children: React.ReactNode }

export default function OrderContextProvider ({ children }: Children) {

  const { 
    orderState, 
    assignClient, 
    addOrRemoveProducts,
    assignQuantity,
    refreshOrderState,
  } = useOrder();

  return (
    <OrderContext.Provider value={{
      orderState,
      assignClient,
      addOrRemoveProducts,
      assignQuantity,
      refreshOrderState,
    }}>
      {children}
    </OrderContext.Provider>
  )
} 