import {
  Card,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card2() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-b from-[#00A6FF] to-[#007AFF] p-2"
    >
      <div className="pt-30 bg-[url('/icon-192x192.png')] bg-cover bg-center w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
        <h2 className="text-4xl text-white font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#007AFF] after:to-[#00A6FF] after:blur-[2px] drop-shadow-lg">CONTEXT</h2>
        <p className="text-white font-semibold">In response to escalating geopolitical tensions and security concerns, EU leaders have agreed to significantly increase defense expenditures. This move aims to enhance the EU's autonomous defense capabilities and reduce reliance on external powers.</p>
      </div>
      <p className="text-white absolute bottom-6 left-6">Source: <Link href={"https://www.theguardian.com/europe"} target="_blank" className="blur-[.5px] italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}