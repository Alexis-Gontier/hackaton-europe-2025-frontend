import { Card } from "@/components/ui/card";

export default function CardEnd() {
  return (
    <Card
      className="relative w-full h-[calc(100vh-200px)] rounded-4xl bg-clip-padding bg-gradient-to-b from-[#A3A2A2] to-[#A3A2A2] p-2 after:content-[''] after:absolute after:inset-0 after:rounded-4xl after:shadow-[0_0_10px_5px_rgba(128,128,128,0.5)]"
    >
      <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-6">
        <div className="flex flex-col items-center gap-1">
        <h2 className="text-4xl font-bold">
        Good Job!
        </h2>
        <p className="font-semibold">You are all done here.</p>
        </div>
      </div>
    </Card>
  );
}
