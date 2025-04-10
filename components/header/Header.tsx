"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AvatarDemo } from "@/components/avatar/avatar";

export default function Header() {

    const pathname = usePathname();
    const pageName = pathname === "/" ? "Home" : pathname.split('/')[1];

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-iphone mx-auto py-6 px-8 flex place-content-between">
            <h1 className="text-3xl font-extrabold uppercase">{pageName}</h1>
            <Link
                href="/profile"
                aria-label="Go to profile"
                className="border-2 hover:border-blue-500 rounded-full transition duration-100 ease-in-out"
            >
                <AvatarDemo />
            </Link>
        </div>
    )
}
