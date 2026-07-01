"use client";

import { motion, Variants } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Calendar,
  UtensilsCrossed,
} from "lucide-react";

// Data pasif porsi terjual hari ini yang dihitung dari input kilat Abah (Match Between System & Real World)
const porsiTerjualData = [
  {
    id: "porsi-01",
    nama: "satu porsi penuh",
    harga: "rp 10.000",
    terjual: "22 porsi",
    totalNominal: "rp 220.000",
    persentase: "70%", // Untuk panjang visual bar grafik
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

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-12 font-sans select-none">
      {/* 1. KELOMPOK KARTU RINGKASAN KEUANGAN PASIF */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Card 1: Pendapatan Hari Ini */}
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

        {/* Card 2: Total Porsi Hari Ini */}
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

        {/* Card 3: Modal Belanja Terpakai */}
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

        {/* Card 4: Untung Bersih Hari Ini */}
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

      {/* 2. PAPAN RINGKASAN PORSI (Mengubah Grid Kompleks Menjadi Visualisasi Sederhana) */}
      <div className="flex flex-col gap-4 mt-2">
        {/* Judul Tabel */}
        <div className="text-left px-1">
          <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
            perbandingan porsi terjual hari ini
          </h2>
          <p className="text-[10px] text-neutral-400 font-light mt-0.5 lowercase">
            melihat paket porsi mana yang paling diminati pelanggan tanpa ribet
            mengelola pesanan aktif
          </p>
        </div>

        {/* Table Header Baru yang Lebih Simpel */}
        <div className="grid grid-cols-12 px-6 text-[11px] text-neutral-400 font-light lowercase">
          <div className="col-span-3">varian porsi</div>
          <div className="col-span-5">grafik popularitas</div>
          <div className="col-span-2">kuantitas terjual</div>
          <div className="col-span-2 text-right">subtotal uang</div>
        </div>

        {/* List Data Ringkas */}
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
              className="grid grid-cols-12 bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] items-center group hover:border-[#8C6239]/20 transition-all"
            >
              {/* Nama Porsi Varian */}
              <div className="col-span-3 flex items-center gap-3 text-left">
                <div className="p-1.5 bg-[#8C6239]/5 rounded-lg text-[#8C6239]">
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

              {/* Grafik Batang Mini (Sangat Visual, Sangat Mudah Dipahami Abah) */}
              <div className="col-span-5 pr-8">
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#8C6239] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: porsi.persentase }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Kuantitas Terjual */}
              <div className="col-span-2 text-left text-xs font-semibold text-[#4A3B32]">
                {porsi.terjual}
              </div>

              {/* Subtotal Uang Per Varian */}
              <div className="col-span-2 text-right text-xs font-semibold text-emerald-600">
                {porsi.totalNominal}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
