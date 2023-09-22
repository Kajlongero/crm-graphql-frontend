'use client';
import { Product } from "@/app/interfaces/product-interface"
import { EDIT_PRODUCT_QUERY, PRODUCTS_QUERY } from "@/app/querys/products-query";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function EditProductForm ({ ...props }: Product) {

  const nav = useRouter();

  const [ updateProduct ] = useMutation(EDIT_PRODUCT_QUERY, {
    update(cache, { data: { updateProduct }}) {
      try{
        const { getAllProducts } = cache.readQuery({ query: PRODUCTS_QUERY }) as any;
        const products: Product[] = [...getAllProducts];
  
        const index = products.findIndex(({ id }) => id === updateProduct.id);
        products.splice(index, 1, updateProduct);
  
        cache.writeQuery({
          query: PRODUCTS_QUERY,
          data: {
            getAllProducts: [...products],
          }
        })
      }catch(e){
        nav.refresh();
      }

    }
  })

  const formik = useFormik<Omit<Product, 'createdAt' | 'id'>>({
    initialValues: {
      name: props.name,
      price: props.price,
      stock: props.stock,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required'),
      stock: Yup.number().required('Stock is required'),
    }),
    onSubmit: async (input) => {
      try{
        console.log(input);
        const updated = await updateProduct({
          variables: {
            id: props.id,
            input: input,
          }
        });

        Swal.fire({
          icon: 'success',
          html: 'Updated',
          text: 'Product updated successfully',
          timer: 3500,
        });

        nav.push('/products');

      }catch(e: any){
        Swal.fire({
          icon: 'error',
          text: e.message,
          timer: 3500,
        });
      }
    }
  })

  return (
    <div className="flex justify-center mt-5">
      <div className="flex justify-center w-full max-w-lg">
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 max-w-sm"
          onSubmit={formik.handleSubmit}
        > 
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg"
            htmlFor="name"
          > 
            Name
          </label>
          {formik.touched.name && formik.errors.name && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.name}</p>
            </div>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="price"
          > 
            Price
          </label>
          {formik.touched.price && formik.errors.price && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.price}</p>
            </div>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="stock"
          > 
          {formik.touched.stock && formik.errors.stock && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.stock}</p>
            </div>
          )}
            Stock
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            name="stock"
            type="number"
            placeholder="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <input 
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded font-bold hover:bg-gray-900 cursor-pointer"
            value="udpate product"
          />
        </form>
      </div>
    </div>
  )
}