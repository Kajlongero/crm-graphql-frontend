'use client';
import { Product } from "@/app/interfaces/product-interface";
import { gql, useQuery } from "@apollo/client";
import ProductsTableRow from "../ProductsTableRow";
import { PRODUCTS_QUERY } from "@/app/querys/products-query";

export default function ProductsTable () {

  const { data, loading } = useQuery(PRODUCTS_QUERY);  

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
      {data.getAllProducts.map((data: Product) => (
        <ProductsTableRow key={data.id} {...data}/>
      ))}
    </>
  )
 }