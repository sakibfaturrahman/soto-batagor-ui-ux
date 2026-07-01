"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  TrendingUp,
  LogOut,
  Store,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "ringkasan usaha",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "catat jualan kilat",
    href: "/admin/input-kilat",
    icon: PlusCircle,
  },
  {
    title: "laporan untung rugi",
    href: "/admin/finance",
    icon: TrendingUp,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State kontrol hamburger menu di mobile

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Komponen Navigasi Utama (Dipisah agar tidak duplikasi kode antara desktop & mobile)
  const NavigationContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-8">
        {/* Identitas Aplikasi */}
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-[#8C6239]/10 rounded-xl text-[#8C6239]">
            <Store size={18} className="stroke-[2]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-[#4A3B32] tracking-wide">
              Batagor.io
            </span>
            <span className="text-[10px] text-neutral-400 font-light">
              Panel kontrol abah
            </span>
          </div>
        </div>

        {/* Jajaran Navigasi */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative"
                onClick={() => setIsOpen(false)} // Otomatis menutup drawer di mobile setelah diklik
              >
                <button
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-medium transition-colors text-left relative z-10",
                    isActive
                      ? "text-[#8C6239]"
                      : "text-neutral-500 hover:text-[#4A3B32] hover:bg-neutral-50/60",
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "stroke-[1.8]",
                      isActive ? "text-[#8C6239]" : "text-neutral-400",
                    )}
                  />
                  <span className="lowercase">{item.title}</span>
                </button>

                {/* Efek Pegas Transisi Navigasi Aktif */}
                {isActive && (
                  <motion.div
                    layoutId="activeAdminNav"
                    className="absolute inset-0 bg-[#8C6239]/5 rounded-xl border border-[#8C6239]/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tombol Emergency Exit */}
      <div className="border-t border-neutral-100 pt-4">
        <Link href="/">
          <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50/50 transition-colors text-left">
            <LogOut size={16} className="stroke-[1.8]" />
            <span className="lowercase">kembali ke web</span>
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. TOMBOL HAMBURGER FIXED (Hanya Muncul di Mobile/Tablet < md) */}
      <div className="md:hidden fixed top-3 left-4 z-50 flex items-center justify-center">
        <button
          onClick={toggleSidebar}
          className="p-2.5 bg-white border border-neutral-100 rounded-xl text-[#4A3B32] shadow-sm hover:bg-neutral-50 transition-colors"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 2. SIDEBAR VERSI DESKTOP PERMANEN (Layar besar >= md) */}
      <aside className="w-64 h-screen bg-white border-r border-neutral-100 flex flex-col justify-between p-6 fixed top-0 left-0 z-40 select-none hidden md:flex">
        <NavigationContent />
      </aside>

      {/* 3. DRAWERS OVERLAY VERSI MOBILE (Layar Kecil < md dengan Animasi Sliding) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Latar Belakang Gelap Transparan (Backdrop Click to Dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Panel Navigasi yang Meluncur dari Kiri (User Control and Freedom) */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-64 h-screen bg-white border-r border-neutral-100 flex flex-col justify-between p-6 fixed top-0 left-0 z-45 select-none md:hidden shadow-xl"
            >
              {/* Tambahan padding atas di mobile agar konten tidak tertabrak tombol X */}
              <div className="w-full h-full pt-12">
                <NavigationContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
