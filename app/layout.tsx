import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <main className="max-w-[390px] mx-auto bg-red-500">
          {children}
        </main>
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}
