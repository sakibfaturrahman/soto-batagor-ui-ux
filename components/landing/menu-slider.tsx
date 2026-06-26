"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-10 w-10 border-neutral-200 bg-white text-[#4A3B32] hover:bg-[#F5EFEA]"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-10 w-10 border-neutral-200 bg-white text-[#4A3B32] hover:bg-[#F5EFEA]"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function MenuSlider() {
  // Data menu disesuaikan 100% dengan hasil wawancara nyata Segmen 3
  const menuItems = [
    {
      title: "Setengah porsi",
      price: "Rp 5.000",
      desc: "Pilihan pas untuk teman jajan santai kamu di sore hari.",
      rating: "4.9 (450)",
      img: "/image/batagor.webp",
    },
    {
      title: "Satu porsi penuh",
      price: "Rp 10.000",
      desc: "Kombinasi lengkap tahu sutra dan pangsit untuk kenyang maksimal.",
      rating: "4.9 (1.2k)",
      img: "/image/batagor.webp",
    },
  ];

  return (
    <section id="komponen" className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center">
      <div className="w-full max-w-7xl bg-[#F5F3EE] rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-8">
        
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          {/* Header Konten */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#4A3B32] tracking-wide max-w-md text-left">
              Pilihan porsi menu sederhana
            </h2>
            <p className="text-sm md:text-base text-neutral-500 font-normal max-w-sm text-left md:text-right leading-relaxed">
              Dibuat segar setiap hari dengan adonan ikan tenggiri asli yang disajikan hangat dengan siraman bumbu kacang legit.
            </p>
          </div>

          {/* Jajaran Kartu Menu */}
          <CarouselContent className="-ml-4">
            {menuItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                <motion.div
                  className="relative h-[420px] rounded-[2rem] overflow-hidden group shadow-sm flex items-end p-6"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badge Harga Akurat Wawancara */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-sm font-semibold text-[#8C6239]">{item.price}</span>
                  </div>

                  {/* Informasi Menu */}
                  <div className="relative z-10 w-full text-left flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-300 font-normal max-w-sm">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
                        <span className="text-xs font-medium text-white">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">Jam ramai: 12:00 - 16:00</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Footer Carousel Kontrol */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-300/40">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-normal">Menerima pembayaran non-tunai via QRIS</span>
            </div>
            <CarouselControls />
          </div>

        </Carousel>

      </div>
    </section>
  );
}