import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card3() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-t from-[#FF00D0] to-[#FF1500] p-2 after:z-[-1] after:content-[''] after:absolute after:inset-0 after:rounded-4xl after:shadow-[0_0_10px_5px_rgba(255,21,0,0.5)]"
    >
      <CardContent className="w-full h-full rounded-3xl bg-white p-6 flex flex-col gap-8 overflow-scroll">
      <div className="flex justify-start">
        <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#FF1500] after:to-[#FF1500] after:blur-[2px]">IMPACT</h2>
      </div>
      <ul className="list-none space-y-2">
        <li className="flex items-start gap-2">
        <span className="text-red-500 blur-[2px]">🔴</span>
        <span className="font-semibold">EU AI regulation aims to protect rights and ensure transparency but may slow innovation and increase costs. It could set a global standard while pushing companies to relocate. Public trust may grow, but businesses fear overregulation.</span>
        </li>
        <li className="flex items-start gap-2">
        <span className="text-red-500 blur-[2px]">🔴</span>
        <span className="font-semibold">Affected Groups: Tech companies and start-ups developing AI models</span>
        </li>
        <li className="flex items-start gap-2">
        <span className="text-red-500 blur-[2px]">🔴</span>
        <span className="font-semibold">Progressive/Left Position: Strong regulations are necessary to prevent discrimination and AI misuse.</span>
        </li>
      </ul>
      </CardContent>
      <p className="absolute bottom-6 left-6 backdrop-blur-xs">Source: <Link href={"https://www.theguardian.com/europe"} className="italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}
