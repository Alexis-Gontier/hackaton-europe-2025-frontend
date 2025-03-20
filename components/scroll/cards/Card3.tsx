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
      <CardContent className="flex flex-col gap-4 h-full">
        <h2>IMPACT</h2>
        <ul>
          <li>EU AI regulation aims to protect rights and ensure transparency but may slow innovation and increase costs. It could set a global standard while pushing companies to relocate. Public trust may grow, but businesses fear overregulation.</li>
          <li>Affected Groups: Tech companies and start-ups developing AI models</li>
          <li>Progressive/Left Posistion: Strong regulations are necessary to prevent discrimination and AI misuse.</li>
          <li>Conservative/Right Position: Strict regulations may hinder innovation but protect consumer rights.</li>
        </ul>
      </CardContent>
      <p className="absolute bottom-6 left-6">Source: <Link href={"https://www.theguardian.com/europe"} className="italic text-blue-500 underline">The Guardian</Link></p>
    </Card>
  );
}
