import "@/app/globals.css";
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: 'Article 11',
  description: 'Application développée lors du hackathon européen en partenariat avec Razorfish',
  keywords: ['article 11', 'hackathon', 'hetic', 'europe', 'vercel', 'razorfish', 'hackathon européen', 'nextjs', 'tailwindcss',],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-iphone mx-auto min-h-screen font-futura">
        <Toaster position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
