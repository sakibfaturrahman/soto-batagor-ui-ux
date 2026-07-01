"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Data dummy varian menu untuk dicocokkan (Match Between System & Real World)
const daftarMenuAbah = [
  "satu porsi penuh",
  "setengah porsi",
  "batagor spesial",
  "batagor kuah",
  "batagor kering",
];

export default function Navbar() {
  const router = useRouter();

  // State Logika Pencarian & Notifikasi
  const [searchQuery, setSearchQuery] = useState("");
  const [alertStatus, setAlertStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: "",
  });

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

  // Fungsi Trigger Alert Halus
  const triggerAlert = (success: boolean, message: string) => {
    setAlertStatus({ show: true, success, message });
    setTimeout(() => {
      setAlertStatus((prev) => ({ ...prev, show: false }));
    }, 2500); // Tampil selama 2.5 detik
  };

  // Handler Eksekusi Pencarian saat menekan tombol Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      triggerAlert(false, "Silakan masukkan kata kunci pencarian");
      return;
    }

    // Mencocokkan input dengan daftar menu aktif (case-insensitive)
    const isFound = daftarMenuAbah.some((menu) =>
      menu.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );

    if (isFound) {
      triggerAlert(
        true,
        `Menu "${searchQuery}" tersedia! Mengarahkan ke menu...`,
      );
      // Opsional: Kamu bisa mengarahkan halaman ke section menu di sini
      router.push("#komponen");
    } else {
      triggerAlert(false, `Menu "${searchQuery}" belum tersedia hari ini`);
    }

    setSearchQuery(""); // Bersihkan input setelah dicari
  };

  // Animasi halus saat navbar pertama kali dimuat
  const navbarVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const brandText = "Batagor Abah";

  const brandContainerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

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
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center p-4 md:p-6 font-sans pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        {/* Container Navbar */}
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 pointer-events-auto">
          {/* SISI KIRI: Brand */}
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

          {/* SISI TENGAH: Menu Navigasi */}
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

          {/* SISI KANAN: Form Pencarian */}
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-48 lg:w-60"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Cari varian menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 h-9 w-full rounded-full bg-neutral-50/60 border-neutral-200/60 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] text-xs text-[#4A3B32] font-normal placeholder:text-neutral-400"
              />
            </form>
          </div>
        </div>
      </motion.header>

      {/* ====================================================================== */}
      {/* REAL-TIME NOTIFICATION SYSTEM (Ciamik, Full Animasi, & Lembut) */}
      {/* ====================================================================== */}
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
