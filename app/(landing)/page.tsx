"use client";

import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Features from "@/components/landing/features";
import MenuSlider from "@/components/landing/menu-slider";
import Workflow from "@/components/landing/workflow";
import ReviewsHours from "@/components/landing/reviews-hours";
import Location from "@/components/landing/location";
import Cta from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <>
      {/* Bagian Hero Utama Batagor */}
      <Hero />
      {/* Bagian Tentang Batagor */}
      <About />
      {/* Bagian Fitur dan Keunikan Batagor */}
      <Features />
      {/* Bagian Menu Slider Batagor */}
      <MenuSlider />
      {/* Bagian Workflow atau Alur Pemesanan Batagor */}
      <Workflow />
      {/* Bagian Ulasan dan Jam Operasional Batagor */}
      <ReviewsHours />
      {/* Bagian Lainnya */}
      <Location />
      <Cta />

      {/* Nantinya kamu bisa menambahkan section lain di bawah ini, contoh:
        <KeunikanSection />
        <KomponenBahanSection />
        <UlasanSection />
      */}
    </>
  );
}
