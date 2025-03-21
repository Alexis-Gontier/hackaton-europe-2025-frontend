import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { X, Menu, Check, NotebookPen } from 'lucide-react';
import { toast } from "sonner";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  DocumentData 
} from "firebase/firestore";

// Firebase configuration - You must replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCIt6C3SKO27xip8JCPAej80M6001z-Ry8",
  authDomain: "hackaton-649da.firebaseapp.com",
  projectId: "hackaton-649da",
  storageBucket: "hackaton-649da.firebasestorage.app",
  messagingSenderId: "883397591668",
  appId: "1:883397591668:web:babc5357c15c60571dc721"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Card4Props {
  cardId?: string; // Make cardId optional but provide default
  topicTitle?: string;
  onVoteComplete?: () => void;
}

interface VoteStats {
  agree: number;
  disagree: number;
  neutral: number;
}

export default function Card4({ 
  cardId = "default-card-id", // Provide default value
  topicTitle = "EU Defense Spending Increase", 
  onVoteComplete 
}: Card4Props) {
  const [visibleDiv, setVisibleDiv] = useState<string | null>(null);
  const [gradient, setGradient] = useState<string>("from-[#33FF00] to-[#FF1500]");
  const [compromise, setCompromise] = useState<string>("");
  const [voteStats, setVoteStats] = useState<VoteStats>({ agree: 0, disagree: 0, neutral: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch vote statistics when component mounts
  useEffect(() => {
    fetchVoteStats();
  }, [cardId]);

  const fetchVoteStats = async () => {
    if (!cardId) return; // Skip if cardId is not available
    
    try {
      const votesRef = collection(db, "votes");
      
      // Get agree votes
      const agreeQuery = query(votesRef, where("cardId", "==", cardId), where("voteType", "==", "agree"));
      const agreeSnapshot = await getDocs(agreeQuery);
      
      // Get disagree votes
      const disagreeQuery = query(votesRef, where("cardId", "==", cardId), where("voteType", "==", "disagree"));
      const disagreeSnapshot = await getDocs(disagreeQuery);
      
      // Get neutral votes
      const neutralQuery = query(votesRef, where("cardId", "==", cardId), where("voteType", "==", "neutral"));
      const neutralSnapshot = await getDocs(neutralQuery);
      
      setVoteStats({
        agree: agreeSnapshot.size,
        disagree: disagreeSnapshot.size,
        neutral: neutralSnapshot.size
      });
    } catch (error) {
      console.error("Error fetching vote statistics:", error);
    }
  };

  const handleClick = (type: string) => {
    if (type === "neutral") {
      // Directly handle neutral vote without showing compromise form
      handleVote("neutral");
      return;
    }
    
    setVisibleDiv(type);
    switch (type) {
      case "disagree":
        setGradient("from-[#C30003] to-[#FF1500]");
        break;
      case "neutral":
        setGradient("from-[#FF85ED] to-[#FF00D0]");
        break;
      case "agree":
        setGradient("from-[#00FF00] to-[#7FFF7F]");
        if (type === "agree") {
          handleVote("agree");
        }
        break;
      case "results":
        setShowResults(true);
        break;
      default:
        setGradient("from-[#33FF00] to-[#FF1500]");
    }
  };

  const handleVote = async (voteType: string, compromiseText?: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Ensure cardId is defined - use default if not provided
      const voteCardId = cardId || "default-card-id";
      
      // Prepare vote data with guaranteed cardId
      const voteData: DocumentData = {
        cardId: voteCardId,
        topicTitle: topicTitle || "EU Defense Spending Increase",
        voteType: voteType,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent || "unknown",
      };

      // Add compromise text if provided
      if (compromiseText && compromiseText.trim() !== "") {
        voteData.compromise = compromiseText.trim();
      }
      
      // Console log for debugging
      console.log("Saving vote data:", JSON.stringify(voteData));
      
      // Save vote to Firebase
      const docRef = await addDoc(collection(db, "votes"), voteData);
      console.log("Document written with ID: ", docRef.id);
      
      // Update local vote stats for immediate UI feedback
      setVoteStats(prev => ({
        ...prev,
        [voteType]: prev[voteType as keyof VoteStats] + 1
      }));
      
      // Show success message
      toast.success("Your vote has been successfully recorded.");
      
      // Show the confirmation screen based on vote type
      setVisibleDiv(voteType);
      
      // Set appropriate gradient based on vote type
      switch (voteType) {
        case "disagree":
          setGradient("from-[#C30003] to-[#FF1500]");
          break;
        case "neutral":
          setGradient("from-[#FF85ED] to-[#FF00D0]");
          break;
        case "agree":
          setGradient("from-[#00FF00] to-[#7FFF7F]");
          break;
      }
      
      // Reset compromise text
      setCompromise("");
      
      // Call parent callback if provided
      if (onVoteComplete) {
        onVoteComplete();
      }
    } catch (error) {
      console.error("Error saving vote:", error);
      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      toast.error("Une erreur s'est produite lors de l'enregistrement de votre vote");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompromiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compromise || compromise.trim() === "") {
      toast.error("Veuillez entrer un compromis avant de soumettre");
      return;
    }
    handleVote("disagree", compromise);
  };

  const handleDisagreeCardClick = (reason: string) => {
    handleVote("disagree", reason);
  };

  const handleBackToVote = () => {
    setVisibleDiv(null);
    setShowResults(false);
  };

  const totalVotes = voteStats.agree + voteStats.disagree + voteStats.neutral;
  
  // Calculate percentages safely (avoid division by zero)
  const agreePercent = totalVotes > 0 ? Math.round((voteStats.agree / totalVotes) * 100) : 0;
  const neutralPercent = totalVotes > 0 ? Math.round((voteStats.neutral / totalVotes) * 100) : 0;
  const disagreePercent = totalVotes > 0 ? Math.round((voteStats.disagree / totalVotes) * 100) : 0;

  return (
    <Card className={`relative w-full h-[calc(100vh-200px)] p-2 bg-clip-padding bg-gradient-to-l ${gradient} rounded-4xl`}>
      {visibleDiv === null && !showResults && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-between items-center gap-10">
          <h2 className="mt-25 text-3xl font-bold text-center">
            {topicTitle}
          </h2>
          <h3 className="text-5xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-l after:from-[#33FF00] after:to-[#FF1500] after:blur-[2px]">
            Vote
          </h3>
          
          {/* Vote statistics summary */}
          {/* <div className="flex justify-around w-full text-sm text-gray-500">
            <div>Pour: {voteStats.agree}</div>
            <div>Neutre: {voteStats.neutral}</div>
            <div>Contre: {voteStats.disagree}</div>
          </div> */}
          
          {/* See detailed results button */}
          {/* <button 
            onClick={() => handleClick("results")}
            className="text-blue-500 underline text-sm"
          >
            Voir les résultats détaillés
          </button> */}
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="disagree" className="uppercase text-red-500 font-bold">Disagree</label>
              <button 
                id="disagree" 
                onClick={() => handleClick("disagree")} 
                className="cursor-pointer border-3 border-red-500 rounded-full p-2"
                disabled={isSubmitting}
              >
                <X size={48} color="red"/>
              </button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="neutral" className="uppercase text-gray-500 font-bold">Neutral</label>
              <button 
                id="neutral" 
                onClick={() => handleClick("neutral")} 
                className="cursor-pointer border-3 border-gray-500 rounded-full p-2"
                disabled={isSubmitting}
              >
                <Menu size={32} color="gray"/>
              </button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label htmlFor="agree" className="uppercase text-green-300 font-bold">Agree</label>
              <button 
                id="agree" 
                onClick={() => handleClick("agree")} 
                className="cursor-pointer border-3 border-green-300 rounded-full p-2"
                disabled={isSubmitting}
              >
                <Check size={48} color="lightgreen"/>
              </button>
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-start items-center text-center gap-4">
          <h2 className="text-3xl font-bold mb-4">Résultats du vote</h2>
          
          <div className="w-full mb-8">
            <h3 className="text-lg font-semibold mb-2">Total des votes: {totalVotes}</h3>
            
            <div className="space-y-4 w-full">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500 font-medium">Pour</span>
                  <span>{voteStats.agree} ({agreePercent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: `${agreePercent}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-500 font-medium">Neutre</span>
                  <span>{voteStats.neutral} ({neutralPercent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${neutralPercent}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-red-500 font-medium">Contre</span>
                  <span>{voteStats.disagree} ({disagreePercent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: `${disagreePercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleBackToVote}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Retour au vote
          </button>
        </div>
      )}

      {visibleDiv === "compromise" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-5">
          <h2 className="text-4xl font-extrabold after:content-[''] after:mt-3 after:block after:w-full after:h-1 after:bg-gradient-to-b after:from-[#FF00FF] after:to-[#FF00FF] after:blur-[2px]">COMPROMISE</h2>

          <p className="font-semibold text-base">Form your own compromises. Compromises involve a solution that every political side can agree on. It’s not gonna be perfect but the best for the majority of people.</p>

          <form onSubmit={handleCompromiseSubmit} className="w-full flex flex-col gap-4">
            <textarea
              name="COMPROMISE"
              value={compromise}
              onChange={(e) => setCompromise(e.target.value)}
              className="w-full h-48 border-2 border-[#FF00D0] rounded-3xl p-3"
              placeholder="TYPE IN COMPROMISE..."
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              className="w-full border-2 text-[#FF00D0] border-[#FF00D0] rounded-3xl p-3 hover:bg-[#FF00D0] hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Compromise"}
            </button>
          </form>
        </div>
      )}

      {visibleDiv === "disagree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-start items-center text-center gap-3">
           <div className="border-3 border-red-500 rounded-full p-2"><X size={48} color="red"/></div>
           <h4 className="my-3">I disagree because...</h4>
           <div className="flex flex-col gap-4">
            <DisagreeCard onClick={() => handleDisagreeCardClick("Restricts rights and freedom")} disabled={isSubmitting}>
            Restricts rights and freedom
            </DisagreeCard>
            <DisagreeCard onClick={() => handleDisagreeCardClick(" Harms the economy and opportunities")} disabled={isSubmitting}>
            Harms the economy and opportunities
            </DisagreeCard>
            <DisagreeCard onClick={() => handleDisagreeCardClick("Damages the environment ")} disabled={isSubmitting}>
            Damages the environment 
            </DisagreeCard>
            <DisagreeCard onClick={() => handleDisagreeCardClick(" Ignores public interest")} disabled={isSubmitting}>
            Ignores public interest
            </DisagreeCard>
            <DisagreeCard onClick={() => handleDisagreeCardClick("I don't trust the decisionmakers")} disabled={isSubmitting}>
            I don t trust the decisionmakers
            </DisagreeCard>
           </div>

           <div className="w-full">
            <NotebookPen size={32} color=""/>
            <button 
              onClick={() => setVisibleDiv("compromise")} 
              className="mt-10 cursor-pointer w-full border-2 border-[#FF00D0] rounded-3xl p-3 hover:bg-[#FF00D0] hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Give your own compromise... (optional)
            </button>
           </div>
        </div>
      )}

      {visibleDiv === "neutral" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          <div className="border-3 border-gray-500 rounded-full p-2">
            <Menu size={32} color="gray"/>
          </div>
          <h4 className="text-2xl font-bold text-gray-500">Neutral vote recorded!</h4>
          <p className="text-lg">Your vote has been recorded.</p>
          {isSubmitting && <p className="text-sm text-gray-500">Recording in progress...</p>}
          
          <button 
            onClick={() => setVisibleDiv("compromise")} 
            className="mt-4 cursor-pointer w-full border-2 border-[#FF00D0] rounded-3xl p-3 hover:bg-[#FF00D0] hover:text-white transition-colors"
          >
            Propose a compromise (optional)
          </button>
        </div>
      )}

      {visibleDiv === "agree" && (
        <div className="w-full h-full rounded-3xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4">
          <div className="border-3 border-green-300 rounded-full p-2">
            <Check size={48} color="lightgreen"/>
          </div>
          <h4 className="text-2xl font-bold text-green-500">
          You agree!</h4>
          <p className="text-lg">Your vote has been recorded.</p>
          {isSubmitting && <p className="text-sm text-gray-500">Recording in progress...</p>}
        </div>
      )}
    </Card>
  );
}

