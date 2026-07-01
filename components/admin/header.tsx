"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Shield,
  X,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // State untuk Dropdown Profil & Modal Inbox
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);

  // Format Kapital Di Awal Kata (Title Case)
  const getPageTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Ringkasan Usaha";
      case "/admin/input-kilat":
        return "Catat Jualan Kilat";
      case "/admin/finance":
        return "Laporan Untung Rugi";
      case "/admin/pengaturan":
        return "Kelola Varian Menu";
      default:
        return "Panel Kontrol";
    }
  };

  // Menutup dropdown & inbox otomatis jika klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        inboxRef.current &&
        !inboxRef.current.contains(event.target as Node)
      ) {
        setIsInboxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between px-4 sm:px-10 fixed top-0 right-0 z-30 select-none md:pl-80 pl-6 transition-all duration-300">
      {/* SISI KIRI: Judul Halaman Dinamis Adaptif */}
      <div className="flex flex-col text-left min-w-0 flex-1 justify-center">
        <motion.h1
          key={pathname}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-lg font-semibold text-[#4A3B32] tracking-wide truncate pr-4"
        >
          {getPageTitle()}
        </motion.h1>
      </div>

      {/* SISI KANAN: Navigasi Aksi & Dropdown Menu */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0 relative">
        {/* WADAH INBOX PESAN */}
        <div className="relative" ref={inboxRef}>
          <button
            onClick={() => {
              setIsInboxOpen(!isInboxOpen);
              setIsDropdownOpen(false);
            }}
            className="p-2 sm:p-2.5 text-neutral-400 hover:text-[#8C6239] hover:bg-neutral-50 rounded-xl transition-colors relative"
          >
            <Bell size={18} className="stroke-[1.8]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* MODAL POP-UP INBOX */}
          <AnimatePresence>
            {isInboxOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute right-[-40px] sm:right-0 mt-4 w-72 sm:w-80 bg-white border border-neutral-100 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] z-50 flex flex-col overflow-hidden"
              >
                {/* Header Inbox */}
                <div className="px-4 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-[#FDFBF7]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#8C6239]" />
                    <span className="text-xs font-semibold text-[#4A3B32]">
                      Pesan Masuk
                    </span>
                  </div>
                  <button
                    onClick={() => setIsInboxOpen(false)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* List Pesan */}
                <div className="flex flex-col max-h-64 overflow-y-auto p-1.5">
                  <div className="p-2.5 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer flex gap-2.5 items-start relative">
                    <div className="absolute top-3.5 left-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 ml-1.5">
                      <MessageSquare size={14} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-[11px] font-semibold text-[#4A3B32]">
                        Pesanan Massal Baru
                      </span>
                      <p className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">
                        Ada permintaan 50 porsi untuk acara kampus besok siang.
                      </p>
                      <span className="text-[8px] text-neutral-400 mt-0.5">
                        10 menit yang lalu
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer flex gap-2.5 items-start">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 ml-3">
                      <Shield size={14} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-[11px] font-semibold text-[#4A3B32]">
                        Laporan Bulanan Siap
                      </span>
                      <p className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">
                        Laporan keuntungan bersih bulan ini sudah dihitung
                        otomatis.
                      </p>
                      <span className="text-[8px] text-neutral-400 mt-0.5">
                        2 jam yang lalu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Inbox */}
                <Link
                  href="#"
                  onClick={() => setIsInboxOpen(false)}
                  className="p-3 text-center text-[11px] font-medium text-[#8C6239] hover:bg-neutral-50 border-t border-neutral-100 transition-colors"
                >
                  Lihat Semua Pesan
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pembatas Vertikal */}
        <div className="w-[1px] h-5 bg-neutral-200" />

        {/* WADAH PROFIL DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <motion.div
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsInboxOpen(false);
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 sm:gap-3.5 cursor-pointer p-1 hover:bg-neutral-50 rounded-xl transition-colors"
          >
            {/* Teks Identitas Pengelola */}
            <div className="flex flex-col text-right hidden sm:flex gap-0.5">
              <span className="text-xs font-semibold text-[#4A3B32]">
                Abah Dadan
              </span>
              <span className="text-[10px] text-neutral-400 font-light tracking-wide">
                Pemilik Usaha
              </span>
            </div>

            {/* Avatar & Ikon Chevron */}
            <div className="w-9 h-9 rounded-xl bg-[#F5EFEA] text-[#8C6239] flex items-center justify-center border border-[#8C6239]/15 shrink-0 relative">
              <User size={16} className="stroke-[2]" />
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-1 -right-1 bg-white border border-neutral-100 rounded-full p-0.5 shadow-sm text-neutral-500"
              >
                <ChevronDown size={10} className="stroke-[2.5]" />
              </motion.div>
            </div>
          </motion.div>

          {/* MODAL POP-UP MENU DROPDOWN PROFIL */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute right-0 mt-4 w-48 bg-white border border-neutral-100 rounded-[1.25rem] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.06)] z-50 flex flex-col gap-0.5 text-left"
              >
                <div className="px-3 py-2.5 mb-1 bg-[#FDFBF7] rounded-xl flex items-center gap-2 border border-[#8C6239]/5">
                  <Shield size={12} className="text-[#8C6239]" />
                  <span className="text-[10px] font-medium text-[#8C6239]">
                    Sesi Admin Aktif
                  </span>
                </div>

                {/* Link Aktif Menuju Pengaturan Akun */}
                <Link
                  href="/admin/pengaturan"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-neutral-600 hover:text-[#4A3B32] hover:bg-neutral-50 rounded-xl transition-colors"
                >
                  <Settings size={14} className="stroke-[1.8]" />
                  <span>Pengaturan Akun</span>
                </Link>

                <div className="w-full h-[1px] bg-neutral-100 my-1" />

                {/* Tombol Aksi Keluar Sistem Fungsional */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/admin/login");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50/60 rounded-xl transition-colors text-left"
                >
                  <LogOut size={14} className="stroke-[1.8]" />
                  <span>Keluar Sistem</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
