"use client";

import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Efek Paralaks Sinematik berbasis Scroll
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#FDFBF7] flex items-center justify-center px-3 sm:px-6 py-4 sm:py-8"
    >
      {/* Container Utama: Tinggi adaptif di mobile (h-auto + padding vertikal ekstra) dan statis h-[88vh] di desktop */}
      <div className="relative w-full max-w-[95vw] h-auto min-h-[80vh] sm:h-[88vh] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.02)] flex items-center justify-start border border-neutral-100/10 py-12 sm:py-0">
        
        {/* BACKGROUND LAYER: Efek Paralaks Sinematik */}
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
          {/* Lapisan Gradasi Kontras */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 sm:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        </motion.div>

        {/* KONTEN UTAMA */}
        <motion.div
          className="relative z-20 max-w-2xl text-left px-6 sm:px-12 md:px-20 flex flex-col items-start gap-1"
          style={{ opacity: opacityText }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Judul Utama Responsif */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-normal drop-shadow-sm mb-2 selection:bg-[#8C6239]"
            variants={itemVariants}
          >
            Batagor
          </motion.h1>

          {/* ORNAMEN: Garis Gelombang Saus Kacang */}
          <motion.div
            className="w-28 sm:w-36 h-3 sm:h-4 mb-5 sm:mb-6 relative overflow-hidden"
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

          {/* Deskripsi Responsif */}
          <motion.p
            className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg text-left tracking-wide"
            variants={itemVariants}
          >
            Menikmati kelezatan warisan kuliner lokal yang konsisten menjaga
            kualitas rasa selama 5 tahun. Perpaduan adonan renyah ikan tenggiri
            asli dengan siraman bumbu kacang kental yang paling nikmat disantap
            selagi hangat.
          </motion.p>

          {/* Tombol Aksi Mikro-interaktif dengan Navigasi Anchor */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {/* Navigasi Ke Section Menu (#komponen) */}
            <Link href="#komponen" scroll={true} className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full sm:w-auto bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(140,98,57,0.15)] flex items-center justify-center gap-2">
                  <span>Jelajahi Rasa</span>
                  <ArrowRight size={14} />
                </Button>
              </motion.div>
            </Link>

            {/* Navigasi Ke Section About (#tentang) */}
            <Link href="#tentang" scroll={true} className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/20 hover:text-white font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-sm flex items-center justify-center"
                >
                  Cerita Kami
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}