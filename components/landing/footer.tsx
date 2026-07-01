"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#4A3B32] text-white py-12 px-6 md:px-16 flex justify-center border-t border-white/5">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Sisi Kiri: Hak Cipta & Nama Brand */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-lg font-semibold tracking-wide text-[#F5EFEA]">
            Batagor Abah
          </span>
          <p className="text-xs text-neutral-400 font-normal">
            &copy; {currentYear} Hak cipta dilindungi. Tugas IMK kelompok v1.
          </p>
        </div>

        {/* Sisi Tengah: Menu Pintasan Cepat (Reduce Memory Load) */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-neutral-300">
          <Link href="#" className="hover:text-[#8C6239] transition-colors">
            Beranda
          </Link>
          <Link
            href="#tentang"
            className="hover:text-[#8C6239] transition-colors"
          >
            Cerita kami
          </Link>
          <Link
            href="#keunikan"
            className="hover:text-[#8C6239] transition-colors"
          >
            Keunikan
          </Link>
          <Link
            href="#komponen"
            className="hover:text-[#8C6239] transition-colors"
          >
            Pilihan menu
          </Link>
        </nav>

        {/* Sisi Kanan: Identitas Kampus / Pembuat */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-normal">
          <span>Dibuat dengan</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <span>Universitas Perjuangan Tasikmalaya</span>
        </div>
      </div>
    </footer>
  );
}
