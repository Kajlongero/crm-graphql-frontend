'use client';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { OrderContext } from "@/app/context/OrderContext";
import { MakeOrder, OrderProducts,  } from "@/app/interfaces/order-interface";
import { Product, ProductOrder } from "@/app/interfaces/product-interface";
import { GET_ORDERS_BY_SELLER, NEW_ORDER } from "@/app/querys/orders-query";
import { PRODUCTS_QUERY } from "@/app/querys/products-query";
import Swal from 'sweetalert2';

export default function OrderButton () {

  const { orderState: { client, products, total } } = useContext(OrderContext);

  const [ newOrder ] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getAllProducts } = cache.readQuery({ query: PRODUCTS_QUERY }) as any;
      const copy: ProductOrder[] = [...getAllProducts];

      const changed: Product[] = copy.map((product) => {
        const index = newOrder.order.findIndex(({ id }: ProductOrder) => id === product.id);
        if(index < 0) return product;

        return {
          ...product,
          stock: product.stock - newOrder.order[index].quantity,
        }
      });

      cache.writeQuery({
        query: PRODUCTS_QUERY,
        data: {
          getAllProducts: [...changed],
        }
      });

      try{
        const { getOrdersBySeller } = cache.readQuery({ query: GET_ORDERS_BY_SELLER }) as any;

        cache.writeQuery({
          query: GET_ORDERS_BY_SELLER,
          data: {
            getOrdersBySeller: [...getOrdersBySeller, newOrder]
          }
        });
        nav.push('/orders');

      }catch(e){
        nav.refresh();
        nav.push('/orders');
      }

    }
  });
  const nav = useRouter();

  const makeOrder = async () => {
    
    const productsOrder: OrderProducts[] = products.map(({ id, quantity, name, price }) => ({
      id,
      quantity,
      name,
      price
    }));

    const orderObj: MakeOrder = {
      client: client.id,
      status: 'PENDING',
      order: productsOrder,
      total,
    }

    try{
      const { data } = await newOrder({
        variables: {
          input: orderObj,
        }
      });
      Swal.fire({
        icon: 'success',
        html: 'Success!',
        text: `Order ${data.newOrder.id} created successfully`,
        timer: 3500,
      })
      nav.push('/orders');
    }catch(e: any){
      const errorMessage = e.message;
      Swal.fire({
        icon: 'error',
        text: errorMessage,
        timer: 3500,
      })
    }
  }

  return (
    <>
      <button
        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${(!products.every(p => p.quantity > 0) || !products.every(p => p.quantity <= p.stock) || !products.length || !client) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={makeOrder}
        disabled={!client || !products.every(p => p.quantity > 0) || !products.length || !products.every(p => p.quantity <= p.stock)}
      >
        Register order
      </button>
    </>
  )
}