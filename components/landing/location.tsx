"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, AlertCircle, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";

// Data rekomendasi menu utama Abah Dadan
const daftarMenuAbah = ["Satu Porsi Penuh", "Setengah Porsi"];

export default function Navbar() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // State manajemen data interaksi pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecommendations, setFilteredRecommendations] =
    useState<string[]>(daftarMenuAbah);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: "",
  });

  // Efek Kombinasi Tombol Rahasia: Masuk panel login (Ctrl + Alt + A)
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

  // Efek Deteksi Klik di Luar Komponen untuk Menutup Dropdown Keamanan
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Data Rekomendasi Secara Real-Time Mengikuti Ketikan Pengguna
  useEffect(() => {
    const queryClean = searchQuery.trim().toLowerCase();
    if (queryClean === "") {
      setFilteredRecommendations(daftarMenuAbah);
    } else {
      const filtered = daftarMenuAbah.filter((menu) =>
        menu.toLowerCase().includes(queryClean),
      );
      setFilteredRecommendations(filtered);
    }
  }, [searchQuery]);

  // Fungsi Pemicu Alert Notifikasi Halus di Sudut Layar
  const triggerAlert = (success: boolean, message: string) => {
    setAlertStatus({ show: true, success, message });
    setTimeout(() => {
      setAlertStatus((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  // Fungsi Eksekusi ketika Item Rekomendasi Diklik
  const handleSelectMenu = (menuName: string) => {
    setSearchQuery(menuName);
    setIsDropdownOpen(false);
    triggerAlert(true, `Menu "${menuName}" Tersedia! Mengarahkan Halaman...`);

    // Alihkan navigasi langsung menuju section target di landing page
    router.push("#komponen");
  };

  // Fungsi Pencarian Manual saat Pengguna Menekan Tombol Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      triggerAlert(
        false,
        "Silakan masukkan kata kunci pencarian terlebih dahulu",
      );
      return;
    }

    // Melakukan pencarian fleksibel (mencocokkan kata kunci sebagian)
    const matchedMenu = daftarMenuAbah.find((menu) =>
      menu.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );

    if (matchedMenu) {
      setSearchQuery(matchedMenu);
      triggerAlert(
        true,
        `Menu "${matchedMenu}" Ditemukan! Mengarahkan Halaman...`,
      );
      setIsDropdownOpen(false);
      router.push("#komponen");
    } else {
      triggerAlert(
        false,
        `Menu "${searchQuery}" Belum Tersedia Untuk Hari Ini`,
      );
    }
  };

  // Varian Animasi Pemuatan Navbar Utama
  const navbarVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
        {/* Kontainer Utama Box Navbar */}
        <div className="w-full max-w-7xl bg-white/90 backdrop-blur-md rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-100 pointer-events-auto relative">
          {/* SISI KIRI: Identitas Brand Usaha */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-sm sm:text-base font-black tracking-wide text-[#4A3B32] group-hover:text-[#8C6239] transition-colors">
              Batagor Abah
            </span>
          </Link>

          {/* SISI TENGAH: Jajaran Menu Navigasi Landing Page */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 mx-4">
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
                className="text-xs lg:text-sm font-medium text-neutral-500 hover:text-[#8C6239] transition-colors relative py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* SISI KANAN: Kontainer Formulir Pencarian Komplit */}
          <div
            className="flex items-center gap-4 shrink-0"
            ref={searchContainerRef}
          >
            <div className="relative w-44 sm:w-56 lg:w-64">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 z-10" />
                <Input
                  type="text"
                  placeholder="Cari varian menu..."
                  value={searchQuery}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 h-9 w-full rounded-full bg-neutral-50/60 border-neutral-200/60 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] text-xs text-[#4A3B32] font-normal placeholder:text-neutral-400 relative z-10"
                />
              </form>

              {/* DROPDOWN MENU REKOMENDASI (Ditempel Mutlak Di Bawah Input Field) */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute top-11 right-0 left-0 bg-white border border-neutral-100 rounded-2xl p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.05)] z-50 flex flex-col max-h-56 overflow-y-auto"
                  >
                    {/* Label Kategori */}
                    <div className="px-3 py-2 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-50 mb-1 text-left">
                      Rekomendasi Menu
                    </div>

                    {/* Rendering Daftar Pilihan */}
                    {filteredRecommendations.length > 0 ? (
                      filteredRecommendations.map((menu, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectMenu(menu)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-neutral-600 hover:text-[#8C6239] hover:bg-[#8C6239]/5 rounded-xl transition-all text-left"
                        >
                          <Utensils
                            size={12}
                            className="text-neutral-400 shrink-0"
                          />
                          <span>{menu}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-xs text-neutral-400 font-light text-center">
                        Menu tidak ditemukan
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* POP-UP SISTEM NOTIFIKASI LAYAR UTAMA */}
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
