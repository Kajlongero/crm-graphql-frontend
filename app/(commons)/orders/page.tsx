import OrdersTable from "@/app/components/OrdersTable";
import Link from "next/link";

export default function Orders () {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-800 font-light">Orders</h2>
      </div>
      <Link 
        className="bg-blue-800 py-2 px-5 mt-4 mb-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
        href='/orders/new-order'  
      >
        + New Order
      </Link>
      <OrdersTable />
    </>
  )
}