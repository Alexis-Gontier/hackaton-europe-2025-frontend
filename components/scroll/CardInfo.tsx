import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

export default function CardInfo() {
  return (
    <Card className="w-full h-screen flex flex-col justify-between">
      <div className="w-full h-1/2 bg-gray-300 flex items-center justify-center">
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
