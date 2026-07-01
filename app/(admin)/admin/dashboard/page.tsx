"use client";

import { motion, Variants } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Calendar,
  UtensilsCrossed,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const porsiTerjualData = [
  {
    id: "porsi-01",
    nama: "Satu Porsi Penuh",
    harga: "Rp 10.000",
    terjual: "22 Porsi",
    totalNominal: "Rp 220.000",
    persentase: "70%",
  },
  {
    id: "porsi-02",
    nama: "Setengah Porsi",
    harga: "Rp 5.000",
    terjual: "21 Porsi",
    totalNominal: "Rp 105.000",
    persentase: "65%",
  },
];

const metodeBayarData = [
  { nama: "Tunai Di Warung", jumlah: "29 Porsi", warna: "bg-[#8C6239]" },
  { nama: "Pesanan WA & QRIS", jumlah: "14 Porsi", warna: "bg-amber-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 } as const,
  },
};

const greetingVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      staggerChildren: 0.1,
    },
  },
};

const textFadeVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AdminDashboard() {
  return (
    // Membatasi max-w-5xl agar konten mengelompok padat di tengah dan tidak renggang berjauhan
    <div className="flex flex-col gap-8 pb-24 font-sans select-none max-w-5xl mx-auto px-2 mt-5">
      {/* ================= HEADER SAPAAN INTERAKTIF FUTURISTIK ================= */}
      <motion.div
        variants={greetingVariants}
        initial="hidden"
        animate="show"
        className="w-full bg-white border border-neutral-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left relative overflow-hidden group"
      >
        {/* Ornamen Partikel Ambien */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#8C6239]/5"
              style={{
                width: i == 0 ? 140 : i == 1 ? 90 : 180,
                height: i == 0 ? 140 : i == 1 ? 90 : 180,
                top: i == 0 ? "-20%" : i == 1 ? "40%" : "-10%",
                right: i == 0 ? "5%" : i == 1 ? "15%" : "30%",
              }}
              animate={{
                y: [0, i == 0 ? -20 : 15, -10, 0],
                x: [0, i == 1 ? -15 : 10, -5, 0],
                scale: [1, 1.08, 0.92, 1],
              }}
              transition={{
                duration: i == 0 ? 9 : i == 1 ? 11 : 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Konten Teks Kiri */}
        <div className="flex items-center gap-5 relative z-10 flex-1 min-w-0">
          <motion.div
            className="p-4 bg-[#8C6239]/10 text-[#8C6239] rounded-2xl hidden xs:block relative overflow-hidden shadow-inner border border-[#8C6239]/5 shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={24} className="relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="flex flex-col gap-1 min-w-0">
            <motion.h1
              variants={textFadeVariants}
              className="text-2xl md:text-3xl font-semibold text-[#4A3B32] tracking-wide"
            >
              Selamat Datang Kembali, Abah
            </motion.h1>
            <motion.p
              variants={textFadeVariants}
              className="text-sm text-neutral-400 font-normal truncate"
            >
              Kelola sistem pencatatan Abah di sini. Semua data finansial
              disesuaikan otomatis hari ini.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ================= 1. KELOMPOK KARTU RINGKASAN KEUANGAN ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {/* Pendapatan Hari Ini */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col text-left gap-1.5">
            <span className="text-xs font-normal text-neutral-400">
              Pendapatan Hari Ini
            </span>
            <span className="text-2xl font-semibold text-[#4A3B32]">
              Rp 325.000
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-xl shrink-0">
            <DollarSign size={18} />
          </div>
        </motion.div>

        {/* Total Porsi */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col text-left gap-1.5">
            <span className="text-xs font-normal text-neutral-400">
              Total Porsi Terjual
            </span>
            <span className="text-2xl font-semibold text-[#4A3B32]">
              43 Porsi
            </span>
          </div>
          <div className="p-3.5 bg-[#8C6239]/10 text-[#8C6239] rounded-xl shrink-0">
            <ShoppingBag size={18} />
          </div>
        </motion.div>

        {/* Modal Belanja */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col text-left gap-1.5">
            <span className="text-xs font-normal text-neutral-400">
              Modal Belanja Harian
            </span>
            <span className="text-2xl font-semibold text-[#4A3B32]">
              Rp 150.000
            </span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl shrink-0">
            <Calendar size={18} />
          </div>
        </motion.div>

        {/* Untung Bersih */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col text-left gap-1.5">
            <span className="text-xs font-normal text-neutral-400">
              Untung Bersih Hari Ini
            </span>
            <span className="text-2xl font-semibold text-emerald-600">
              Rp 175.000
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <TrendingUp size={18} />
          </div>
        </motion.div>
      </motion.div>

      {/* ================= 2. STRUKTUR UTAMA TUMPUIAN VERTIKAL (LEBIH PADAT) ================= */}
      <div className="flex flex-col gap-8">
        {/* BAGIAN UTAMA A: PAPAN PROGRESS PORSI TERJUAL (Lebih Tinggi & Besar) */}
        <div className="flex flex-col gap-4">
          <div className="text-left px-1">
            <h2 className="text-base font-semibold text-[#4A3B32] tracking-wide">
              Perbandingan Porsi Terjual Hari Ini
            </h2>
            <p className="text-xs text-neutral-400 font-normal mt-0.5">
              Analisis varian porsi yang paling diminati oleh pembeli saat ini.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {porsiTerjualData.map((porsi) => (
              <motion.div
                key={porsi.id}
                variants={itemVariants}
                className="flex flex-col sm:grid sm:grid-cols-12 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] items-start sm:items-center gap-4 sm:gap-0 hover:border-[#8C6239]/20 transition-all"
              >
                {/* Info Varian */}
                <div className="sm:col-span-4 flex items-center gap-4 text-left w-full">
                  <div className="p-2.5 bg-[#8C6239]/5 rounded-xl text-[#8C6239] shrink-0">
                    <UtensilsCrossed size={16} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-neutral-700">
                      {porsi.nama}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {porsi.harga}
                    </span>
                  </div>
                </div>

                {/* Grafik Batang */}
                <div className="sm:col-span-4 w-full pr-0 sm:pr-8">
                  <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#8C6239] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: porsi.persentase }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Kuantitas Terjual */}
                <div className="sm:col-span-2 text-left text-sm font-medium text-neutral-600 w-full sm:pl-4">
                  <span className="inline sm:hidden text-neutral-400 font-normal">
                    Terjual:{" "}
                  </span>
                  {porsi.terjual}
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 text-left sm:text-right text-sm font-semibold text-emerald-600 w-full">
                  <span className="inline sm:hidden text-neutral-400 font-normal">
                    Subtotal:{" "}
                  </span>
                  {porsi.totalNominal}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BAGIAN UTAMA B: DUA SUB-KOMPONEN DIJAJAR HORIZONTAL (Biar Seimbang) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* KANAN PANDUAN 1: Distribusi Alur Transaksi */}
          <div className="flex flex-col gap-4">
            <div className="text-left px-1">
              <h2 className="text-base font-semibold text-[#4A3B32] tracking-wide">
                Rute Transaksi Harian
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col gap-5 text-left h-full justify-between">
              <div className="flex flex-col gap-4">
                {metodeBayarData.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500 flex items-center gap-2.5 font-normal">
                        <span
                          className={`w-2 h-2 rounded-full ${item.warna}`}
                        />
                        {item.nama}
                      </span>
                      <span className="font-semibold text-[#4A3B32]">
                        {item.jumlah}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden flex mt-2">
                <div className="h-full bg-[#8C6239] w-[67%]" />
                <div className="h-full bg-amber-500 w-[33%]" />
              </div>
            </div>
          </div>

          {/* KANAN PANDUAN 2: Status Stok Bahan */}
          <div className="flex flex-col gap-4">
            <div className="text-left px-1">
              <h2 className="text-base font-semibold text-[#4A3B32] tracking-wide">
                Kontrol Bahan Baku
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col gap-3 text-left">
              <div className="flex items-start gap-3.5 p-4 bg-amber-50/60 rounded-xl border border-amber-100/50">
                <AlertTriangle
                  size={16}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-amber-800">
                    Stok Tahu Sutra Menipis
                  </span>
                  <span className="text-xs text-amber-700/80 font-normal leading-relaxed">
                    Tersisa untuk perkiraan sekitar 15 porsi jualan lagi. Segera
                    siapkan belanja esok hari.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
