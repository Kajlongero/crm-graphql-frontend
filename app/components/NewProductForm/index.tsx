'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik'; 
import { NEW_PRODUCT_QUERY, PRODUCTS_QUERY } from '@/app/querys/products-query';
import { Product } from '@/app/interfaces/product-interface';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function NewProductForm () {
  
  const nav = useRouter();

  const [ createProduct ] = useMutation(NEW_PRODUCT_QUERY, {
    update(cache, {data: { createProduct }}) {
      const { getAllProducts } = cache.readQuery({ query: PRODUCTS_QUERY }) as any;
      const products: Product[] = [...getAllProducts, createProduct];

      cache.writeQuery({
        query: PRODUCTS_QUERY,
        data: {
          getAllProducts: [...products]
        }
      })
    },
    
  });

  const formik = useFormik<Omit<Product, 'createdAt' | 'id'>>({
    initialValues: {
      name: '',
      price: 10,
      stock: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.string().required('Price is required'),
      stock: Yup.string().required('Stock is required'),
    }), 
    onSubmit: async (input) => {
      try{
        const { data } = await createProduct({
          variables: {
            input: input
          }
        });

        Swal.fire({
          text: 'Product created successfully',
          icon: 'success',
          timer: 3500,
        });
        nav.push('/products');

      }catch(e: any){
        Swal.fire({
          text: e.message,
          icon: 'error',
          timer: 3500,
        })
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
            placeholder="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <input 
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded font-bold hover:bg-gray-900 cursor-pointer"
            value="Add new product"
          />
        </form>
      </div>
    </div>
  )
}