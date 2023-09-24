'use client';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik'; 
import { useRouter } from 'next/navigation';
import { Client } from '@/app/interfaces/client-interface';
import { ADD_NEW_CLIENT, CLIENTS_BY_SELLER } from '@/app/querys/clients-query';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function NewClientForm () {

  const [ addClient ] = useMutation(ADD_NEW_CLIENT, {
    update(cache, {data: { addClient }}) {
      const { getClientsBySeller } = cache.readQuery({ query: CLIENTS_BY_SELLER }) as any;
      const clients: Client[] = [...getClientsBySeller, addClient];

      cache.writeQuery({
        query: CLIENTS_BY_SELLER,
        data: {
          getClientsBySeller: [...clients]
        }
      })
    },
    
  });
  const nav = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      company: Yup.string().required('Company is required'),
      email: Yup.string().email('Email not valid').required('Email is required'),
      phone: Yup.string()
    }), 
    onSubmit: async ({ firstName, lastName, email, company, phone }) => {
      try{
        const { data } = await addClient({
          variables: {
            input: {
              firstName,
              lastName,
              email,
              company,
              phone: phone ? phone : null,
            }
          }
        });
        console.log(data.addClient);

        Swal.fire({
          text: 'Client created successfully',
          icon: 'success',
          timer: 3500,
        });
        nav.push('/');

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
            htmlFor="input-first-name"
          > 
            First name
          </label>
          {formik.touched.firstName && formik.errors.firstName && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.firstName}</p>
            </div>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Last name
          </label>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.lastName}</p>
            </div>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
          {formik.touched.company && formik.errors.company && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.company}</p>
            </div>
          )}
            Company
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            name="company"
            type="text"
            placeholder="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
          {formik.touched.email && formik.errors.email && (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              <p className='text-black'>Error: {formik.errors.email}</p>
            </div>
          )}
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Phone (optional)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone (optional)"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <input 
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded font-bold hover:bg-gray-900 cursor-pointer"
            value="add new client"
          />
        </form>
      </div>
    </div>
  )
}