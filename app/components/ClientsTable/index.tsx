'use client';
import { Client } from "@/app/interfaces/client-interface";
import { useQuery } from "@apollo/client";
import { CLIENTS_BY_SELLER } from "@/app/querys/clients-query";
import ClientsTableRow from "../ClientsTableRow";

export default function ClientsTable () {

  const { data, loading } = useQuery(CLIENTS_BY_SELLER);  

  if(loading) return (
    <tr>
      <td className="border px-4 py-2">Loading...</td>
      <td className="border px-4 py-2">Loading...</td>
      <td className="border px-4 py-2">Loading...</td>
      <td className="border px-4 py-2">Loading...</td>
      <td className="border px-4 py-2">Loading...</td>
    </tr>
  )

  return (
    <>
      {data.getClientsBySeller.map((data: Client) => (
        <ClientsTableRow key={data.id} {...data}/>
      ))}
    </>
  )
 }