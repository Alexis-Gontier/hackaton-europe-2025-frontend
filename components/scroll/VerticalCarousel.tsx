"use client"

import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel"
import HorizontalCarousel from "./HorizontalCarousel"
import CardEnd from "./cards/CardEnd"

export default function VerticalCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const [horizontalCurrent, setHorizontalCurrent] = React.useState(0)

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

    React.useEffect(() => {
        // Désactiver le défilement
        document.body.style.overflow = 'hidden';
        return () => {
            // Réactiver le défilement
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleHorizontalChange = (index: number) => {
        setHorizontalCurrent(index)
    }

    return (
        <Carousel
            setApi={setApi}
            opts={{
                align: "start",
            }}
            orientation="vertical"
            className="w-full relative"
        >
            <CarouselContent className="h-screen">
                <CarouselItem>
                    <HorizontalCarousel onSlideChange={handleHorizontalChange} />
                </CarouselItem>
                <CarouselItem>
                    <HorizontalCarousel onSlideChange={handleHorizontalChange} />
                </CarouselItem>
                <CarouselItem>
                    <HorizontalCarousel onSlideChange={handleHorizontalChange} />
                </CarouselItem>
                <CarouselItem>
                    <CardEnd />
                </CarouselItem>
            </CarouselContent>
            <div className={`fixed left-3 top-1/2 transform -translate-y-1/2 py-2 text-center text-sm text-muted-foreground transition-opacity duration-300 ${horizontalCurrent > 1 ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col items-center space-y-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full duration-400 ${current === index + 1 ? 'bg-blue-500 h-3 w-3' : 'bg-gray-300'} ${index === current - 2 || index === current ? 'h-3 w-3 bg-gray-200' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </Carousel>
    )
}