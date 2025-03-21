import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X, Menu, Check, NotebookPen } from 'lucide-react';
import { toast } from "sonner";

export default function Card4() {
  const [visibleDiv, setVisibleDiv] = useState<string | null>(null);
  const [gradient, setGradient] = useState<string>("from-[#33FF00] to-[#FF1500]");

  const [vote, setVote] = useState<string>("");

  const handleClick = (type: string) => {
    setVisibleDiv(type);
    switch (type) {
      case "desagree":
        setVote("desagree");
        setGradient("from-[#C30003] to-[#FF1500]");
        break;
      case "neutral":
        setVote("neutral");
        setGradient("from-[#FF85ED] to-[#FF00D0]");
        break;
      case "agree":
        setVote("agree");
        setGradient("from-[#00FF00] to-[#7FFF7F]");
        handleVote()
        break;
      default:
        setVote("");
        setGradient("from-[#33FF00] to-[#FF1500]");
    }
  };

  const sendVote = async (compromiseMessage: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const id = 1;
    const payload = { vote, compromise: compromiseMessage };
  
    try {
      const response = await fetch(`${API_URL}/users/vote/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du vote");
      }
  
      const data = await response.json();
      console.log('Vote envoyé avec succès:', data);
      toast.success("Vote sent successfully");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVote = async (e?: any) => {
    if (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const compromiseMessage = formData.get('compromise')?.toString() || '';
      await sendVote(compromiseMessage);
    } else {
      // Appel direct (ex: bouton "agree") sans formulaire, on envoie compromise vide
      await sendVote('');
    }
  };


  const handleAgree = () => {
    toast.success("You have agreed");
  }

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
              <label htmlFor="desagree" className="uppercase text-red-500 font-bold">desagree</label>
              <button id="desagree" onClick={() => handleClick("desagree")} className="cursor-pointer border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="neutral" className="uppercase text-gray-500 font-bold">neutral</label>
              <button id="neutral" onClick={() => handleClick("neutral")} className="cursor-pointer border-3 border-gray-500 rounded-full p-2"><Menu size={32} color="gray"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="agree" className="uppercase text-green-300 font-bold">agree</label>
              <button id="agree" onClick={() => handleAgree()} className="cursor-pointer border-3 border-green-300 rounded-full p-2"><Check size={48} color="lightgreen"/></button>
            </div>
          </div>
        </div>
      )}

      {visibleDiv === "neutral" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-5">
          <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#FF00FF] after:to-[#FF00FF] after:blur-[2px]">COMPROMISE</h2>

          <p className="font-semibold text-base">Form your own compromises. Compromises involve a solution that every political side can agree on. It’s not gonna be perfect but the best for the majority of people.</p>

          <form onSubmit={handleVote} className="w-full flex flex-col gap-4">
            <textarea
              name=""
              id=""
              className="w-full h-48 border-2 border-[#FF00D0] rounded-3xl p-3"
              placeholder="TYPE IN COMPROMISE..."
            />
            <button type="submit"
              className="w-full border-2 text-[#FF00D0] border-[#FF00D0] rounded-3xl p-3"
            >Send</button>
          </form>
        </div>
      )}

      {visibleDiv === "desagree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-start items-center text-center gap-3">
           <div className="border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></div>
           <h4 className="my-3">I disagree because...</h4>
           <div className="flex flex-col gap-4">
            <DesagreeCard>Restricts rights and freedom</DesagreeCard>
            <DesagreeCard>Harms the economy and opportunities</DesagreeCard>
            <DesagreeCard>Damages the environment </DesagreeCard>
            <DesagreeCard> Ignores public interest</DesagreeCard>
            <DesagreeCard>I don t trust the decisionmakers</DesagreeCard>
           </div>

           
           <div className="w-full">
            <NotebookPen size={32} color=""/>
            <button id="agree" onClick={() => handleClick("neutral")} className="mt-10 cursor-pointer w-full border-2 border-[#FF00D0] rounded-3xl p-3">Give your own compromise...</button>
           </div>
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

  const handleClick = () => {
    toast.success("Thanks for your feedback");
  }

  return (
    <button onClick={handleClick} className="w-full px-6 text-start leading-4 py-2 border-2 border-red-500 font-semibold rounded-full">
      {children}
    </button>
  );
}