function DisagreeCard({ children, onClick, disabled = false }: { 
  children: React.ReactNode; 
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button 
      className="w-full px-6 text-start leading-4 py-2 border-2 border-red-500 rounded-3xl hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// A utility component to display recent compromises (optional)
export function RecentCompromises({ cardId = "default-card-id", limit = 5 }: { cardId?: string; limit?: number }) {
  const [compromises, setCompromises] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompromises = async () => {
      if (!cardId) return;
      
      try {
        const votesRef = collection(db, "votes");
        const compromiseQuery = query(
          votesRef, 
          where("cardId", "==", cardId), 
          where("voteType", "==", "neutral")
        );
        
        const querySnapshot = await getDocs(compromiseQuery);
        
        const compromiseData: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.compromise) {
            compromiseData.push({
              id: doc.id,
              ...data
            });
          }
        });
        
        setCompromises(compromiseData.slice(0, limit));
      } catch (error) {
        console.error("Error fetching compromises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompromises();
  }, [cardId, limit]);

  if (loading) {
    return <div>Chargement des compromis...</div>;
  }

  if (compromises.length === 0) {
    return <div>Aucun compromis proposé pour le moment.</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Compromis récents</h3>
      <div className="space-y-2">
        {compromises.map((compromise) => (
          <div key={compromise.id} className="p-3 border rounded-lg">
            <p className="text-sm">{compromise.compromise}</p>
            <div className="text-xs text-gray-500 mt-1">
              {compromise.timestamp ? new Date(compromise.timestamp.toDate()).toLocaleString() : 'Date inconnue'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}