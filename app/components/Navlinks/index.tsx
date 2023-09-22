'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideLinks = {
  name: string;
  url: string;
}

const links: SideLinks[] = [
  {
    name: 'Clients',
    url: '/',
  },
  {
    name: 'Orders',
    url: '/orders',
  },
  {
    name: 'Products',
    url: '/products'
  },
  {
    name: 'Log out',
    url: '/login',
  }
]

export default function Navlinks() {

  const pathname = usePathname();
  
  return (
    <>
      {links.map(({ url, name }) => (
        <li 
          className={`${pathname === url ? 'bg-blue-900' : ''} flex items-center`} 
          key={`navigation-${name}`}
        >
          <Link href={url} className="w-full p-3">{name}</Link>
        </li>
      ))}
    </>
  )
}