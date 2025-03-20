"use client"

import React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel"
import Card1 from "./cards/Card1"
import Card2 from "./cards/Card2"
import Card3 from "./cards/Card3"
import Card4 from "./cards/Card4"

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
    <Carousel setApi={setApi} className="relative w-full h-full">
        <CarouselContent>
            <CarouselItem>
                <Card1 />
            </CarouselItem>
            <CarouselItem>
                <Card2 />
            </CarouselItem>
            <CarouselItem>
                <Card3 />
            </CarouselItem>
            <CarouselItem>
                <Card4 />
            </CarouselItem>
        </CarouselContent>
        <div className="py-2 text-center text-sm text-muted-foreground">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`mt-2 h-2 w-2 rounded-full ${current === index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
    </Carousel>
  )
}