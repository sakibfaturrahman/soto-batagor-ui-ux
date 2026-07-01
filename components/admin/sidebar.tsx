"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  TrendingUp,
  LogOut,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Ringkasan Usaha",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Catat Jualan Kilat",
    href: "/admin/input-kilat",
    icon: PlusCircle,
  },
  {
    title: "Laporan Untung Rugi",
    href: "/admin/finance",
    icon: TrendingUp,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ====================================================================== */}
      {/* 1. VERSI DESKTOP: SIDEBAR KOKOH (Tampil pada layar md ke atas) */}
      {/* ====================================================================== */}
      <aside className="w-72 h-screen bg-white border-r border-neutral-100 flex flex-col justify-between p-7 fixed top-0 left-0 z-40 select-none hidden md:flex">
        <div className="flex flex-col gap-10">
          {/* Identitas Aplikasi */}
          <div className="flex items-center gap-4 px-2">
            <div className="p-2.5 bg-[#8C6239]/10 rounded-xl text-[#8C6239]">
              <Store size={22} className="stroke-[2]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-semibold text-[#4A3B32] tracking-wide">
                Batagor Abah
              </span>
              <span className="text-xs text-neutral-400 font-light mt-0.5">
                Panel Kontrol Abah
              </span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href} className="relative">
                  <button
                    className={cn(
                      "w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-colors text-left relative z-10",
                      isActive
                        ? "text-[#8C6239]"
                        : "text-neutral-500 hover:text-[#4A3B32] hover:bg-neutral-50/60",
                    )}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        "stroke-[1.8]",
                        isActive ? "text-[#8C6239]" : "text-neutral-400",
                      )}
                    />
                    <span>{item.title}</span>
                  </button>

                  {/* Efek Pegas Transisi Navigasi Aktif */}
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminNavDesktop"
                      className="absolute inset-0 bg-[#8C6239]/5 rounded-xl border border-[#8C6239]/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tombol Emergency Exit */}
        <div className="border-t border-neutral-100 pt-5">
          <Link href="/">
            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50/50 transition-colors text-left">
              <LogOut size={18} className="stroke-[1.8]" />
              <span>Kembali Ke Web</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* ====================================================================== */}
      {/* 2. VERSI MOBILE: BOTTOM BAR ERGONOMIS (Tampil pada layar di bawah md) */}
      {/* ====================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-t border-neutral-100 px-4 flex items-center justify-around z-40 md:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center h-full relative"
            >
              <button
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-colors relative z-10 py-2 w-full",
                  isActive
                    ? "text-[#8C6239]"
                    : "text-neutral-400 active:text-[#4A3B32]",
                )}
              >
                {/* Pembungkus Ikon dengan Efek Zoom Mikro */}
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon size={20} className="stroke-[2]" />
                </motion.div>

                {/* Label Menu Kecil */}
                <span className="text-[10px] font-medium tracking-wide">
                  {item.title}
                </span>
              </button>

              {/* Indikator Kapsul Aktif yang Bergeser Mulus (Menggunakan LayoutId yang Sama) */}
              {isActive && (
                <motion.div
                  layoutId="activeAdminNavMobile"
                  className="absolute bottom-2 w-12 h-1 bg-[#8C6239] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Tombol Akses Kelut di Ujung Bottom Bar */}
      </div>
    </>
  );
}
