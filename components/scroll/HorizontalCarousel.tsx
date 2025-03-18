import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import CardInfo from "./CardInfo"

export default function HorizontalCarousel() {

  return (
    <Carousel className="relative w-full h-full">
        <CarouselContent>
            <CarouselItem>
                <CardInfo />
            </CarouselItem>
            <CarouselItem>
                <CardInfo />
            </CarouselItem>
            <CarouselItem>
                <CardInfo />
            </CarouselItem>
            <CarouselItem>
                <CardInfo />
            </CarouselItem>
        </CarouselContent>
    </Carousel>
  )
}
