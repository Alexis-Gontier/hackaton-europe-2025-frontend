import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import HorizontalCarousel from "./HorizontalCarousel"
import CardInfo from "./CardInfo"

export default function VerticalCarousel() {
  return (
    <Carousel
        opts={{
            align: "start",
        }}
        orientation="vertical"
        className="w-full"
    >
        <CarouselContent className="h-screen">
            <CarouselItem>
                <HorizontalCarousel />
            </CarouselItem>
            <CarouselItem>
                <HorizontalCarousel />
            </CarouselItem>
            <CarouselItem>
                <HorizontalCarousel />
            </CarouselItem>
        </CarouselContent>
    </Carousel>
  )
}
