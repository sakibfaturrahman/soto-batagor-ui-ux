"use client";

import { motion, Variants } from "framer-motion";
import {
  Utensils,
  ShieldCheck,
  History,
  Award,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Kartu fitur disesuaikan langsung dengan keunggulan produk dari hasil wawancara
  const featureCards = [
    {
      title: "Kualitas rasa konsisten",
      desc: "Menjaga kualitas kelezatan adonan dan racikan bumbu secara turun-temurun hingga hafal di hati pelanggan tetap.",
      icon: Award,
    },
    {
      title: "Gurih alami ikan tenggiri",
      desc: "Tekstur adonan yang pas dengan cita rasa khas daging ikan segar tanpa campuran bahan pengawet buatan.",
      icon: Sparkles,
    },
    {
      title: "Praktis untuk dibawa pulang",
      desc: "Kemasan yang terjaga rapi, dirancang khusus agar batagor tetap terasa renyah dan nikmat saat disantap di rumah.",
      icon: ShoppingBag,
    },
  ];

  // Statistik diadaptasi dari profil operasional riil UMKM narasumber
  const stats = [
    { value: "5 tahun", label: "Menetap melayani", icon: History },
    { value: "100%", label: "Ikan tenggiri asli", icon: ShieldCheck },
    { value: "Bungkus", label: "Pilihan utama", icon: Utensils },
  ];

  return (
    <section
      id="keunikan"
      className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center"
    >
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* SISI KIRI: Judul, Deskripsi Berbasis Storytelling Wawancara, dan Statistik */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#4A3B32] leading-tight mb-4"
            variants={itemVariants}
          >
            Kenapa ribuan pencinta kuliner memilih batagor kami
          </motion.h2>

          <motion.p
            className="text-base text-neutral-600 font-normal leading-relaxed mb-12 max-w-md"
            variants={itemVariants}
          >
            Berawal dari rintisan sederhana yang kini telah bertahan selama 5
            tahun di lokasi yang sama, kami terus konsisten menyajikan harmoni
            rasa batagor terbaik yang paling nikmat disantap selagi hangat.
          </motion.p>

          {/* Baris Statistik Ringkas (Mengadaptasi Bagian Bawah Gambar Referensi) */}
          <motion.div
            className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-neutral-200/60"
            variants={itemVariants}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-start">
                  <div className="p-2 rounded-full bg-[#8C6239]/10 text-[#8C6239] mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xl md:text-2xl font-semibold text-[#4A3B32]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-neutral-500 font-normal mt-0.5">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* SISI KANAN: Deretan Kartu Fitur Vertikal (Mengadaptasi Kanan Gambar Referensi) */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4 w-full">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 1)" }}
                className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-neutral-100 flex items-start gap-4 shadow-sm transition-all duration-300"
              >
                {/* Lingkaran Ikon dengan Warna Muted Accent */}
                <div className="p-3 rounded-xl bg-[#F5EFEA] text-[#8C6239] shrink-0">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Konten Teks Kartu */}
                <div className="flex flex-col text-left">
                  <h3 className="text-lg font-black text-[#4A3B32] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
