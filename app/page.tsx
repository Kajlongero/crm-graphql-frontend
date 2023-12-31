import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { customClientWithHeaders } from "@/config/apollo-ssr";
import { GET_USER_BY_TOKEN } from "./querys/auth-query";
import { User } from "./interfaces/user-interface";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import ClientsTable from "./components/ClientsTable";

export default async function Homepage() {

  const authToken = cookies().get('token');

  if(!authToken) redirect('/login');

  const { data: { getUserByToken: user } } = await customClientWithHeaders({}).query({
    query: GET_USER_BY_TOKEN,
    variables: {
      token: authToken?.value,
    }
  });
  const userData: User = user;  

  return (
    <div className="flex bg-gray-200 min-h-screen max-sm:flex max-sm:flex-col">
      <Sidebar />
      <section className='max-sm:w-full sm:w-2/3 lg:w-4/5 px-4 py-3'>
        <Header user={userData} />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-gray-800 font-light">Clients</h2>
        </div>
        <Link 
          className="bg-blue-800 py-2 px-5 mt-4 mb-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold max-sm:w-full"
          href='/new-client'  
        >
          + New Client
        </Link>
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-5 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Company</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Delete</th>
                <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <ClientsTable />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}