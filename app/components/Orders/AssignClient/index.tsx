'use client';
import { useEffect, useContext } from 'react';
import { Client } from '@/app/interfaces/client-interface';
import { OrderContext } from '@/app/context/OrderContext';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS_BY_TOKEN } from '@/app/querys/clients-query';
import Select from 'react-select';

export default function AssignClient () {
  
  const { data, loading } = useQuery(GET_CLIENTS_BY_TOKEN);
  const { orderState, assignClient } = useContext(OrderContext);

  useEffect(() => {
    console.log(orderState.client);
  }, [orderState.client]);

  const selectClient = (client: Client) => assignClient(client);

  if(loading) return (
    <>
      <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>Client</p>
      <Select 
        placeholder="Loading..."
        isDisabled={true}
      />
    </>
  )

  return (
    <>
      <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>Client</p>
      <Select 
        options={data.getClientsBySeller}
        getOptionValue={(opt: Client) => opt.id}
        getOptionLabel={(opt: Client) => `${opt.firstName} ${opt.lastName}`}
        onChange={(client) => selectClient(client as Client)}
        isDisabled={loading}
        placeholder="Select client"
      />
    </>
  )

}