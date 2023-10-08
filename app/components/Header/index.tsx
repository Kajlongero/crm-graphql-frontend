'use client';
import { useApolloClient } from "@apollo/client";
import { User } from "@/app/interfaces/user-interface";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

type Props = {
  user: User
}

export default function Header ({ user }: Props) {

  const navigate = useRouter();
  const client = useApolloClient();

  const logout = () => {
    Cookie.remove('token');
    client.clearStore();
    
    navigate.push('/login');
  }

  return (
    <div className="sm:flex sm:items-center sm:justify-between mb-6 max-sm:w-full">
      <p className="mr-2 mb-5">Welcome, <strong>{user.firstName}</strong></p>
      <button 
        className="bg-red-500 rounded shadow-sm shadow-blue-600 text-white px-2 py-1 max-sm:w-full"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  )
}