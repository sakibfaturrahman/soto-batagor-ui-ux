"use report";

import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  // Variasi animasi untuk kemudahan kontrol (Reduce Memory Load & Maintainability)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Efek muncul berurutan yang halus
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as Easing, // Power3 ease-out untuk kesan premium
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 md:p-8 font-sans">
      {/* Container Utama dengan Sudut Melengkung Lebar seperti Image_73cd35.png */}
      <div className="relative w-full max-w-7xl h-[85vh] rounded-[2rem] overflow-hidden shadow-sm flex items-center justify-center">
        {/* Komponen Gambar Latar Belakang Statis dengan Animasi Pemuatan */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            src="/image/batagor.webp"
            alt="Lezatnya batagor bumbu kacang autentik"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay gelap halus untuk menjamin keterbacaan teks (Visibility of System Status) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        </motion.div>

        {/* Konten Utama di Tengah Halaman */}
        <motion.div
          className="relative z-10 max-w-3xl text-center px-6 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Headline Utama - Masif, Semibold (bukan Black), dan Tanpa Uppercase */}
          <motion.h1
            className="text-6xl md:text-8xl font-semibold text-white tracking-wide drop-shadow-sm mb-4 selection:bg-[#8C6239]"
            variants={itemVariants}
          >
            Batagor
          </motion.h1>

          {/* Deskripsi - Rapi, Mudah Dibaca, Tanpa Huruf Italic yang Merusak Estetika */}
          <motion.p
            className="text-base md:text-lg text-neutral-200 font-normal leading-relaxed mb-8 max-w-xl text-center"
            variants={itemVariants}
          >
            Menikmati kelezatan autentik kuliner tradisional, perpaduan sempurna
            tahu lembut dan adonan ikan tenggiri berbalut renyahnya pangsit
            dengan siraman saus kacang yang gurih.
          </motion.p>

          {/* Kelompok Tombol Aksi - Interaktif dengan Mikro-Interaksi */}
          <motion.div
            className="flex flex-row items-center gap-4"
            variants={itemVariants}
          >
            {/* Tombol Utama (Aksen Penuh) */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium px-8 py-6 rounded-full text-sm tracking-wide transition-colors shadow-md">
                Jelajahi rasa
              </Button>
            </motion.div>

            {/* Tombol Kedua (Outline) */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/60 hover:text-white font-medium px-8 py-6 rounded-full text-sm tracking-wide transition-colors"
              >
                Cerita kami
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
