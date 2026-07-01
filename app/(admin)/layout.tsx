"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  // Kondisi bersih mutlak untuk halaman login (Tanpa Sidebar, Tanpa Header)
  if (isLoginPage) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32]">
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32] relative">
      {/* 1. SIDEBAR DESKTOP */}
      {/* Otomatis menjadi tersembunyi di mobile karena Sidebar memiliki handling responsive internal sendiri */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 2. AREA KONTEN UTAMA */}
      {/* pl-0 di mobile agar teks judul mepet rapi, pl-72 di desktop menyesuaikan lebar sidebar baru */}
      <div className="flex-1 flex flex-col pl-0 md:pl-72 min-w-0">
        {/* Atas: Bar Informasi Kontrol Tetap (Sudah responsif & presisi) */}
        <Header />

        {/* Bawah: Ruang Pendaratan Konten Halaman Dinamis */}
        {/* pb-28 di mobile disiapkan agar konten aman tidak tertutup oleh Bottom Navigation Bar */}
        <main className="flex-1 p-5 md:p-8 pt-24 pb-28 md:pb-8 w-full max-w-[1600px] mx-auto min-w-0">
          {children}
        </main>

        {/* 3. BOTTOM NAVIGATION BAR KHUSUS MOBILE */}
        {/* Muncul otomatis di bawah layar ketika diakses menggunakan HP */}
        <div className="block md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
