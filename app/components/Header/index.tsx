'use client';
import { User } from "@/app/interfaces/user-interface";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

type Props = {
  user: User
}

export default function Header ({ user }: Props) {

  const navigate = useRouter();

  const logout = () => {
    navigate.push('/login');
    Cookie.remove('token');
  }

  return (
    <div className="flex items-center justify-between">
      <p className="mr-2">Welcome, <strong>{user.firstName}</strong></p>
      <button 
        className="bg-red-500 rounded shadow-sm shadow-blue-600 text-white px-2 py-1"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  )
}