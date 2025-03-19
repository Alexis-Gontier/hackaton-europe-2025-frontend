"use client"

import { House, Search, Star } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { usePathname} from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname();

  // auth ajouter user au localforage
  // better navbar and adapter le style des cards

  const LINKS = [
    {
      href: '/',
      label: 'Home',
      icons: <House />
    },
    {
      href: '/actions',
      label: 'Actions',
      icons: <Star />
    },
    {
      href: '/search',
      label: 'Search',
      icons: <Search />
    },
  ]

  return (
    <nav className="fixed bottom-0 w-full flex justify-around p-2 shadow-md bg-white">
      {LINKS.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${pathname == link.href ? "text-red-500" : "text-gray-500"} hover:text-red-500 flex items-center gap-2`}
        >
          {link.icons}
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
