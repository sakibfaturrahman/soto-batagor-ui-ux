"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 font-sans select-none relative overflow-hidden text-[#4A3B32]">
      {/* ====================================================================== */}
      {/* ELEMEN VISUAL: ILUSTRASI MODERN & LEMBUT (Tanpa Icon Berlebihan) */}
      {/* ====================================================================== */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-4">
        {/* 1. Efek Ambient Glow Lembut di Latar Belakang */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-48 h-48 bg-[#8C6239]/5 rounded-full blur-3xl pointer-events-none"
        />

        {/* 2. Angka 404 Besar Samar Transparan */}
        <h1 className="absolute text-[11rem] font-bold text-[#8C6239]/5 font-mono tracking-tighter select-none">
          404
        </h1>

        {/* 3. Ilustrasi Batagor & Piring Anyaman Bambu (CSS Rendered) */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Varian Batagor Melayang Rendah (Idle Floating Animation) */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-[#8C6239] rounded-2xl border-4 border-white shadow-sm flex items-center justify-center relative z-10"
          >
            {/* Tekstur Guratan Tahu Lembek Minimalis */}
            <div className="w-8 h-8 rounded-lg bg-amber-100/20 rotate-45" />
          </motion.div>

          {/* Bayangan Batagor di Atas Piring */}
          <motion.div
            animate={{ scale: [1, 0.85, 1], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-2 bg-[#4A3B32] rounded-full blur-sm my-3"
          />

          {/* Piring Anyaman Bambu Tradisional Pasif */}
          <div className="w-28 h-4 bg-[#F5EFEA] border border-[#8C6239]/10 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-20 h-2 border-b border-dashed border-[#8C6239]/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* KONTEN TEKS: Pesan Komunikasi yang Jelas & Halus */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center text-center gap-3 max-w-sm relative z-10"
      >
        <h2 className="text-xl font-bold tracking-wide">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-xs text-neutral-400 font-light leading-relaxed px-4">
          Maaf, porsi halaman yang kamu cari tidak tersedia atau rute URL telah
          dipindahkan oleh pengelola sistem.
        </p>

        {/* ====================================================================== */}
        {/* TOMBOL AKSI: Kembali Ke Gerbang Utama */}
        {/* ====================================================================== */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full px-8"
        >
          <Button
            onClick={() => router.back()} // Menggunakan router.back() untuk kembali ke rute sebelumnya secara dinamis
            className="w-full h-12 bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium rounded-xl text-xs tracking-wide transition-colors shadow-sm"
          >
            Kembali Ke Halaman Sebelumnya
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
