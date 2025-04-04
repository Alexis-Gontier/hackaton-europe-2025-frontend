import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function CardInfo() {
  return (
    <Card
      className="w-full h-[calc(100vh-200px)] flex flex-col justify-between border-4 border-[#00a3ff] rounded-4xl 
                 bg-[url('/icon-192x192.png')] bg-cover bg-center"
    >
      <CardContent className="flex flex-col justify-center items-center h-full">
        <div className="backdrop-blur-xs text-center text-white absolute bottom-20 w-fit mx-5">
          <CardTitle className="text-4xl uppercase font-bold mb-5">
            Title
          </CardTitle>
          <hr className="w-1/2 mx-auto border-2 border-[#00a3ff] mb-5" />
          <CardDescription className="text-white">
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
