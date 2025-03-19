import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function CardInfoD() {
  return (
    <Card
      className="w-full h-[calc(100vh-200px)] flex flex-col justify-between border-4 border-[#00a3ff] rounded-4xl 
                 bg-cover bg-center"
    >
      <CardContent className="flex flex-col justify-between items-center h-full relative">
        <div className="text-center absolute top-0 right-40 w-fit mx-5 mt-5">
          <CardTitle className="text-4xl uppercase font-bold mb-5">
            Title
          </CardTitle>
          <hr className="w-full border-2 border-[#00a3ff] mb-5" />
        </div>
        <div className="absolute top-30 w-auto mx-5 mb-5">
          <CardDescription className="text-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            vel. Quibusdam repellendus quos laboriosam culpa accusamus,
            praesentium animi sed! Maxime mollitia distinctio ad aliquid nam
            unde dolore eos doloremque necessitatibus!
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}