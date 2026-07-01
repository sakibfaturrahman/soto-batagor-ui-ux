"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const router = useRouter();

  // Efek Rahasia: Mengalihkan ke halaman login hanya jika menekan Ctrl + Alt + A
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        router.push("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Animasi halus saat navbar pertama kali dimuat
  const navbarVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Konstanta teks untuk efek gerak karakter per huruf
  const brandText = "Batagor Abah";

  // Varian Kontainer Huruf (Stagger Parent)
  const brandContainerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  // Varian Setiap Huruf Individu (Futuristic Elastic Jump)
  const letterVariants: Variants = {
    initial: { y: 0, color: "#4A3B32" },
    hover: {
      y: -4,
      color: "#8C6239",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center p-4 md:p-6 font-sans pointer-events-none"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Container Navbar - Melayang & Menyatu Harmonis */}
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 pointer-events-auto">
        {/* SISI KIRI: Identitas Brand Premium dengan Animasi Karakter Pop Up */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            variants={brandContainerVariants}
            initial="initial"
            whileHover="hover"
            className="flex items-center select-none overflow-hidden py-1"
          >
            {brandText.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-lg font-black tracking-wide inline-block"
                style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </Link>

        {/* SISI TENGAH: Menu Navigasi Sesuai Permintaan */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {[
            { name: "Beranda", href: "#beranda" },
            { name: "Tentang", href: "#tentang" },
            { name: "Keunikan", href: "#keunikan" },
            { name: "Komponen", href: "#komponen" },
            { name: "Ulasan", href: "#ulasan" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs lg:text-sm font-medium text-neutral-500 hover:text-[#8C6239] transition-colors relative py-1 group"
            >
              {item.name}
              {/* Efek Garis Bawah Elastis */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#8C6239] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* SISI KANAN: Kolom Pencarian Estetik */}
        <div className="flex items-center gap-4">
          <div className="relative w-48 lg:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <Input
              type="text"
              placeholder="Cari varian menu..."
              className="pl-9 pr-4 py-1.5 h-9 w-full rounded-full bg-neutral-50/60 border-neutral-200/60 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] text-xs text-[#4A3B32] font-normal placeholder:text-neutral-400"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
