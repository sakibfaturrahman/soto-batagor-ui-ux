"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Coins,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  Award,
} from "lucide-react";

// Tipe Data untuk Struktur Rekap Finansial
interface DataPendapatan {
  totalPendapatan: string;
  totalPorsi: number;
  trenStatus: "naik" | "turun";
  trenPersen: string;
  detailVarian: {
    nama: string;
    terjual: number;
    subtotal: string;
  }[];
}

// Simulasi Database Statis untuk Demo Berdasarkan Filter Waktu
const databasePendapatan: Record<"hari" | "minggu" | "bulan", DataPendapatan> =
  {
    hari: {
      totalPendapatan: "Rp 325.000",
      totalPorsi: 43,
      trenStatus: "naik",
      trenPersen: "+12% dari kemarin",
      detailVarian: [
        { nama: "Satu Porsi Penuh", terjual: 22, subtotal: "Rp 220.000" },
        { nama: "Setengah Porsi", terjual: 21, subtotal: "Rp 105.000" },
      ],
    },
    minggu: {
      totalPendapatan: "Rp 2.450.000",
      totalPorsi: 310,
      trenStatus: "naik",
      trenPersen: "+5% dari minggu lalu",
      detailVarian: [
        { nama: "Satu Porsi Penuh", terjual: 165, subtotal: "Rp 1.650.000" },
        { nama: "Setengah Porsi", terjual: 145, subtotal: "Rp 725.000" },
      ],
    },
    bulan: {
      totalPendapatan: "Rp 9.450.000",
      totalPorsi: 1220,
      trenStatus: "naik",
      trenPersen: "+8% dari bulan lalu",
      detailVarian: [
        { nama: "Satu Porsi Penuh", terjual: 670, subtotal: "Rp 6.700.000" },
        { nama: "Setengah Porsi", terjual: 550, subtotal: "Rp 2.750.000" },
      ],
    },
  };

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function PendapatanBerkala() {
  // State Filter Waktu Utama
  const [filter, setFilter] = useState<"hari" | "minggu" | "bulan">("hari");

  // Ambil data aktif dari database simulasi
  const currentData = databasePendapatan[filter];

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-28 md:pb-24 font-sans select-none max-w-5xl mx-auto px-4 md:px-6 mt-5 md:mt-26 w-full text-[#4A3B32]">
      {/* ================= HEADER & SAKLAR FILTER TIMEFRAME ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-b border-neutral-100 pb-5">
        <div className="text-left">
          <h2 className="text-lg font-bold tracking-wide">
            Laporan Pendapatan Warung
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Pantau ringkasan total uang masuk beserta volume porsi batagor yang
            laku terjual.
          </p>
        </div>

        {/* Saklar Filter Minimalis (Flexibility and Efficiency of Use) */}
        <div className="bg-neutral-100/70 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto text-xs font-semibold">
          {(["hari", "minggu", "bulan"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg relative transition-colors ${
                filter === type
                  ? "text-[#8C6239]"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <span className="relative z-10 capitalize">
                {type === "hari"
                  ? "Hari Ini"
                  : type === "minggu"
                    ? "Minggu Ini"
                    : "Bulan Ini"}
              </span>
              {filter === type && (
                <motion.div
                  layoutId="activeFilterGlow"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-neutral-200/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ================= AREA KARTU RINGKASAN UTAMA (READ VIEW) ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
        >
          {/* Kartu 1: Nominal Pendapatan Kotor */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-[#8C6239]/10 transition-all"
          >
            <div className="flex flex-col text-left gap-1.5">
              <span className="text-xs font-normal text-neutral-400">
                Total Pendapatan
              </span>
              <span className="text-3xl font-bold text-[#4A3B32] tracking-tight">
                {currentData.totalPendapatan}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight size={12} />
                {currentData.trenPersen}
              </span>
            </div>
            <div className="p-4 bg-[#8C6239]/5 text-[#8C6239] rounded-2xl shrink-0">
              <Coins size={22} className="stroke-[1.8]" />
            </div>
          </motion.div>

          {/* Kartu 2: Akumulasi Volume Porsi Terjual */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-[#8C6239]/10 transition-all"
          >
            <div className="flex flex-col text-left gap-1.5">
              <span className="text-xs font-normal text-neutral-400">
                Volume Batagor Terjual
              </span>
              <span className="text-3xl font-bold text-[#4A3B32] tracking-tight">
                {currentData.totalPorsi}{" "}
                <span className="text-sm font-normal text-neutral-400">
                  Porsi
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 font-light mt-0.5">
                Rata-rata pesanan tersimpan otomatis
              </span>
            </div>
            <div className="p-4 bg-[#8C6239]/5 text-[#8C6239] rounded-2xl shrink-0">
              <Calendar size={22} className="stroke-[1.8]" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ================= DAFTAR RINCIAN PENJUALAN PER VARIAN ================= */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="text-left px-1">
          <h3 className="text-sm font-semibold tracking-wide">
            Rincian Penjualan Varian Menu
          </h3>
          <p className="text-[11px] text-neutral-400 font-light mt-0.5">
            Komposisi kontribusi kas dari masing-masing jenis porsi batagor.
          </p>
        </div>

        {/* List Data Konten Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3.5 w-full"
          >
            {currentData.detailVarian.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-[#8C6239]/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.01)] transition-all"
              >
                {/* Bagian Kiri: Identitas Varian */}
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-[#8C6239]/5 text-[#8C6239] rounded-xl group-hover:bg-[#8C6239]/10 transition-colors">
                    <Utensils size={16} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                      {item.nama}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-light">
                      Kuantitas Terjual:{" "}
                      <span className="text-[#8C6239] font-medium">
                        {item.terjual} Porsi
                      </span>
                    </span>
                  </div>
                </div>

                {/* Bagian Kanan: Subtotal Nominal Finansial */}
                <div className="text-right flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 font-mono">
                    {item.subtotal}
                  </span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">
                    Subtotal Kas
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
