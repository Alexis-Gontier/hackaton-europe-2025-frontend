"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AvatarDemo } from "@/components/avatar/avatar";

export default function Header() {

    const pathname = usePathname();
    const pageName = pathname === "/" ? "Home" : pathname.substring(1).charAt(0)+ pathname.slice(2);

    return (
        <div className="p-4 flex place-content-between">
            <h1 className="text-3xl font-extrabold uppercase">{pageName}</h1>
            <Link
                href="/profile"
                className="border-2 hover:border-blue-500 rounded-full transition duration-100 ease-in-out"
            >
                <AvatarDemo />
            </Link>
        </div>
    )
}
