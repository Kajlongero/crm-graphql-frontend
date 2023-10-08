'use client';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@/app/querys/products-query';
import { ProductOrder } from '@/app/interfaces/product-interface';
import { OrderContext } from '@/app/context/OrderContext';
import Select from 'react-select';

export default function AssignProducts () {

  const { addOrRemoveProducts } = useContext(OrderContext);
  const { data, loading } = useQuery(PRODUCTS_QUERY);

  const selectProduct = (product: ProductOrder[]) => {
  
    const productsOrder: ProductOrder[] = [...product.map((p) => {
      if(!p.quantity) return {...p, quantity: 0};

      return p;
    })];

    addOrRemoveProducts(productsOrder);
  }

  if(loading) return (
    <>
      <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>Select products</p>
      <Select 
        placeholder="Loading..."
        isDisabled={true}
      />
    </>
  );

  return (
    <>
      <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>Select products</p>
      <Select 
        options={data.getAllProducts}
        isMulti={true}
        getOptionValue={(opt: ProductOrder) => opt.id}
        getOptionLabel={(opt: ProductOrder) => `${opt.name} - ${opt.stock} existencias disponibles`}
        onChange={(product) => selectProduct(product as ProductOrder[])}
        isDisabled={loading}
        placeholder="Select products"
      />
    </>
  )
}