'use client';
import { Client } from "@/app/interfaces/client-interface";
import { gql, useQuery } from "@apollo/client";

const CLIENTS_QUERY = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    firstName
    lastName
    company
    email
    phone
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
    </tr>
  )

  return (
    <>
      {data.getClientsBySeller.map(({ id, firstName, lastName, email, company }: Client) => (
        <tr key={id}>
          <td className="border px-4 py-2">{firstName} {lastName}</td>
          <td className="border px-4 py-2">{company}</td>
          <td className="border px-4 py-2">{email}</td>
        </tr>
      ))}
    </>
  )
 }