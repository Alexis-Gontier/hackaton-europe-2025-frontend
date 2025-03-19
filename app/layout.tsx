import "@/app/globals.css";
import type { Metadata } from 'next'
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: 'Article 11',
  description: 'Article 11',
  keywords: ['article11', 'hackaton', 'hetic', 'europe'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="max-w-[390px] mx-auto">
        <Header />
        <main className="">
          {children}
        </main>
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}