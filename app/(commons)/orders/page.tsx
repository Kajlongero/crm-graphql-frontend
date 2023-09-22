import AssignClient from "@/app/components/Orders/AssignClient";
import OrderContextProvider from "@/app/context/OrderContext";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <>
      <OrderContextProvider>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-gray-800 font-light">Orders</h2>
        </div>
        <Link 
          className="bg-blue-800 py-2 px-5 mt-4 mb-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
          href='/orders/new-order'  
          >
          + New Order
        </Link>
        <AssignClient />
      </OrderContextProvider>
    </>
  )
}