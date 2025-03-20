import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Card4() {
  const [visibleDiv, setVisibleDiv] = useState<string | null>(null);

  return (
    <Card className="relative w-full h-[calc(100vh-200px)] border-6 border-red-400 rounded-4xl">
      {visibleDiv === null && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          <button onClick={() => setVisibleDiv("desagree")}>desagree</button>
          <button onClick={() => setVisibleDiv("neutral")}>neutral</button>
          <button onClick={() => setVisibleDiv("agree")}>oui</button>
        </div>
      )}

      {visibleDiv === "neutral" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          neutral
        </div>
      )}

      {visibleDiv === "desagree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          desagree
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
