import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"

const cardData = [
  {
    id: 1,
    title: "EU Defense Spending Increase...",
    voted: "Agreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
  {
    id: 2,
    title: "EU Defense Spending Increase...",
    voted: "Disagreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
  {
    id: 3,
    title: "EU Defense Spending Increase...",
    voted: "Agreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
  {
    id: 4,
    title: "EU Defense Spending Increase...",
    voted: "Disagreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
  {
    id: 5,
    title: "EU Defense Spending Increase...",
    voted: "Agreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
  {
    id: 6,
    title: "EU Defense Spending Increase...",
    voted: "Disagreed",
    compromise: "A balanced approach to Europe reinforcing its military could involve increasing defense capabilities while",
  },
]

export default function Page() {
  return (
    <div className="flex flex-col space-y-4">
      {cardData.map((data) => (
        <Link key={data.id} href={`/actions/${data.id}`}>
          <Card id={`card-${data.id}`} className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-blue-500/40">
            <CardContent>
              <p className="font-bold text-base">{data.title}</p>
              <p className="text-base">You Voted:</p>
              <p>
                <span className={data.voted === "Agreed" ? "text-green-400" : "text-red-400"}>
                  {data.voted}
                </span>{" "}
                <span className="text-gray-200">with...,</span>
              </p>
              <p className="text-base">Your Compromise:</p>
              <p className="text-gray-200">{data.compromise}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
