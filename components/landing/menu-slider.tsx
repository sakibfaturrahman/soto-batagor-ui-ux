"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  ShoppingCart,
  Info,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

// ======================================================================
// KOMPONEN TOMBOL KONTROL SLIDE (Muncul Eksklusif Di Mobile)
// ======================================================================
function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    // Perbaikan Kelas: `flex md:hidden` membuat kontrol aktif khusus di layar HP
    <div className="flex md:hidden items-center gap-2.5">
      <Button
        variant="outline"
        size="icon"
        className="rounded-xl h-9 w-9 border-neutral-200/80 bg-white text-[#4A3B32] active:bg-[#F5EFEA] transition-all disabled:opacity-30 shadow-sm"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        title="Geser menu sebelumnya"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-xl h-9 w-9 border-neutral-200/80 bg-white text-[#4A3B32] active:bg-[#F5EFEA] transition-all disabled:opacity-30 shadow-sm"
        disabled={!canScrollNext}
        onClick={scrollNext}
        title="Geser menu selanjutnya"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function MenuSlider() {
  // Data menu komprehensif mengacu pada penetapan harga riil Abah (Match Between System & Real World)
  const menuItems = [
    {
      title: "Setengah Porsi",
      price: "Rp 5.000",
      rawPrice: 5000,
      desc: "Pilihan pas untuk teman jajan santai kamu di sore hari.",
      composition: "isi 2 tahu sutra & 2 pangsit renyah asli", // Reduce Memory Load
      rating: "4.9 (450)",
      img: "/image/batagor.webp",
      available: true,
    },
    {
      title: "Satu Porsi Penuh",
      price: "Rp 10.000",
      rawPrice: 10000,
      desc: "Kombinasi lengkap tahu sutra dan pangsit untuk kenyang maksimal.",
      composition: "isi 4 tahu sutra & 4 pangsit renyah asli", // Reduce Memory Load
      rating: "4.9 (1.2k)",
      img: "/image/batagor3.webp",
      available: true,
    },
  ];

  // Mengarahkan pesanan langsung menggunakan template pesan (Flexibility & Efficiency of Use)
  const handleOrderWhatsApp = (title: string, price: string) => {
    const textMessage = `Halo Abah, saya mau pesan ${title} (${price}) yang ada di website. Apakah porsinya masih ready untuk dibeli sekarang?`;
    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/628123456789?text=${encodedText}`, "_blank");
  };

  return (
    <section
      id="komponen"
      className="w-full bg-[#FDFBF7] py-16 md:py-24 px-4 sm:px-6 md:px-16 flex justify-center select-none"
    >
      <div className="w-full max-w-7xl bg-[#F5F3EE] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-14 flex flex-col gap-8 shadow-[0_4px_30px_rgba(0,0,0,0.01)] border border-neutral-200/30">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          {/* HEADER KONTEN (Consistency and Standards) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="flex flex-col gap-2 text-left">
              <h2 className="text-2xl md:text-5xl font-bold text-[#4A3B32] tracking-wide max-w-md">
                Pilihan Porsi Menu Sederhana
              </h2>
            </div>
            <p className="text-xs md:text-base text-neutral-500 font-normal max-w-sm text-left md:text-right leading-relaxed">
              Dibuat segar setiap hari dengan adonan ikan tenggiri asli yang
              disajikan hangat dengan siraman bumbu kacang legit.
            </p>
          </div>

          {/* JAJARAN KARTU MENU (Aesthetic and Minimalist Design) */}
          <CarouselContent className="-ml-4 md:ml-6">
            {menuItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 basis-[88%] sm:basis-1/2 lg:basis-1/2 xl:basis-1/2"
              >
                <motion.div
                  className="relative h-[420px] md:h-[460px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-md flex flex-col justify-between p-5 md:p-8 bg-neutral-900"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Komponen Gambar Latar Belakang */}
                  <Image
                    src={item.img}
                    alt={`Menu batagor ${item.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  {/* ATAS KARTU: Ubah Status Menjadi Karakteristik Hidangan (Visibility of System Status) */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="bg-[#8C6239]/90 text-white backdrop-blur-sm px-3 py-1 md:px-3.5 md:py-1.5 rounded-full shadow-sm flex items-center gap-1 md:gap-1.5 text-[10px] md:text-[11px] font-medium tracking-wide border border-white/10">
                      <Flame className="h-3 w-3 md:h-3.5 md:w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                      <span>Disajikan Hangat</span>
                    </div>

                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm">
                      <span className="text-xs md:text-sm font-bold text-[#8C6239]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* BAWAH KARTU: Informasi Detail & Tombol Eksekusi Cepat */}
                  <div className="relative z-10 w-full text-left flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl md:text-xl lg:text-3xl font-semibold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-[11px] md:text-sm text-neutral-300 font-normal leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>

                    {/* Fitur Transparansi Komposisi (Reduce Memory Load) */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl flex items-center gap-2 w-full max-w-sm">
                      <Info className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                      <span className="text-[10px] md:text-[11px] text-neutral-200 font-medium tracking-wide">
                        {item.composition}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 md:gap-4 mt-2 pt-2 border-t border-white/10">
                      {/* Rating & Jam Ramai Terintegrasi */}
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                          <span className="text-[10px] md:text-[11px] font-semibold text-white">
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <Clock className="h-3 w-3" />
                          <span className="text-[8px] md:text-[9px] font-light">
                            Ramai: 12:00 - 16:00
                          </span>
                        </div>
                      </div>

                      {/* Tombol Pemesanan Langsung Kilat (Flexibility and Efficiency of Use) */}
                      <motion.button
                        onClick={() =>
                          handleOrderWhatsApp(item.title, item.price)
                        }
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-[#8C6239] hover:bg-[#734F2E] text-white text-[10px] md:text-[11px] font-medium px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl flex items-center gap-1.5 transition-colors shadow-md shrink-0"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Pesan</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* FOOTER CAROUSEL KONTROL */}
          <div className="flex items-center justify-between mt-8 md:mt-12 pt-5 border-t border-neutral-300/30">
            <div className="flex items-center gap-2 text-left pr-4">
              <span className="text-[10px] md:text-xs text-neutral-400 md:text-neutral-500 font-normal leading-relaxed">
                Menerima Pembayaran Non-Tunai Via QRIS Bebas Biaya Admin
              </span>
            </div>
            {/* Memanggil Komponen Navigasi Penggeser */}
            <CarouselControls />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
