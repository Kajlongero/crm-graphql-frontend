'use client';
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { OrderResponse, OrderStatus } from "@/app/interfaces/order-interface";
import { DELETE_ORDER, GET_ORDERS_BY_SELLER, UPDATE_ORDER_BY_STATUS } from "@/app/querys/orders-query";
import Swal from 'sweetalert2';
import PhoneIcon from "../SvgIcons/PhoneIcon";
import EmailIcon from "../SvgIcons/EmailIcon";
import idGenerator from "@/app/utils/idGenerator";

export default function OrdersTableData ({ data }: { data: OrderResponse }) {

  const nav = useRouter();
  const { id, client, order, status, total } = data;

  const [ updateOrder ] = useMutation(UPDATE_ORDER_BY_STATUS);
  const [ deleteOrder ] = useMutation(DELETE_ORDER, {
    update(cache, { data: { deleteOrder } } ) {
      const { getOrdersBySeller } = cache.readQuery({ query: GET_ORDERS_BY_SELLER}) as any;
      const orders: OrderResponse[] = [...getOrdersBySeller];

      const filtered = orders.filter(o => o.id !== id);

      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: [...filtered],
        }
      });
    }
  });
  const [orderStatus, setOrderStatus] = useState(status);
  const [color, setColor] = useState<string>('');
  
  useEffect(() => {
    if(orderStatus)
      setOrderStatus(orderStatus);

    borderColor();
  }, [orderStatus])

  const borderColor = () => {
    if(orderStatus === 'PENDING') setColor('border-yellow-500');
    if(orderStatus === 'COMPLETED') setColor('border-green-500');
    if(orderStatus === 'CANCELLED') setColor('border-red-800');
  }

  const handleOrderStatus = async (newOrderStatus: OrderStatus) => {
    if(newOrderStatus === orderStatus) return;

    try{
      const { data: result } = await updateOrder({
        variables: {
          id,
          status: `${newOrderStatus}`,
        }
      });

      const sts = result.updateOrderByStatus.status as OrderStatus;
      setOrderStatus(sts);
    }catch(e) {
      Swal.fire({
        icon: 'error',
        text: 'Error updating the status',
        timer: 3500,
      });
      console.log(e);
    }
  }

  const handleDeleteOrder = async (id: string) => {
    try{
      Swal.fire({
        title: 'Are you sure that you want to delete?',
        text: "You won't be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteOrder({
            variables: {
              id: id,
            }
          });
          Swal.fire(
            'Deleted successfully',
            'Order has been deleted',
            'success'
          )
        }
      });
    }catch(e: any) {
      Swal.fire({
        title: 'Are you sure that you want to delete?',
        text: e.message,
        icon: 'error',
        timer: 3500,
      })
    }
  }

  return (
    <div className={`flex ${color} border-t-4 mt-4 bg-white rounded p-6 md:grid-cols-2 md:gap-4 shadow-lg`} key={idGenerator()} >
      <div className="w-1/2">
        <p className="font-bold text-gray-800">{`${client.firstName} ${client.lastName}`}</p>
        {client.email && <p className="flex items-center my-2 gap-x-1 text-gray-800"><EmailIcon /> {client.email}</p>}
        {client.phone && <p className="flex items-center my-2 gap-x-1 text-gray-800"><PhoneIcon /> {client.phone}</p>}
        <h2 className="font-bold text-gray-800 mt-10">Status: {status}</h2>
        <select 
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs"
          onChange={(e) => handleOrderStatus(e.target.value as OrderStatus)}
          value={orderStatus}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <div className="w-1/2">
        <h2 className="text-gray-800 font-bold mt-2">Order summary</h2>
        {order.map((product, index) => (
          <div className="mt-4" key={idGenerator()}>
            <p className="text-sm text-gray-600">Product: {product.name}</p>
            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
          </div>
        ))}
        <p 
          className="text-gray-800 mt-3 font-bold"
        >
          Total to pay: <span className="font-light">$ {total}</span>
        </p>
        <button 
            className="flex items-center justify-center gap-x-2 bg-red-600 text-white w-full p-2 hover:bg-red-800 rounded text-xs uppercase font-bold mt-4"
            onClick={() => handleDeleteOrder(id)}
          >
            Delete order
        </button>
    </div>
  </div>
  )
}