"use client";

import React from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32]">
      {/* 1. Komponen Navigasi Samping Tetap (Fixed Sidebar) */}
      <Sidebar />

      {/* 2. Area Konten Utama Kanan (Main Content Area) */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Atas: Bar Informasi Kontrol Tetap (Fixed Header) */}
        <Header />

        {/* Bawah: Ruang Pendaratan Konten Halaman Dinamis */}
        {/* Ditambahkan padding-top (pt-16) agar konten tidak tertutup oleh header melayang */}
        <main className="flex-1 p-8 pt-24 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
