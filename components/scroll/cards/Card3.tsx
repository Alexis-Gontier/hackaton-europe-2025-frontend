import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function Card3() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] border-6 border-red-400 rounded-4xl"
    >
      <CardContent className="flex flex-col gap-8 h-full">
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
          <li className="flex items-start gap-2">
            <span className="text-red-500 blur-[2px]">🔴</span>
            <span className="font-semibold">Conservative/Right Position: Strict regulations may hinder innovation but protect consumer rights.</span>
          </li>
        </ul>
      </CardContent>
      <p className="absolute bottom-6 left-6">Source: <Link href={"https://www.theguardian.com/europe"} className="italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}
