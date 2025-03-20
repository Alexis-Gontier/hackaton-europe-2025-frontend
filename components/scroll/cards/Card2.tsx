import {
  Card,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card2() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-b from-[#00ff3c] to-[#1f9900] p-2"
    >
      <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
        <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#00ff3c] after:to-[#1f9900] after:blur-[2px]">CONTEXT</h2>
        <p className="font-semibold">In response to escalating geopolitical tensions and security concerns, EU leaders have agreed to significantly increase defense expenditures. This move aims to enhance the EUs autonomous defense capabilities and reduce reliance on external powers.</p>
      </div>
      <p className="absolute bottom-6 left-6">Source: <Link href={"https://www.theguardian.com/europe"} target="_blank" className="blur-[.5px] italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}