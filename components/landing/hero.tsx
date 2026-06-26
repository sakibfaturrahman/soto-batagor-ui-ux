"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
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
    <section className="w-full min-h-screen bg-[#FDFBF7] flex items-center justify-center px-2 sm:px-4 py-6">
      <div className="relative w-full max-w-[96vw] h-[85vh] rounded-[2rem] overflow-hidden shadow-sm flex items-center justify-start">
        
        {/* Komponen Gambar Latar Belakang */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Konten Utama */}
        <motion.div
          className="relative z-10 max-w-2xl text-left px-6 md:px-16 flex flex-col items-start"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Judul Utama */}
          <motion.h1
            className="text-6xl md:text-8xl font-semibold text-white tracking-wide drop-shadow-sm selection:bg-[#8C6239]"
            variants={itemVariants}
          >
            Batagor
          </motion.h1>

          {/* ORNAMEN BARU: Garis Gelombang Mengalir Tepat di Bawah Teks Judul */}
          <motion.div 
            className="w-48 h-6 mb-6 mt-2 relative overflow-hidden"
            variants={itemVariants}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 200 24"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  pathOffset: [0, 0, 1],
                }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                d="M 0,12 Q 25,2 50,12 T 100,12 T 150,12 T 200,12"
                stroke="#8C6239" // Aksen warna cokelat saus kacang yang lembut
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Deskripsi */}
          <motion.p
            className="text-base md:text-lg text-neutral-200 font-normal leading-relaxed mb-8 max-w-lg text-left"
            variants={itemVariants}
          >
            Menikmati kelezatan warisan kuliner lokal yang konsisten menjaga
            kualitas rasa selama 5 tahun. Perpaduan adonan renyah ikan tenggiri
            asli dengan siraman bumbu kacang kental yang paling nikmat disantap
            selagi hangat[cite: 1].
          </motion.p>

          {/* Tombol Aksi */}
          <div className="flex flex-row items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <Button className="bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium px-8 py-6 rounded-full text-sm tracking-wide transition-colors shadow-md">
                Jelajahi rasa
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <Button
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/60 hover:text-white font-medium px-8 py-6 rounded-full text-sm tracking-wide transition-colors"
              >
                Cerita kami
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}