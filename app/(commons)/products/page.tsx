import ProductsTable from "@/app/components/ProductsTable"
import Link from "next/link";

export default function ProductsPage() {

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-800 font-light">Products</h2>
      </div>
      <Link 
        className="bg-blue-800 py-2 px-5 mt-4 mb-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
        href='/products/new-product'  
      >
        + New Product
      </Link>
      <table className="table-auto shadow-md mt-5 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Price ($)</th>
            <th className="w-1/5 py-2">Stock</th>
            <th className="w-1/5 py-2">Delete</th>
            <th className="w-1/5 py-2">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <ProductsTable />
        </tbody>
      </table>
    </>
  )
}