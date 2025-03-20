import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card1() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] border-6 border-blue-500 rounded-4xl bg-[url('/icon-192x192.png')] bg-cover bg-center"
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 h-full text-center transform translate-y-20">
        <h2 className="text-3xl font-bold text-white">
          EU Defense Spending Increase
        </h2>
        <div className="w-5/6 h-1 bg-blue-500 rounded-full"></div>
        <p className="text-base text-white">The European Union plans a historic rise in defense spending to bolster its defense capabilities.</p>
      </CardContent>
      <p className="absolute bottom-6 left-6 text-white">Source: <Link href={"https://www.theguardian.com/europe"} className="italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}
