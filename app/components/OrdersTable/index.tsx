'use client';
import { useQuery } from "@apollo/client";
import { OrderResponse, OrderStatus } from "@/app/interfaces/order-interface";
import { GET_ORDERS_BY_SELLER } from "@/app/querys/orders-query";
import OrdersTableData from "../OrdersTableData";

export default function OrdersTable() {
  
  const { data, loading } = useQuery(GET_ORDERS_BY_SELLER);

  if(loading) return (
    <div>Loading...</div>
  )

  const setBorderColor = (status: OrderStatus) => {
    if(status === 'COMPLETED') return 'border-green-500';
    if(status === 'PENDING') return 'border-yellow-500';
    if(status === 'CANCELLED') return 'border-red-800';
  }

  return (
    <>
      {data.getOrdersBySeller.length ? 
        data.getOrdersBySeller.map((data: OrderResponse, ind: number) => (
          <OrdersTableData key={`order-id-${ind}`} data={data} />
        ))
        : (
          <></>
        )
      }
    </>
  )
}