'use client';
import { Client } from "@/app/interfaces/client-interface";
import { gql, useQuery } from "@apollo/client";
import ClientsTableRow from "../ClientsTableRow";

const CLIENTS_QUERY = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    firstName
    lastName
    company
    email
    phone
    seller
  }
}
`;

export default function ClientsTable () {

  const { data, loading } = useQuery(CLIENTS_QUERY);  

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