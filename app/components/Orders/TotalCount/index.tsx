'use client';
import { useContext } from "react";
import { OrderContext } from "@/app/context/OrderContext";

export default function TotalCount() {

  const { orderState: { total } } = useContext(OrderContext);

  return (
    <div className="flex items-center mt-5 my-2 bg-white text-gray-700 p-2 font-bold gap-2">
      <h2 className="text-gray-800 text-lg">Total payment: </h2>
      <p className="text-gray-800 mt-0">${total}</p>
    </div>
  )
}