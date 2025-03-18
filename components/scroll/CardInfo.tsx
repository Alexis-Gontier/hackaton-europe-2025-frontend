import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface CardInfoProps {
  current: number;
  count: number;
}

export default function CardInfo({ current, count }: CardInfoProps) {
  return (
    <>
    <Card className="w-full h-screen flex flex-col justify-between relative">
      {/* Placeholder pour l'image */}
      <div className="w-full h-1/2 bg-gray-300 flex items-center justify-center">
        Img
      </div>

      <CardContent>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardContent>

      <CardFooter className="relative w-full p-4">
      </CardFooter>
        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 shadow rounded-md">
          Page {current} / {count}
        </div>
    </Card>
    </>
  );
}