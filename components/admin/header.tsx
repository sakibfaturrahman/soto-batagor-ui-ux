"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Mengubah rute URL menjadi teks judul halaman yang bersih (Visibility of System Status)
  const getPageTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "ringkasan usaha";
      case "/admin/orders":
        return "pesanan massal & dp";
      case "/admin/menu":
        return "kelola porsi menu";
      case "/admin/finance":
        return "laporan untung rugi";
      default:
        return "panel kontrol";
    }
  };

  return (
    <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between px-8 fixed top-0 right-0 z-30 select-none pl-72">
      
      {/* SISI KIRI: Dinamis Title Menyesuaikan Halaman Aktif (Consistency) */}
      <div className="flex flex-col text-left">
        <motion.h1 
          key={pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide"
        >
          {getPageTitle()}
        </motion.h1>
      </div>

      {/* SISI KANAN: Notifikasi & Informasi Akun Stasis untuk Demo Dosen */}
      <div className="flex items-center gap-4">
        
        {/* Tombol Notifikasi Mikro-interaktif (Feedback) */}
        <button className="p-2 text-neutral-400 hover:text-[#8C6239] hover:bg-neutral-50 rounded-xl transition-colors relative">
          <Bell size={16} className="stroke-[1.8]" />
          {/* Dot penanda ada notifikasi masuk */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#8C6239] rounded-full" />
        </button>

        {/* Pembatas Vertikal yang Lembut */}
        <div className="w-[1px] h-4 bg-neutral-200/60" />

        {/* Identitas Profil Admin Pemilik (Match Between System & Real World) */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-xs font-medium text-[#4A3B32] lowercase">
              abah batagor
            </span>
            <span className="text-[10px] text-neutral-400 font-light lowercase">
              pemilik usaha
            </span>
          </div>
          
          {/* Avatar Lingkaran Minimalis */}
          <div className="w-8 h-8 rounded-xl bg-[#F5EFEA] text-[#8C6239] flex items-center justify-center border border-[#8C6239]/10">
            <User size={14} className="stroke-[2]" />
          </div>
        </div>

      </div>

    </header>
  );
}