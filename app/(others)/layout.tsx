import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { gql } from "@apollo/client";
import { User } from "../interfaces/user-interface";
import { customClientWithHeaders } from "@/config/apollo-ssr";
import { isValidToken } from "../utils/isValidToken";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const GET_USER_BY_TOKEN_QUERY = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

export default async function CommonsLayout({ children }: { children: React.ReactNode }) {

  const token = cookies().get('token')?.value as string; 
  if(!token) redirect('/login');

  const valid = await isValidToken(token); 
  if(!valid) redirect('/login');

  const { data: { getUserByToken: user } } = await customClientWithHeaders({}).query({
    query: GET_USER_BY_TOKEN_QUERY,
    variables: {
      token: token,
    }
  });
  
  const userData: User = user;

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <Sidebar />
      <div className='w-2/3 lg:w-4/5 px-4 py-3'>
        <Header user={userData} />
        {children}
      </div>
    </div>
  )
}