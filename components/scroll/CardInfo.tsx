import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

export default function CardInfo() {
  return (
    <Card className="w-full h-[500px] flex flex-col justify-between">
      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
        Img
      </div>
      <CardContent>
        <CardTitle>
          Title
        </CardTitle>
        <CardDescription>
          Description
        </CardDescription>
      </CardContent>
      <CardFooter>
        Footer
      </CardFooter>
    </Card>
  )
}
