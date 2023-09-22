'use client';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT_QUERY, EDIT_PRODUCT_QUERY, PRODUCTS_QUERY } from "@/app/querys/products-query";
import { Product } from "@/app/interfaces/product-interface";
import EditIcon from "../SvgIcons/EditIcon";
import DeleteIcon from "../SvgIcons/DeleteIcon";

export default function ProductsTableRow({ id, name, price, stock, createdAt }: Product) {

  const nav = useRouter();

  const [ deleteProduct ] = useMutation(DELETE_PRODUCT_QUERY, {
    update(cache) {
      const { getAllProducts } = cache.readQuery({ query: PRODUCTS_QUERY }) as any;
      const products: Product[] = [...getAllProducts];

      const filteredWithoutDeleted = products.filter((d) => d.id !== id)

      cache.writeQuery({
        query: PRODUCTS_QUERY,
        data: {
          getAllProducts: [...filteredWithoutDeleted],
        }
      })
    }
  });

  const handleDeleteProduct = (id: string) => {
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
        await deleteProduct({
          variables: {
            id: id,
          }
        });
        Swal.fire(
          'Deleted successfully',
          'Product has been deleted',
          'success'
        )
      }
    })
  } 

  const handleEditProduct = (id: string) => {
    nav.push(`/products/edit-product/${id}`);
  }

  return (
    <>
      <tr key={id}>
        <td className="border px-4 py-2">{name}</td>
        <td className="border px-4 py-2">{price}</td>
        <td className="border px-4 py-2">{stock}</td>
        <td className="border px-4 py-2">
          <button 
            className="flex items-center justify-center gap-x-2 bg-red-600 text-white w-full p-2 hover:bg-red-800 rounded text-xs uppercase font-bold"
            onClick={() => handleDeleteProduct(id)}
          >
            Delete
            <DeleteIcon />
          </button>
        </td>
        <td className="border px-4 py-2">
          <button 
            className="flex items-center justify-center gap-x-2 bg-gray-400 text-white w-full p-2 hover:bg-gray-800 rounded text-xs uppercase font-bold"
            onClick={() => handleEditProduct(id)}
          >
            Edit
            <EditIcon />
          </button>
        </td>
      </tr>
    </>
  )
}