import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, Menu } from 'lucide-react';

export default function Card4() {
  const [visibleDiv, setVisibleDiv] = useState<string | null>(null);
  const [gradient, setGradient] = useState<string>("from-[#33FF00] to-[#FF1500]");

  const handleClick = (type: string) => {
    setVisibleDiv(type);
    switch (type) {
      case "desagree":
        setGradient("from-[#C30003] to-[#FF1500]");
        break;
      case "neutral":
        setGradient("from-[#FF85ED] to-[#FF00D0]");
        break;
      case "agree":
        setGradient("from-[#00FF00] to-[#7FFF7F]");
        break;
      default:
        setGradient("from-[#33FF00] to-[#FF1500]");
    }
  };

  return (
    <Card className={`relative w-full h-[calc(100vh-200px)] p-2 bg-clip-padding bg-gradient-to-l ${gradient} rounded-4xl`}>
      {visibleDiv === null && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-end items-center gap-10">
          <h2 className="text-5xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-l after:from-[#33FF00] after:to-[#FF1500] after:blur-[2px]">Vote</h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="desagree" className="uppercase text-red-500 font-bold">desagree</label>
              <button id="desagree" onClick={() => handleClick("desagree")} className="cursor-pointer border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="neutral" className="uppercase text-gray-500 font-bold">neutral</label>
              <button id="neutral" onClick={() => handleClick("neutral")} className="cursor-pointer border-3 border-gray-500 rounded-full p-2"><Menu size={32} color="gray"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="agree" className="uppercase text-green-300 font-bold">agree</label>
              <button id="agree" onClick={() => handleClick("agree")} className="cursor-pointer border-3 border-green-300 rounded-full p-2"><X size={48} color="lightgreen"/></button>
            </div>
          </div>
        </div>
      )}

      {visibleDiv === "neutral" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-5">
          <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#FF00FF] after:to-[#FF00FF] after:blur-[2px]">COMPROMISE</h2>

          <p className="font-semibold text-base">Form your own compromises. Compromises involve a solution that every political side can agree on. It’s not gonna be perfect but the best for the majority of people.</p>

          <textarea
            name=""
            id=""
            className="w-full h-48 border-2 border-[#FF00D0] rounded-3xl p-3"
            placeholder="TYPE IN COMPROMISE..."
          />
        </div>
      )}

      {visibleDiv === "desagree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-start items-center text-center gap-3">
           <div className="border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></div>
           <h4 className="my-3">I disagree because...</h4>
           <DesagreeCard>Restricts rights and freedom</DesagreeCard>
           <DesagreeCard>Harms the economy and opportunities</DesagreeCard>
           <DesagreeCard>Damages the environment </DesagreeCard>
           <DesagreeCard> Ignores public interest</DesagreeCard>
           <DesagreeCard>I don t trust the decisionmakers</DesagreeCard>
           <DesagreeCard>Other (please specifiy)..</DesagreeCard>
        </div>
      )}

      {visibleDiv === "agree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          agree
        </div>
      )}
    </Card>
  );
}

function DesagreeCard({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full px-6 text-start leading-4 py-2 border-2 border-red-500 font-semibold rounded-full">{children}</p>
  );
}
