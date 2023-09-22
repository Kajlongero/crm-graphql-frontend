import { customClientWithHeaders } from "@/config/apollo-ssr";
import { GET_PRODUCT_BY_ID_QUERY } from "@/app/querys/products-query";
import { Product } from "@/app/interfaces/product-interface";
import EditProductForm from "@/app/components/EditProductForm";

type Ctx = {
  params: {
    id: string;
  }
}

export default async function EditProduct({ params }: Ctx) {
  const id: string = params.id;

  const { data } = await customClientWithHeaders({}).query({
    query: GET_PRODUCT_BY_ID_QUERY,
    variables: {
      id: `${id as string}`,
    }
  });

  return (
    <section className="mt-5">
      <h1 className="text-2xl text-gray-800 font-light">Edit <strong>ProductID: {id}</strong></h1>
      <EditProductForm {...data.getProductById as Product} />
    </section>
  )

}