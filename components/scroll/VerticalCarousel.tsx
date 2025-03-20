"use client"

import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel"
import HorizontalCarousel from "./HorizontalCarousel"

export default function VerticalCarousel() {
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

    React.useEffect(() => {
        // Désactiver le défilement
        document.body.style.overflow = 'hidden';
        return () => {
            // Réactiver le défilement
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <Carousel
            setApi={setApi}
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
            <div className="fixed left-5 top-1/2 transform -translate-y-1/2 py-2 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center space-y-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${current === index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </Carousel>
    )
}