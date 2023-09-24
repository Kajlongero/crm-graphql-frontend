'use client';
import { useMutation } from "@apollo/client";
import { OrderResponse, OrderStatus } from "@/app/interfaces/order-interface";
import { useEffect, useState } from "react";
import { UPDATE_ORDER_BY_STATUS } from "@/app/querys/orders-query";
import Swal from 'sweetalert2';
import PhoneIcon from "../SvgIcons/PhoneIcon";
import EmailIcon from "../SvgIcons/EmailIcon";
import idGenerator from "@/app/utils/idGenerator";

export default function OrdersTableData ({ data }: { data: OrderResponse }) {

  const { id, client, order, status, total } = data;

  const [ updateOrder ] = useMutation(UPDATE_ORDER_BY_STATUS);
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
    </div>
  </div>
  )
}