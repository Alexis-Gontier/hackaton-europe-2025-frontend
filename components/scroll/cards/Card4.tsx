import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X, Menu, Check, NotebookPen } from 'lucide-react';
import { toast } from "sonner";

interface Card4Props {
  onVoteComplete?: () => void;
}

export default function Card4({ onVoteComplete }: Card4Props) {
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
        handleVote();
        break;
      case "agree":
        setGradient("from-[#00FF00] to-[#7FFF7F]");
        handleVote();  // Appel de la fonction pour gérer le vote
        break;
      default:
        setGradient("from-[#33FF00] to-[#FF1500]");
    }
  };

  const handleVote = () => {
    // Logique pour gérer le vote, par exemple, afficher un message de succès
    toast.success("Votre vote a été pris en compte.");
    // Masquer la carte après le vote
    setVisibleDiv(null);
    // Call the parent's callback function if provided
    if (onVoteComplete) {
      onVoteComplete();
    }
  };

  const handleNeutralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVote();
  };

  return (
    <Card className={`relative w-full h-[calc(100vh-200px)] p-2 bg-clip-padding bg-gradient-to-l ${gradient} rounded-4xl`}>
      {visibleDiv === null && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-between items-center gap-10">
          <h2 className="mt-25 text-3xl font-bold text-center">
          EU Defense Spending Increase
          </h2>
          <h3 className="text-5xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-l after:from-[#33FF00] after:to-[#FF1500] after:blur-[2px]">
            Vote
          </h3>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="desagree" className="uppercase text-red-500 font-bold">Desagree</label>
              <button id="desagree" onClick={() => handleClick("desagree")} className="cursor-pointer border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="neutral" className="uppercase text-gray-500 font-bold">Neutral</label>
              <button id="neutral" onClick={() => handleClick("neutral")} className="cursor-pointer border-3 border-gray-500 rounded-full p-2"><Menu size={32} color="gray"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="agree" className="uppercase text-green-300 font-bold">Agree</label>
              <button id="agree" onClick={() => handleClick("agree")} className="cursor-pointer border-3 border-green-300 rounded-full p-2"><Check size={48} color="lightgreen"/></button>
            </div>
          </div>
        </div>
      )}

      {visibleDiv === "neutral" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-5">
          <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#FF00FF] after:to-[#FF00FF] after:blur-[2px]">COMPROMIS</h2>

          <p className="font-semibold text-base">Formez vos propres compromis. Les compromis impliquent une solution sur laquelle chaque côté politique peut s&apos;entendre. Ce ne sera pas parfait, mais ce sera le meilleur pour la majorité.</p>

          <form onSubmit={handleNeutralSubmit} className="w-full flex flex-col gap-4">
            <textarea
              name="compromise"
              className="w-full h-48 border-2 border-[#FF00D0] rounded-3xl p-3"
              placeholder="SUGGÉREZ UN COMPROMIS..."
            />
            <button type="submit"
              className="w-full border-2 text-[#FF00D0] border-[#FF00D0] rounded-3xl p-3"
            >Envoyer</button>
          </form>
        </div>
      )}

      {visibleDiv === "desagree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-start items-center text-center gap-3">
           <div className="border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></div>
           <h4 className="my-3">Je suis en désaccord parce que...</h4>
           <div className="flex flex-col gap-4">
            <DesagreeCard onClick={handleVote}>Restreint les droits et libertés</DesagreeCard>
            <DesagreeCard onClick={handleVote}>Nuire à l&apos;économie et aux opportunités</DesagreeCard>
            <DesagreeCard onClick={handleVote}>Endommage l&apos;environnement</DesagreeCard>
            <DesagreeCard onClick={handleVote}>Ignore l&apos;intérêt public</DesagreeCard>
            <DesagreeCard onClick={handleVote}>Je n&apos;ai pas confiance dans les décideurs</DesagreeCard>
           </div>

           <div className="w-full">
            <NotebookPen size={32} color=""/>
            <button onClick={() => handleClick("neutral")} className="mt-10 cursor-pointer w-full border-2 border-[#FF00D0] rounded-3xl p-3">Proposez votre propre compromis...</button>
           </div>
        </div>
      )}

      {visibleDiv === "agree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          Accord
        </div>
      )}
    </Card>
  );
}

function DesagreeCard({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button 
      className="w-full px-6 text-start leading-4 py-2 border-2 border-red-500 rounded-3xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
