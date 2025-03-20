import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card2() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] border-6 border-green-400 rounded-4xl"
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 h-full text-center">
        <h2 className="text-3xl font-bold">
          EU Defense Spending Increase
        </h2>
        <div className="w-5/6 h-1 bg-green-500 rounded-full"></div>
        <p className="text-base">The European Union plans a historic rise in defense spending to bolster its defense capabilities.</p>
      </CardContent>
      <p className="absolute bottom-6 left-6">Source: <Link href={"https://www.theguardian.com/europe"} className="italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}
