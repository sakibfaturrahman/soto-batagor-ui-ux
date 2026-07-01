"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  AlertCircle,
  ChevronDown,
  BarChart3,
  Wallet,
  PieChart,
} from "lucide-react";

const financeData = [
  {
    id: "BLN-006",
    bulan: "Juni 2026",
    omset: "Rp 9.450.000",
    modal: "Rp 4.500.000",
    untungBersih: "Rp 4.950.000",
    status: "Paling Laris",
  },
  {
    id: "BLN-005",
    bulan: "Mei 2026",
    omset: "Rp 8.200.000",
    modal: "Rp 4.350.000",
    untungBersih: "Rp 3.850.000",
    status: "Stabil",
  },
  {
    id: "BLN-004",
    bulan: "April 2026",
    omset: "Rp 7.900.000",
    modal: "Rp 4.200.000",
    untungBersih: "Rp 3.700.000",
    status: "Stabil",
  },
  {
    id: "BLN-003",
    bulan: "Maret 2026",
    omset: "Rp 6.100.000",
    modal: "Rp 4.000.000",
    untungBersih: "Rp 2.100.000",
    status: "Perlu Evaluasi",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 } as const,
  },
};

export default function LaporanFinance() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    // Penambahan padding eksternal (px-4 md:px-8) untuk memisahkan layout dari area sidebar
    <div className="flex flex-col gap-8 pb-16 font-sans select-none text-left px-4 md:px-8 mt-5 md:mt-26">
      {/* 1. HEADER SECTION & FILTER TAHUN DROPDOWN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[#4A3B32] tracking-wide">
            Laporan Untung Rugi Berkala
          </h2>
          <p className="text-xs text-neutral-400 font-normal mt-0.5">
            Pencatatan otomatis yang memisahkan akumulasi modal belanja harian
            dengan sisa uang keuntungan murni Abah.
          </p>
        </div>

        {/* Filter Pilih Tahun */}
        <div className="relative inline-block self-start sm:self-auto shrink-0">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none bg-white border border-neutral-200 rounded-xl pl-5 pr-12 py-3 text-xs font-semibold text-[#4A3B32] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-[#8C6239]/40 transition-all cursor-pointer focus:outline-none focus:border-[#8C6239]"
          >
            <option value="2026">Tahun 2026</option>
            <option value="2025">Tahun 2025</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
        </div>
      </div>

      {/* 2. SUMMARY CARDS: UKURAN DIUBAH LEBIH BESAR & TEBAL */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {/* Total Omset Kumulatif */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex items-center justify-between border-b-2 border-b-neutral-200"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-neutral-400">
              Total Omset Kotor ({selectedYear})
            </span>
            <span className="text-2xl font-bold text-[#4A3B32]">
              Rp 31.650.000
            </span>
          </div>
          <div className="p-4 bg-neutral-50 text-neutral-500 rounded-2xl">
            <BarChart3 size={20} />
          </div>
        </motion.div>

        {/* Total Belanja Bahan */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex items-center justify-between border-b-2 border-b-neutral-200"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-neutral-400">
              Akumulasi Modal Belanja
            </span>
            <span className="text-2xl font-bold text-neutral-400">
              Rp 17.050.000
            </span>
          </div>
          <div className="p-4 bg-neutral-50 text-neutral-400 rounded-2xl">
            <Wallet size={20} />
          </div>
        </motion.div>

        {/* Total Untung Bersih Murni */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex items-center justify-between border-emerald-500/20 bg-emerald-50/10 border-b-2 border-b-emerald-500"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-emerald-700">
              Total Untung Bersih Murni
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              + Rp 14.600.000
            </span>
          </div>
          <div className="p-4 bg-emerald-100/60 text-emerald-600 rounded-2xl">
            <PieChart size={20} />
          </div>
        </motion.div>
      </motion.div>

      {/* 3. TABEL FINANSIAL BULANAN: TINGGI & UKURAN DATA DIUBAH LEBIH BESAR */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
          <div className="min-w-[900px] p-3 flex flex-col gap-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-semibold text-neutral-400 border-b border-neutral-100">
              <div className="col-span-2">ID Laporan</div>
              <div className="col-span-3">Periode Bulan</div>
              <div className="col-span-2">Total Kotor (Omset)</div>
              <div className="col-span-2">Modal Bahan Baku</div>
              <div className="col-span-2">Untung Bersih Murni</div>
              <div className="col-span-1 text-right">Performa</div>
            </div>

            {/* List Baris Data */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-2"
            >
              {financeData.map((report) => (
                <motion.div
                  key={report.id}
                  variants={itemVariants}
                  className="grid grid-cols-12 bg-white border border-neutral-100 hover:border-[#8C6239]/30 rounded-xl p-5 items-center group hover:shadow-[0_4px_20px_rgba(140,98,57,0.02)] transition-all"
                >
                  {/* ID Tiket */}
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-100/80 px-2.5 py-1 rounded-md">
                      {report.id}
                    </span>
                  </div>

                  {/* Keterangan Periode Bulan */}
                  <div className="col-span-3">
                    <span className="text-sm font-bold text-[#4A3B32]">
                      {report.bulan}
                    </span>
                  </div>

                  {/* Total Omset Kotor */}
                  <div className="col-span-2 text-sm font-medium text-neutral-600">
                    {report.omset}
                  </div>

                  {/* Total Pengeluaran Modal Belanja Bahan */}
                  <div className="col-span-2 text-sm font-medium text-neutral-400">
                    {report.modal}
                  </div>

                  {/* Sisa Uang Untung Bersih */}
                  <div className="col-span-2 text-sm font-bold text-emerald-600">
                    {report.untungBersih}
                  </div>

                  {/* Pill Status Performa */}
                  <div className="col-span-1 flex justify-end">
                    <span
                      className={`text-[10px] px-3 py-1 rounded-md font-semibold inline-flex items-center gap-1.5 ${
                        report.status === "Paling Laris"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/40"
                          : report.status === "Perlu Evaluasi"
                            ? "bg-red-50 text-red-500 border border-red-200/40 animate-pulse"
                            : "bg-neutral-50 text-neutral-500 border border-neutral-200/40"
                      }`}
                    >
                      {report.status === "Paling Laris" && (
                        <Sparkles size={12} />
                      )}
                      {report.status === "Perlu Evaluasi" && (
                        <AlertCircle size={12} />
                      )}
                      {report.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. HIGHLIGHT KESIMPULAN KEUANGAN */}
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#F5EFEA] border border-[#8C6239]/15 rounded-2xl p-6 flex items-center gap-5 max-w-3xl mt-4 text-left shadow-sm"
      >
        <div className="p-4 bg-white rounded-xl text-[#8C6239] shrink-0 shadow-sm">
          <TrendingUp size={18} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#4A3B32]">
            Catatan Performa Abah
          </span>
          <p className="text-xs text-neutral-600 font-normal leading-relaxed">
            Grafik keuangan menunjukkan tren naik sebesar +12% di Bulan Juni
            karena rata-rata porsi terjual meningkat setelah Istirahat Dzuhur
            hingga Sore Hari.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
