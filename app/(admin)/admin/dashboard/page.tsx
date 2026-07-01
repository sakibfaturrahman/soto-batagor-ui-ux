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
    nama: "satu porsi penuh",
    harga: "rp 10.000",
    terjual: "22 porsi",
    totalNominal: "rp 220.000",
    persentase: "70%",
  },
  {
    id: "porsi-02",
    nama: "setengah porsi",
    harga: "rp 5.000",
    terjual: "21 porsi",
    totalNominal: "rp 105.000",
    persentase: "65%",
  },
];

const metodeBayarData = [
  { nama: "tunai di warung", jumlah: "29 porsi", warna: "bg-[#8C6239]" },
  { nama: "pesanan wa & qris", jumlah: "14 porsi", warna: "bg-amber-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 } as const,
  },
};

// 1. Animasi Masuk Banner Utama (Futuristik Entri)
const greetingVariants: Variants = {
  hidden: { opacity: 0, y: -15, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      staggerChildren: 0.1,
    },
  },
};

const textFadeVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-20 font-sans select-none">
      {/* ================= HEADER SAPAAN INTERAKTIF FUTURISTIK ================= */}
      <motion.div
        variants={greetingVariants}
        initial="hidden"
        animate="show"
        className="w-full bg-white border border-neutral-100 p-6 md:p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left relative overflow-hidden group"
      >
        {/* ORNAMEN FUTURISTIK 1: Partikel Ambien Mengambang (Tidak Pasaran) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#8C6239]/5"
              style={{
                width: i == 0 ? 120 : i == 1 ? 80 : 160,
                height: i == 0 ? 120 : i == 1 ? 80 : 160,
                top: i == 0 ? "-20%" : i == 1 ? "40%" : "-10%",
                right: i == 0 ? "5%" : i == 1 ? "15%" : "30%",
              }}
              animate={{
                y: [0, i == 0 ? -15 : 12, -8, 0],
                x: [0, i == 1 ? -12 : 8, -5, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{
                duration: i == 0 ? 8 : i == 1 ? 10 : 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Konten Teks Kiri */}
        <div className="flex items-center gap-4 relative z-10 flex-1 min-w-0">
          {/* Kotak Ikon Glowing */}
          <motion.div
            className="p-3.5 bg-[#8C6239]/10 text-[#8C6239] rounded-2xl hidden xs:block relative overflow-hidden shadow-inner border border-[#8C6239]/5"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={20} className="relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <motion.h1
              variants={textFadeVariants}
              className="text-xl md:text-2xl font-semibold text-[#4A3B32] lowercase tracking-wide"
            >
              selamat datang kembali, abah
            </motion.h1>
            <motion.p
              variants={textFadeVariants}
              className="text-xs text-neutral-400 font-light lowercase truncate"
            >
              panel pencatatan siap digunakan. semua data finansial disesuaikan
              otomatis hari ini.
            </motion.p>
          </div>
        </div>

        {/* ORNAMEN FUTURISTIK 2: Multi-layered Cyber Sonar Pulse Indicator */}
        <div className="flex items-center gap-3 bg-neutral-50/60 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-neutral-100/70 self-start sm:self-center shrink-0 relative z-10 shadow-sm">
          <div className="relative flex items-center justify-center h-4 w-4">
            {/* Lapisan Sonar Gelombang Luar 2 */}
            <motion.span
              animate={{ scale: [1, 3], opacity: [0.4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-amber-400/30"
            />
            {/* Lapisan Sonar Gelombang Luar 1 */}
            <motion.span
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-amber-400/40"
            />

            {/* Titik Inti Dalam dengan Efek Pendaran Magnetik */}
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            />
          </div>

          <span className="text-[10px] font-medium text-neutral-500 lowercase tracking-wide">
            warung aktif menerima qris
          </span>
        </div>
      </motion.div>
      {/* ================================================================= */}

      {/* 1. KELOMPOK KARTU RINGKASAN KEUANGAN */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Card 1 */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] font-light text-neutral-400 lowercase">
              pendapatan hari ini
            </span>
            <span className="text-xl font-semibold text-[#4A3B32]">
              rp 325.000
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
            <DollarSign size={16} />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] font-light text-neutral-400 lowercase">
              total porsi terjual
            </span>
            <span className="text-xl font-semibold text-[#4A3B32]">
              43 porsi
            </span>
          </div>
          <div className="p-3 bg-[#8C6239]/10 text-[#8C6239] rounded-xl">
            <ShoppingBag size={16} />
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] font-light text-neutral-400 lowercase">
              modal belanja harian
            </span>
            <span className="text-xl font-semibold text-[#4A3B32]">
              rp 150.000
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
            <Calendar size={16} />
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] font-light text-neutral-400 lowercase">
              untung bersih hari ini
            </span>
            <span className="text-xl font-semibold text-emerald-600">
              rp 175.000
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={16} />
          </div>
        </motion.div>
      </motion.div>

      {/* 2. STRUKTUR UTAMA BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SISI KIRI: PAPAN PROGRESS PORSI TERJUAL */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4">
          <div className="text-left px-1">
            <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
              perbandingan porsi terjual hari ini
            </h2>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5 lowercase">
              analisis varian porsi yang paling diminati pembeli
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {porsiTerjualData.map((porsi) => (
              <motion.div
                key={porsi.id}
                variants={itemVariants}
                className="flex flex-col sm:grid sm:grid-cols-12 bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] items-start sm:items-center gap-4 sm:gap-0 hover:border-[#8C6239]/20 transition-all"
              >
                {/* Info Varian */}
                <div className="sm:col-span-4 flex items-center gap-3 text-left w-full">
                  <div className="p-1.5 bg-[#8C6239]/5 rounded-lg text-[#8C6239] shrink-0">
                    <UtensilsCrossed size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-700 lowercase">
                      {porsi.nama}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 lowercase">
                      {porsi.harga}
                    </span>
                  </div>
                </div>

                {/* Grafik Batang */}
                <div className="sm:col-span-4 w-full pr-0 sm:pr-6">
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#8C6239] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: porsi.persentase }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Kuantitas Terjual */}
                <div className="sm:col-span-2 text-left text-xs font-medium text-neutral-500 w-full sm:pl-4">
                  <span className="inline sm:hidden text-neutral-400">
                    terjual:{" "}
                  </span>
                  {porsi.terjual}
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 text-left sm:text-right text-xs font-semibold text-emerald-600 w-full">
                  <span className="inline sm:hidden text-neutral-400 font-normal">
                    subtotal:{" "}
                  </span>
                  {porsi.totalNominal}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SISI KANAN: GABUNGAN KOMPONEN BARU */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* KOMPONEN BARU 1: Distribusi Alur Transaksi */}
          <div className="flex flex-col gap-4">
            <div className="text-left px-1">
              <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
                rute transaksi harian
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-4 text-left">
              {metodeBayarData.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 lowercase flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${item.warna}`}
                      />
                      {item.nama}
                    </span>
                    <span className="font-semibold text-[#4A3B32]">
                      {item.jumlah}
                    </span>
                  </div>
                </div>
              ))}
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#8C6239] w-[67%]" />
                <div className="h-full bg-amber-500 w-[33%]" />
              </div>
            </div>
          </div>

          {/* KOMPONEN BARU 2: Status Stok Bahan */}
          <div className="flex flex-col gap-4">
            <div className="text-left px-1">
              <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
                kontrol bahan baku
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-3 text-left">
              <div className="flex items-start gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-100/50">
                <AlertTriangle
                  size={14}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-semibold text-amber-800 lowercase">
                    stok tahu sutra menipis
                  </span>
                  <span className="text-[10px] text-amber-700/80 font-light lowercase">
                    tersisa untuk perkiraan sekitar 15 porsi jualan lagi.
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
