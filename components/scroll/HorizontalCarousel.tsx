"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CardInfo from "./CardInfo";

export default function HorizontalCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCarouselInfo = () => {
      const snapList = api.scrollSnapList();
      setCount(snapList.length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Mise à jour initiale dès que l'API est disponible
    updateCarouselInfo();
    // Mise à jour à chaque changement de slide
    api.on("select", updateCarouselInfo);

    return () => {
      if (api.off) {
        api.off("select", updateCarouselInfo);
      }
    };
  }, [api]);

  return (
    <div className="relative w-full h-full">
      <Carousel className="w-full h-full" setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <CardInfo current={current} count={count} />
          </CarouselItem>
          <CarouselItem>
            <CardInfo current={current} count={count} />
          </CarouselItem>
          <CarouselItem>
            <CardInfo current={current} count={count} />
          </CarouselItem>
          <CarouselItem>
            <CardInfo current={current} count={count} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}