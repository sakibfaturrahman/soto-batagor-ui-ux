"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, Clock, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Location() {
  const [copied, setCopied] = useState(false);
  const fullAddress = "Batagor dan Teh Manis Abah Gerbang Unper Tasikmalaya";

  // Fungsi menyalin alamat otomatis untuk mempermudah pengguna (Shortcut & Feedback)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset status setelah 2 detik
    } catch (err) {
      console.error("Gagal menyalin alamat", err);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="ulasan"
      className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center"
    >
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* SISI KIRI: Informasi Alamat & Jam Ramai Operasional */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <motion.span
            className="text-xs font-semibold text-[#8C6239] tracking-wider uppercase bg-[#8C6239]/10 px-3 py-1 rounded-full mb-4"
            variants={itemVariants}
          >
            Lokasi warung
          </motion.span>

          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-[#4A3B32] leading-tight mb-8"
            variants={itemVariants}
          >
            Kunjungi kami di gerbang kampus
          </motion.h2>

          <div className="flex flex-col gap-6 w-full mb-8">
            {/* Blok Alamat Fisik */}
            <motion.div
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="p-3 rounded-xl bg-[#F5EFEA] text-[#8C6239] shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400 font-normal">
                  Alamat jualan
                </span>
                <span className="text-base text-[#4A3B32] font-medium mt-0.5">
                  Batagor dan teh manis abah, gerbang Universitas Perjuangan
                  Tasikmalaya
                </span>
              </div>
            </motion.div>

            {/* Blok Jam Operasional & Jam Ramai Hasil Wawancara */}
            <motion.div
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="p-3 rounded-xl bg-[#F5EFEA] text-[#8C6239] shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400 font-normal">
                  Waktu operasional
                </span>
                <span className="text-base text-[#4A3B32] font-medium mt-0.5">
                  Setiap hari (paling ramai setelah Dzuhur hingga sore hari)
                </span>
              </div>
            </motion.div>
          </div>

          {/* Tombol Pintasan Salin Alamat (Shortcut / Reduce Memory Load) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleCopy}
              variant="outline"
              className="border-neutral-200 hover:bg-[#F5EFEA] text-[#4A3B32] px-6 py-5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600">
                    Alamat berhasil disalin
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin nama lokasi</span>
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* SISI KANAN: Integrasi Frame Google Maps Kamu */}
        <motion.div
          className="lg:col-span-7 w-full h-[350px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-100"
          variants={itemVariants}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.3127966045496!2d108.2244971!3d-7.3533618999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f57a19d277229%3A0x36517c1edca0310d!2sBatagor%20dan%20Teh%20Manis%20Abah%20Gerbang%20Unper%20Tasik!5e0!3m2!1sid!2sid!4v1782435520454!5m2!1sid!2sid"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
