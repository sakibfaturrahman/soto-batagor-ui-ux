"use client";

import { motion, Variants } from "framer-motion";
import { MessageSquareShare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const whatsappNumber = "6285157096003"; // Format internasional tanpa tanda '+' atau '0' di depan
  const textMessage =
    "Halo Abah, saya ingin memesan batagor hangatnya. Apakah bisa dibantu?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#FDFBF7] pb-24 px-6 md:px-16 flex justify-center">
      {/* Kotak Kontainer Utama dengan Efek Soft & Minimalis */}
      <motion.div
        className="w-full max-w-5xl bg-[#F5EFEA] rounded-[2.5rem] p-8 md:p-16 text-center flex flex-col items-center justify-center border border-[#8C6239]/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.98 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
      >
        {/* Dekorasi lingkaran halus di latar belakang kotak */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#8C6239]/5 rounded-full blur-xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#4A3B32]/5 rounded-full blur-xl" />

        <div className="relative z-10 max-w-2xl flex flex-col items-center">
          {/* Label Kecil */}
          <motion.span
            className="text-xs font-semibold text-[#8C6239] tracking-wider uppercase bg-white/80 px-3 py-1 rounded-full mb-4 shadow-sm"
            variants={itemVariants}
          >
            Pemesanan online
          </motion.span>

          {/* Judul Ajakan (Tanpa Font Black & Tanpa Uppercase) */}
          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-[#4A3B32] leading-tight mb-4 tracking-wide"
            variants={itemVariants}
          >
            Siap menikmati kelezatan batagor abah sekarang?
          </motion.h2>

          {/* Deskripsi Menjawab Kebutuhan Kebanyakan Pembeli yang Suka Dibungkus */}
          <motion.p
            className="text-base text-neutral-600 font-normal leading-relaxed mb-8 max-w-lg"
            variants={itemVariants}
          >
            Mayoritas pelanggan kami lebih suka membawa pulang hidangan untuk
            dinikmati bersama keluarga[cite: 1]. Klik tombol di bawah untuk
            pesan lebih awal tanpa perlu mengantre lama di lokasi[cite: 1].
          </motion.p>

          {/* Tombol Interaktif Pesan Online (Micro-interactions / Feedback) */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={itemVariants}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium px-8 py-6 rounded-full text-sm tracking-wide transition-colors shadow-md flex items-center gap-2">
                <MessageSquareShare className="h-4 w-4" />
                <span>Pesan lewat WhatsApp</span>
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
