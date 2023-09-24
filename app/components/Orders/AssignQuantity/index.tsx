'use client';
import { useContext } from "react";
import { OrderContext } from "@/app/context/OrderContext";
import ProductSummary from "../ProductSummary";

export default function AssignQuantity () {

  const { orderState: { products } } = useContext(OrderContext);

  return (
    <>
      <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>Select product quantity</p>
      {products.length > 0 ? (
        <>
          {products.map((p) => (
            <ProductSummary product={p} key={p.id} />
          ))}
        </>
      ) : (
        <p>No products</p>
      )}
    </>
  )
}