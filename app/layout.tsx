import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}
