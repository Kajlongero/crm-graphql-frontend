'use client';
import { useContext } from "react";
import { OrderContext } from "@/app/context/OrderContext";
import { ProductOrder } from "@/app/interfaces/product-interface";

type Props = {
  product: ProductOrder;
}

export default function ProductSummary ({ product }: Props) {

  const { assignQuantity } = useContext(OrderContext);

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-1/2 mb-2 md:mb-0">
        <p className="text-sm">{product.name}</p>
        <p className="text-sm">$ {product.price}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <input 
          type="number"
          placeholder="Select quantity"
          value={product.quantity <= 0 ? '' : product.quantity}
          onChange={
            (e) => assignQuantity(product, e.target.value)
          }
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${product.stock < product.quantity ? 'border-red-600' : ''}`}

        />
        {product.stock < product.quantity && <p className="text-red-600">Error: This product exceeds stock</p>}
      </div>
    </div>
  )
}