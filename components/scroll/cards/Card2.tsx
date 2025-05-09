import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Card2Props {
  data: {
    id_subject: string;
    title: string;
    short_description: string;
    image: string;
    context: string;
    impact: string[];
    source: string;
    votes: { id: string; count: number }[];
  };
}

export default function Card2({ data }: Card2Props) {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-b from-[#00ff3c] to-[#1f9900] p-2 after:content-[''] after:absolute after:inset-0 after:rounded-4xl after:shadow-[0_0_10px_5px_rgba(0,255,60,0.5)]"
    >
      <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
        <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#00ff3c] after:to-[#1f9900] after:blur-[2px]">
          CONTEXT
        </h2>
        <p className="font-semibold">{data.context}</p>
      </div>
      <p className="absolute bottom-6 left-6">
        Source:{" "}
        <Link
          href={"https://www.theguardian.com/europe"}
          target="_blank"
          className="blur-[.5px] italic text-blue-500 underline"
        >
          {data.source}
        </Link>
      </p>
    </Card>
  );
}
