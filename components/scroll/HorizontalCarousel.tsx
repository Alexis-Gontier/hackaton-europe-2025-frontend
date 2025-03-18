"use client"

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import CardInfo from "./CardInfo"

export default function HorizontalCarousel() {

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
          return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

  return (
    <Carousel className="relative w-full h-full" onApi={setApi}>
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
            <div className="fixed bottom-0 right-0 p-4 bg-white bg-opacity-50">
                {current} / {count}
            </div>
        </CarouselContent>
    </Carousel>
  )
}
