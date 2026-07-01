"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Utensils,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const daftarMenuAbah = [
  "satu porsi penuh",
  "setengah porsi",
  "batagor spesial",
  "batagor kuah",
  "batagor kering",
];

export default function Navbar() {
  const router = useRouter();
  const navContainerRef = useRef<HTMLDivElement>(null);

  // State Logika Kontrol
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

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

  // Menutup menu mobile & search jika klik di luar navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        if (searchQuery === "") setIsSearchExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  const triggerAlert = (success: boolean, message: string) => {
    setAlertStatus({ show: true, success, message });
    setTimeout(() => {
      setAlertStatus((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      triggerAlert(false, "Silakan masukkan kata kunci pencarian");
      return;
    }

    const isFound = daftarMenuAbah.some((menu) =>
      menu.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );

    if (isFound) {
      triggerAlert(
        true,
        `Menu "${searchQuery}" tersedia! Mengarahkan ke menu...`,
      );
      router.push("#komponen");
      setIsSearchExpanded(false);
    } else {
      triggerAlert(false, `Menu "${searchQuery}" belum tersedia hari ini`);
    }
    setSearchQuery("");
  };

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
        staggerChildren: 0.05, // as const, // Add 'as const' here
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
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-full px-5 py-3 md:px-6 md:py-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 pointer-events-auto transition-all duration-300 relative z-50">
          {/* SISI KIRI: Brand Identity dengan Animasi Membal per Huruf (Hancur/Sembunyi jika Search Mobile Aktif) */}
          <div
            className={`${isSearchExpanded ? "hidden md:flex" : "flex"} items-center gap-2 shrink-0`}
          >
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

          {/* SISI TENGAH: Menu Navigasi Desktop */}
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

          {/* SISI KANAN: Penanganan Fleksibel Sesi Kolom Input */}
          <div
            className={`flex items-center gap-2 md:gap-4 ${isSearchExpanded ? "w-full md:w-auto" : "justify-end"} flex-1 md:flex-initial`}
          >
            {/* [OPSI A] FORM PENCARIAN MOBILE (Melebar Penuh Menguasai Ruang Screen) */}
            <motion.div
              animate={{ width: isSearchExpanded ? "100%" : "36px" }}
              className="relative h-9 flex items-center block md:hidden"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="w-full h-full relative flex items-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isSearchExpanded) {
                      setIsSearchExpanded(true);
                      setIsMobileMenuOpen(false);
                    } else if (!searchQuery.trim()) {
                      setIsSearchExpanded(false);
                    }
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-neutral-400 hover:text-[#8C6239] transition-colors"
                >
                  <Search size={15} className="stroke-[2.2]" />
                </button>

                <Input
                  type="text"
                  placeholder="Cari varian menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-9 pr-10 py-1.5 h-full rounded-full bg-neutral-50/60 border-neutral-200/60 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] text-xs text-[#4A3B32] placeholder:text-neutral-400 transition-opacity duration-150 ${
                    isSearchExpanded
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 pointer-events-none"
                  }`}
                />

                {/* Tombol X Khusus untuk Menutup Search Lebar Mobile */}
                {isSearchExpanded && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
            </motion.div>

            {/* [OPSI B] FORM PENCARIAN DESKTOP (Stasis Lebar Sempurna) */}
            <div className="hidden md:block w-48 lg:w-60 h-9">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full h-full relative flex items-center"
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Cari varian menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 h-full w-full rounded-full bg-neutral-50/60 border-neutral-200/60 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] text-xs text-[#4A3B32] font-normal placeholder:text-neutral-400"
                />
              </form>
            </div>

            {/* HAMBURGER TRIGGER BUTTON (Sembunyi jika kolom search sedang ekspansi penuh) */}
            <div
              className={`md:hidden ${isSearchExpanded ? "hidden" : "flex"} items-center`}
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsSearchExpanded(false);
                }}
                className="p-2 text-[#4A3B32] hover:bg-neutral-50 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
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

      {/* ALERT NOTIFICATION REAL-TIME */}
      <AnimatePresence>
        {alertStatus.show && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 bg-[#4A3B32] text-white px-5 py-4 rounded-2xl shadow-xl border border-white/5 flex items-center gap-3 text-xs font-medium tracking-wide"
          >
            {alertStatus.success ? (
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-amber-400 shrink-0" />
            )}
            <span>{alertStatus.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
