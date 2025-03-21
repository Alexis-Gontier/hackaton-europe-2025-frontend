"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import HorizontalCarousel from "./HorizontalCarousel";
import CardEnd from "./cards/CardEnd";

export default function VerticalCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [horizontalCurrent, setHorizontalCurrent] = useState(0);
  const [votedItems, setVotedItems] = useState<{[key: string]: boolean}>({});

  const data = [
    {
      id_subject: "1",
      title: "Augmentation des dépenses de défense de l'UE",
      short_description:
        "L'Union européenne prévoit une augmentation historique des dépenses de défense pour renforcer ses capacités.",
      image: "https://example.com/eu_defense_spending.jpg",
      context:
        "En réponse à l'escalade des tensions géopolitiques et des préoccupations sécuritaires, les dirigeants de l'UE ont convenu d'augmenter significativement les dépenses de défense afin d'améliorer les capacités de défense autonomes de l'UE et de réduire la dépendance aux puissances extérieures.",
      impact: [
        "Renforcement des infrastructures de défense de l'UE",
        "Augmentation des investissements dans les technologies de défense",
        "Amélioration de la sécurité pour les États membres de l'UE",
      ],
      source: "The Guardian",
      votes: {},
    },
    {
      id_subject: "2",
      title: "BBBB",
      short_description:
        "L'Union européenne prévoit une augmentation historique des dépenses de défense pour renforcer ses capacités.",
      image: "https://example.com/eu_defense_spending.jpg",
      context:
        "En réponse à l'escalade des tensions géopolitiques et des préoccupations sécuritaires, les dirigeants de l'UE ont convenu d'augmenter significativement les dépenses de défense afin d'améliorer les capacités de défense autonomes de l'UE et de réduire la dépendance aux puissances extérieures.",
      impact: [
        "Renforcement des infrastructures de défense de l'UE",
        "Augmentation des investissements dans les technologies de défense",
        "Amélioration de la sécurité pour les États membres de l'UE",
      ],
      source: "The Guardian",
      votes: {},
    }
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleHorizontalChange = (index: number) => {
    setHorizontalCurrent(index);
  };

  const handleVoteComplete = (id: string) => {
    setVotedItems(prev => ({...prev, [id]: true}));
    
    // Move to the next vertical carousel item if available
    if (api && current < count) {
      api.scrollNext();
    }
  };

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
        {data.map((item) => (
          <CarouselItem key={item.id_subject} className={votedItems[item.id_subject] ? "hidden" : ""}>
            <HorizontalCarousel
              onSlideChange={handleHorizontalChange}
              onVoteComplete={() => handleVoteComplete(item.id_subject)}
              data={item}
            />
          </CarouselItem>
        ))}
        <CarouselItem>
          <Carousel className="relative w-full h-full">
            <CarouselContent className="pl-6">
              <CarouselItem className="basis-14/16">
                <CardEnd />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </CarouselItem>
      </CarouselContent>
      <div
        className={`fixed left-2 top-1/2 transform -translate-y-1/2 py-2 text-center text-sm text-muted-foreground transition-opacity duration-300 ${
          horizontalCurrent > 1 ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full duration-400 ${
                current === index + 1
                  ? "bg-blue-500 h-9 w-3 shadow-2xl shadow-blue-500"
                  : "h-[10px] w-[10px] bg-gray-300"
              } ${
                index === current - 2 || index === current ? "h-3 w-3 bg-gray-200" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
}