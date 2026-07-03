"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const navContainerRef = useRef<HTMLDivElement>(null);

  // State Logika Kontrol Menu Mobile saja
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek Rahasia: Mengalihkan ke halaman login (Ctrl + Alt + A)
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

  // Menutup menu mobile jika mendeteksi klik di luar navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ======================================================================
  // KONSTRUKSI ANIMASI KUSTOM (FRAMER MOTION)
  // ======================================================================
  const navbarVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const brandContainerVariants = {
    initial: {},
    hover: { transition: { staggerChildren: 0.03 } },
  };

  const brandLetterVariants: Variants = {
    initial: { y: 0, color: "#4A3B32" },
    hover: {
      y: -5,
      color: "#8C6239",
      transition: { type: "spring", stiffness: 450, damping: 12 },
    },
  };

  const menuCardVariants: Variants = {
    hidden: { opacity: 0, y: -15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        ref={navContainerRef}
        className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col items-center p-4 md:p-6 font-sans pointer-events-none gap-3"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        {/* Container Utama Navbar */}
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 pointer-events-auto transition-all duration-300 relative z-50">
          {/* SISI KIRI: Brand Identity dengan Animasi Membal per Huruf */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="overflow-hidden py-1">
              <motion.div
                variants={brandContainerVariants}
                initial="initial"
                whileHover="hover"
                className="text-base md:text-lg font-black tracking-wide select-none flex items-center"
              >
                {"Batagor Abah".split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    variants={brandLetterVariants}
                    className="inline-block"
                    style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </Link>
          </div>

          {/* SISI TENGAH/KANAN: Menu Navigasi Desktop */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { name: "Beranda", href: "#beranda" },
              { name: "Tentang", href: "#tentang" },
              { name: "Keunikan", href: "#keunikan" },
              { name: "Menu", href: "#komponen" },
              { name: "Ulasan", href: "#ulasan" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs lg:text-sm font-medium text-neutral-500 hover:text-[#8C6239] transition-colors relative py-1 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#8C6239] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* HAMBURGER TRIGGER BUTTON (Hanya Tampil di Mobile di Ujung Kanan) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#4A3B32] hover:bg-neutral-50 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* INTERACTIVE MOBILE NAV CARD DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full bg-white/95 backdrop-blur-md rounded-[2rem] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col gap-1 pointer-events-auto md:hidden"
            >
              {[
                { name: "Beranda", href: "#beranda" },
                { name: "Tentang", href: "#tentang" },
                { name: "Keunikan", href: "#keunikan" },
                { name: "Menu", href: "#komponen" },
                { name: "Ulasan", href: "#ulasan" },
              ].map((item) => (
                <motion.div key={item.name} variants={menuItemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block py-3.5 px-4 text-xs font-semibold text-neutral-500 hover:text-[#8C6239] hover:bg-[#8C6239]/5 rounded-xl text-left transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
