"use client";

import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Efek Paralaks Sinematik berbasis Scroll (Advanced IMK Interaction)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium Custom Easing
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#FDFBF7] flex items-center justify-center px-3 sm:px-6 py-8"
    >
      <div className="relative w-full max-w-[95vw] h-[88vh] rounded-[2.5rem] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.02)] flex items-center justify-start border border-neutral-100/10">
        {/* BACKGROUND LAYER: Efek Paralaks Sinematik & Transisi Skala */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-bottom"
          style={{ y: yImage }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/image/batagor2.webp"
            alt="Lezatnya Batagor bumbu kacang autentik"
            fill
            priority
            className="object-cover scale-105"
          />
          {/* Lapisan Gradasi Warna Ganda (Lebih Kaya Kedalaman Kontras) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        </motion.div>

        {/* KONTEN UTAMA: Terbaca Sempurna & Elegan */}
        <motion.div
          className="relative z-20 max-w-2xl text-left px-8 md:px-20 flex flex-col items-start gap-1"
          style={{ opacity: opacityText }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Judul Utama */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white tracking-normal drop-shadow-sm mb-2 selection:bg-[#8C6239]"
            variants={itemVariants}
          >
            Batagor
          </motion.h1>

          {/* ORNAMEN BARU: Garis Gelombang Saus Kacang yang Presisi */}
          <motion.div
            className="w-36 h-4 mb-6 relative overflow-hidden"
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
                stroke="#8C6239"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Deskripsi */}
          <motion.p
            className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed mb-8 max-w-lg text-left tracking-wide"
            variants={itemVariants}
          >
            Menikmati kelezatan warisan kuliner lokal yang konsisten menjaga
            kualitas rasa selama 5 tahun. Perpaduan adonan renyah ikan tenggiri
            asli dengan siraman bumbu kacang kental yang paling nikmat disantap
            selagi hangat.
          </motion.p>

          {/* Tombol Aksi Mikro-interaktif */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium px-8 py-6 rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(140,98,57,0.15)] flex items-center gap-2">
                <span>Jelajahi Rasa</span>
                <ArrowRight size={14} />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="bg-white/5 hover:bg-white/10 text-white border-white/20 hover:text-white font-medium px-8 py-6 rounded-xl text-xs tracking-wider uppercase transition-all backdrop-blur-sm"
              >
                Cerita Kami
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
