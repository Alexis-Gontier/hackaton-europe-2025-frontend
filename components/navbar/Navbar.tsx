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
    <nav className="fixed bottom-0 w-full flex justify-around p-2 shadow-md bg-white h-[60px] drop-shadow-sm rounded-t-xl">
      <div className='flex justify-center gap-10 w-1/2'>
      {LINKS.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${pathname == link.href ? "text-red-500" : "text-black"} hover:text-red-500 flex items-center gap-2`}
        >
          <div className= {`${pathname == link.href ? "bg-radial-[at_50%_50%] from-red-300 to-transparent to-75% " : "bg-radial-[at_50%_50%] from-zinc-400 to-transparent to-75% "}'h-10 w-10 rounded-full flex items-center justify-center`}>
            {link.icons}
          </div>
          {/* {link.label} */}
        </Link>
      ))}
      </div>
    </nav>
  )
}
