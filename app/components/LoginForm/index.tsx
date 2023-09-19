'use client';
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import Cookie from 'js-cookie';
import * as Yup from 'yup';

const MUTATION_LOGIN = gql`
mutation authenticate($input: AuthInput!) {
  authenticate(input: $input) {
    token
  }
}
`;

export default function LoginForm () {

  const [ authenticate ] = useMutation(MUTATION_LOGIN);
  const navigate = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().min(8).max(32).required('Password is required'),
    }),
    onSubmit: async ({ email, password }) => {
      try{

        const { data } = await authenticate({
          variables: {
            input: {
              email,
              password,
            }
          }
        });

        Cookie.set('token', data.authenticate.token);

        Swal.fire({
          text: 'Logged succesfully',
          icon: 'success',
          timer: 3000,
          didClose: () => {
            navigate.push('/');
          }
        })
        navigate.push('/');
      }catch(e: any){
        Swal.fire({
          text: `${e.message.charAt(0).toUpperCase()}${e.message.substring(1, e.message.length)}`,
          timer: 3000,
          icon: 'error',
        })
      }
    }
  })

  return (
    <form 
      className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
      onSubmit={formik.handleSubmit}
    >
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
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input 
        type="submit"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer transition-all"
        value="Log in"
      />
    </form>
  )
}