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
import useCards from "@/hooks/useCards"; // Adjust the import path as necessary

export default function VerticalCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [horizontalCurrent, setHorizontalCurrent] = useState(0);
  const [data, setData] = useState([]);
  const { loading, error, getAllFeed } = useCards();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFeed();
        setData(response);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [getAllFeed]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <CarouselItem key={item.id_subject}>
            <HorizontalCarousel
              onSlideChange={handleHorizontalChange}
              data={item}
            />
          </CarouselItem>
        ))}
        <CarouselItem>
          <CardEnd />
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
                index === current - 2 || index === current
                  ? "h-3 w-3 bg-gray-200"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
}
