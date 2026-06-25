"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion"; // Import Variants
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  // Animasi halus saat navbar pertama kali dimuat (Visibility of System Status)
  const navbarVariants: Variants = { // Add Variants type
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1, // Change ease to cubic-bezier array to satisfy Easing type
      transition: { duration: 0.5, ease: [0, 0, 0.58, 1] }, // Standard easeOut cubic-bezier
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center p-4 md:p-6 font-sans pointer-events-none"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Container Navbar - Dibuat melayang & menyatu dengan gaya container Hero */}
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-neutral-100 pointer-events-auto">
        {/* Sisi Kiri: Logo / Identitas Brand (Tanpa Uppercase/Black) */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-semibold text-[#4A3B32] tracking-wide transition-colors group-hover:text-[#8C6239]">
            Batagor.io
          </span>
        </Link>

        {/* Sisi Tengah: Menu Navigasi Utama (Consistency & Reduce Memory Load) */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Beranda", href: "/" },
            { name: "Keunikan", href: "#keunikan" },
            { name: "Komponen", href: "#komponen" },
            { name: "Ulasan", href: "#ulasan" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-neutral-600 hover:text-[#8C6239] transition-colors relative py-1 group"
            >
              {item.name}
              {/* Efek garis bawah interaktif yang smooth saat di-hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#8C6239] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Sisi Kanan: Pencarian Ringkas & Tombol Aksi Admin */}
        <div className="flex items-center gap-4">
          {/* Kolom Pencarian Statis Interaktif seperti pada Gambar Referensi */}
          <div className="relative hidden lg:block w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Cari varian atau lokasi..."
              className="pl-9 pr-4 py-1.5 h-9 w-full rounded-full bg-neutral-50/50 border-neutral-200/80 focus-visible:ring-[#8C6239] text-sm text-[#4A3B32] font-normal"
            />
          </div>

          {/* Tombol Menuju Halaman Login Admin (Micro-interactions / Feedback) */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/login">
              <Button className="bg-[#4A3B32] hover:bg-[#3D3028] text-white font-medium px-5 h-9 rounded-full text-xs tracking-wide shadow-sm transition-colors">
                Masuk admin
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
