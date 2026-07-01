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

// Menu yang disesuaikan total agar Abah tidak terbebani manajemen pesanan yang rumit (Reduce Memory Load)
const menuItems = [
  {
    title: "ringkasan usaha",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "catat jualan kilat", // Menjawab ketakutan Abah; fitur pencatatan semi-otomatis sekali klik
    href: "/admin/input-kilat",
    icon: PlusCircle,
  },
  {
    title: "laporan untung rugi", // Menyelesaikan kebingungan sisa modal & untung bersih bulanan Abah
    href: "/admin/finance",
    icon: TrendingUp,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-neutral-100 flex flex-col justify-between p-6 fixed top-0 left-0 z-40 select-none">
      {/* BAGIAN ATAS: Identitas Brand & Navigasi */}
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

        {/* Jajaran Navigasi yang Sudah Disederhanakan */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className="relative">
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

      {/* BAGIAN BAWAH: Tombol Emergency Exit */}
      <div className="border-t border-neutral-100 pt-4">
        <Link href="/">
          <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50/50 transition-colors text-left">
            <LogOut size={16} className="stroke-[1.8]" />
            <span className="lowercase">kembali ke web</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
