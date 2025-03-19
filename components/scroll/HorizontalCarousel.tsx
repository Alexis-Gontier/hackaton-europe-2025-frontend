import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import CardInfo from "./CardInfo"
import CardInfoD from "./CardInfoD"
import CardInfoV from "./CardInfoV"
import CardInfoA from "./CardInfoA"

export default function HorizontalCarousel() {

  return (
    <Carousel className="relative w-full h-full">
        <CarouselContent>
            <CarouselItem>
                <CardInfo />
            </CarouselItem>
            <CarouselItem>
                <CardInfoD />
            </CarouselItem>
            <CarouselItem>
                <CardInfoV />
            </CarouselItem>
            <CarouselItem>
                <CardInfoA />
            </CarouselItem>
        </CarouselContent>
    </Carousel>
  )
}
