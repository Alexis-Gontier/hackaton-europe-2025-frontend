import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import { Plus, Check, AlignCenter } from 'lucide-react'

export default function CardInfoA() {
  return (
    <Card
      className="w-full h-[calc(100vh-200px)] flex flex-col border-4 border-[#00a3ff] rounded-4xl 
                bg-cover bg-center"
    >
      <CardContent className="flex flex-col h-full text-center">
        <div className="flex flex-col h-full place-content-between">
          <div className="mx-5">
            <CardTitle className="text-4xl uppercase font-bold mb-5">
              Title
            </CardTitle>
            <hr className="w-full border-2 border-[#00a3ff] mb-5" />
          </div>
          <div className="flex justify-between w-auto">
            <button className="flex flex-col items-center">
              <p className="mb-2 font-bold uppercase text-red-500">Disagree</p>
              <Plus className="rounded-full border-4 h-15 w-15 border-red-500 text-red-500 transform rotate-45"/>
            </button>
            <button className="flex flex-col items-center">
              <p className="mb-2 font-bold uppercase text-gray-500">Neutral</p>
              <AlignCenter className="rounded-full border-4 p-px h-13 w-13 mt-1 text-gray-500"/>
            </button>
            <button className="flex flex-col items-center">
              <p className="mb-2 font-bold uppercase text-green-500">Agree</p>
              <Check className="rounded-full border-4 h-15 w-15 border-green-500 text-green-500"/>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}