'use client';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { NEW_ACCOUNT_QUERY } from '@/app/querys/auth-query';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function RegisterForm() {

  const [ addUser ] = useMutation(NEW_ACCOUNT_QUERY);
  const navigate = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is obligatory'),
      lastName: Yup.string().required('Last name is obligatory'),
      email: Yup.string().email().required('Email is obligatory'),
      password: Yup.string()
        .min(8, 'Password minimun is 8 characters')
        .max(32).required('Password is obligatory'),
    }),
    onSubmit: async ({ firstName, lastName, email, password }) => {
      try{
        const { data } = await addUser({
          variables: {
            input: {
              firstName, 
              lastName,
              email,
              password
            }
          }
        });
        Swal.fire({
          text: 'User created successfully',
          icon: 'success',
          html: 
            'Redirecting the main page',
            showCloseButton: true,
          didClose: () => navigate.push('/login')
        })
      }catch(e: any){

        const errorMessage = e.message as string;

        Swal.fire({
          text: `${errorMessage.charAt(0).toUpperCase()}${errorMessage.substring(1, errorMessage.length)}`,
          icon: 'error',
          timer: 5000,
        })
      }
    },
  });

  return (
    <form 
      className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
        className="block text-gray-700 font-bold mb-2 text-lg"
        htmlFor="input-email"
      > 
        Email
      </label>
      {formik.touched.email && formik.errors.email && (
        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
          <p className='text-black'>Error: {formik.errors.email}</p>
        </div>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        placeholder="Put your email here"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <label 
        className="block text-gray-700 font-bold mb-2 text-lg mt-4"
        htmlFor="input-password"
      > 
        Password
      </label>
      {formik.touched.password && formik.errors.password && (
        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
          <p className='text-black'>Error: {formik.errors.password}</p>
        </div>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input 
        type="submit"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer transition-all"
        value="Register"
      />
    </form>
  )
}