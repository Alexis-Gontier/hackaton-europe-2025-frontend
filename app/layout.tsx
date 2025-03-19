"use client"

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { AvatarDemo } from "@/components/avatar/avatar";
import { Toaster } from "@/components/ui/sonner"
import { usePathname} from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const pageName = pathname === "/" ? "Home" : pathname.substring(1).charAt(0).toUpperCase()+ pathname.slice(2);
  return (
    <html lang="en">
      <body className="">
        <main className="max-w-[390px] mx-auto px-10 w-screen">
          <div className="flex my-8 place-content-between">
            <h1>{pageName}</h1>
            <AvatarDemo />
          </div>
          {children}
        </main>
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}
