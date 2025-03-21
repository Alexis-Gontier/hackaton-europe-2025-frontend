import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Card1Props {
  data: {
    id_subject: string;
    title: string;
    short_description: string;
    image: string;
    context: string;
    impact: string[];
    source: string;
    votes: any;
  };
}

export default function Card1({ data }: Card1Props) {
  return (
    <div className="w-full h-full">
      <Card className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-b from-[#00A6FF] to-[#007AFF] p-2 shadow-lg after:content-[''] after:absolute after:inset-0 after:rounded-4xl after:shadow-[0_0_10px_5px_rgba(0,122,255,0.5)]">
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          {/* Image de fond avec effet blur */}
          <div className="absolute inset-0 bg-[url('/bg-card.png')] bg-cover bg-center filter blur-xs" />
          {/* Dégradé overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
          {/* Contenu */}
          <div className="relative p-8 flex flex-col justify-end items-center text-center gap-6 h-full pb-20">
            <h2 className="text-4xl text-white font-extrabold after:content-[''] after:mt-4 after:block after:w-[75%] after:mx-auto after:h-1 after:bg-gradient-to-b after:from-[#007AFF] after:to-[#00A6FF] after:blur-[2px] after:shadow-[0_0_10px_5px_rgba(0,122,255,0.5)] drop-shadow-lg">
              {data.title}
            </h2>
            <p className="text-white font-semibold">
              {data.short_description}
            </p>
          </div>
        </div>
        <p className="text-white absolute bottom-6 left-6">
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
    </div>
  );
}
