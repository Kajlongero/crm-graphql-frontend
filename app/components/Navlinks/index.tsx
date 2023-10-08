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
]

const otherLinks: SideLinks[] = [
  {
    name: 'Best Sellers',
    url: '/analytics/best-sellers',
  },
  {
    name: 'Best Clients',
    url: '/analytics/best-clients',
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
        <h2 className="font-bold text-white text-2xl mt-2 pb-2">Other options</h2>
        {otherLinks.map(({ url, name }) => (
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