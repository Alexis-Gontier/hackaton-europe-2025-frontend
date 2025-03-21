"use client"

import React, { useEffect } from "react"
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

interface HorizontalCarouselProps {
    onSlideChange: (index: number) => void;
}

export default function HorizontalCarousel({ onSlideChange }: HorizontalCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const data = {
        id_subject: "1",
        title: "EU Defense Spending Increase",
        short_description: "The European Union plans a historic rise in defense spending to bolster its defense capabilities.",
        image: "https://example.com/eu_defense_spending.jpg",
        context: "In response to escalating geopolitical tensions and security concerns, EU leaders have agreed to significantly increase defense expenditures to enhance the EU's autonomous defense capabilities and reduce reliance on external powers.",
        impact: [
          "Strengthened EU defense infrastructure",
          "Increased investment in defense technologies",
          "Enhanced security for EU member states"
        ],
        source: "The Guardian",
        votes: {}
    };

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            const selectedIndex = api.selectedScrollSnap()
            setCurrent(selectedIndex + 1)
            onSlideChange(selectedIndex + 1)
        })
    }, [api, onSlideChange])

    return (
        <Carousel setApi={setApi} className="relative w-full h-full ">
            <CarouselContent className="pl-6">
                <CarouselItem className="basis-14/16">
                    <Card1 data={data}/>
                </CarouselItem>
                <CarouselItem className="basis-14/16">
                    <Card2 data={data} />
                </CarouselItem>
                <CarouselItem className="basis-14/16">
                    <Card3 data={data} />
                </CarouselItem>
                <CarouselItem className="basis-14/16">
                    <Card4  />
                </CarouselItem>
            </CarouselContent>
            <div className="py-2 text-center text-sm text-muted-foreground">
                <div className="flex justify-center items-center space-x-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            className={`mt-2 h-2 w-2 rounded-full duration-400 ${
                                current === index + 1 ? 'bg-blue-500 h-4 w-4' : 'bg-gray-300'
                            } ${
                                index === current - 2 || index === current ? 'h-3 w-3 bg-gray-200' : ''
                            }`}
                        />
                    ))}
                </div>
            </div>
        </Carousel>
    )
}
