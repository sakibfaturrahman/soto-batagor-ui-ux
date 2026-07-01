"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "ringkasan usaha";
      case "/admin/input-kilat":
        return "catat jualan kilat";
      case "/admin/finance":
        return "laporan untung rugi";
      default:
        return "panel kontrol";
    }
  };

  return (
    <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between px-4 sm:px-8 fixed top-0 right-0 z-30 select-none md:pl-72 pl-16 transition-all duration-300">
      {/* SISI KIRI: Ditambahkan margin-left (ml-2) atau pl untuk memberikan gap aman dari tombol menu hamburger */}
      <div className="flex flex-col text-left pl-2 md:pl-0 min-w-0 flex-1 justify-center">
        <motion.h1
          key={pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-xs sm:text-sm font-semibold text-[#4A3B32] lowercase tracking-wide truncate pr-4"
        >
          {getPageTitle()}
        </motion.h1>
      </div>

      {/* SISI KANAN: Tetap konsisten dan presisi di ujung kanan */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Tombol Notifikasi */}
        <button className="p-2 text-neutral-400 hover:text-[#8C6239] hover:bg-neutral-50 rounded-xl transition-colors relative">
          <Bell size={16} className="stroke-[1.8]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#8C6239] rounded-full" />
        </button>

        {/* Pembatas Vertikal */}
        <div className="w-[1px] h-4 bg-neutral-200/60" />

        {/* Profil Informasi */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col text-right hidden xs:flex">
            <span className="text-[11px] sm:text-xs font-medium text-[#4A3B32] lowercase">
              abah batagor
            </span>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 font-light lowercase">
              pemilik usaha
            </span>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl bg-[#F5EFEA] text-[#8C6239] flex items-center justify-center border border-[#8C6239]/10 shrink-0">
            <User size={14} className="stroke-[2]" />
          </div>
        </div>
      </div>
    </header>
  );
}
