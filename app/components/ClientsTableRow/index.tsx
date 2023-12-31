'use client';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { useMutation } from '@apollo/client';
import { Client } from "@/app/interfaces/client-interface";
import { CLIENTS_BY_SELLER, DELETE_CLIENTS_QUERY } from "@/app/querys/clients-query";
import DeleteIcon from "../SvgIcons/DeleteIcon";
import EditIcon from "../SvgIcons/EditIcon";

export default function TableRow({ id, email, firstName, lastName, company }: Client) {

  const nav = useRouter();

  const [ deleteClient ] = useMutation(DELETE_CLIENTS_QUERY, {
    update(cache) {
      const { getClientsBySeller } = cache.readQuery({ query: CLIENTS_BY_SELLER }) as any;
      const clients: Client[] = [...getClientsBySeller];

      const filteredWithoutDeleted = clients.filter((d) => d.id !== id)

      cache.writeQuery({
        query: CLIENTS_BY_SELLER,
        data: {
          getClientsBySeller: [...filteredWithoutDeleted],
        }
      })
    }
  });

  const handleDeleteClient = (id: string) => {
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
        await deleteClient({
          variables: {
            id: id,
          }
        });
        Swal.fire(
          'Deleted successfully',
          'Client has been deleted',
          'success'
        )
      }
    })
  } 

  const handleEditClient = (id: string) => {
    nav.push(`/edit-client/${id}`);
  }
  
  return (
    <>
      <tr key={id}>
        <td className="border px-4 py-2">{firstName} {lastName}</td>
        <td className="border px-4 py-2">{company}</td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">
          <button 
            className="flex items-center justify-center gap-x-2 bg-red-600 text-white w-full p-2 hover:bg-red-800 rounded text-xs uppercase font-bold"
            onClick={() => handleDeleteClient(id)}
          >
            Delete
            <DeleteIcon />
          </button>
        </td>
        <td className="border px-4 py-2">
          <button 
            className="flex items-center justify-center gap-x-2 bg-gray-400 text-white w-full p-2 hover:bg-gray-800 rounded text-xs uppercase font-bold"
            onClick={() => handleEditClient(id)}
          >
            Edit
            <EditIcon />
          </button>
        </td>
      </tr>
    </>
  )
}