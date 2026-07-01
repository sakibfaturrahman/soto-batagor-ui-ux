"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, TrendingUp, Sparkles, AlertCircle } from "lucide-react";

// Data rekap pembukuan bulanan pasif statis (Match Between System & Real World)
const financeData = [
  {
    id: "bln-006",
    bulan: "juni 2026",
    omset: "rp 9.450.000",
    modal: "rp 4.500.000", // Rekap kumulatif belanja harian tahu, ikan, tepung
    untungBersih: "rp 4.950.000",
    status: "paling laris",
  },
  {
    id: "bln-005",
    bulan: "mei 2026",
    omset: "rp 8.200.000",
    modal: "rp 4.350.000",
    untungBersih: "rp 3.850.000",
    status: "stabil",
  },
  {
    id: "bln-004",
    bulan: "april 2026",
    omset: "rp 7.900.000",
    modal: "rp 4.200.000",
    untungBersih: "rp 3.700.000",
    status: "stabil",
  },
  {
    id: "bln-003",
    bulan: "maret 2026",
    omset: "rp 6.100.000",
    modal: "rp 4.000.000",
    untungBersih: "rp 2.100.000",
    status: "perlu evaluasi", // Indikator pengingat otomatis jika untung mepet modal
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

export default function LaporanFinance() {
  return (
    <div className="flex flex-col gap-8 pb-12 font-sans select-none">
      {/* HEADER SECTION */}
      <div className="text-left px-1">
        <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
          laporan untung rugi berkala
        </h2>
        <p className="text-[10px] text-neutral-400 font-light mt-0.5 lowercase">
          pencatatan otomatis yang memisahkan akumulasi modal belanja harian
          dengan sisa uang keuntungan murni abah di akhir bulan.
        </p>
      </div>

      {/* TABEL FINANSIAL BULANAN (Mengadaptasi Penuh Komposisi Grid Referensi Kamu) */}
      <div className="flex flex-col gap-4">
        {/* Table Header Baris Pembantu */}
        <div className="grid grid-cols-12 px-6 text-[11px] text-neutral-400 font-light lowercase">
          <div className="col-span-2">id laporan</div>
          <div className="col-span-3">periode bulan</div>
          <div className="col-span-2">total kotor (omset)</div>
          <div className="col-span-2">modal bahan baku</div>
          <div className="col-span-2">untung bersih murni</div>
          <div className="col-span-1 text-right">performa</div>
        </div>

        {/* List Animasi Baris Data Pembukuan */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
        >
          {financeData.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              className="grid grid-cols-12 bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] items-center group hover:border-[#8C6239]/20 hover:shadow-[0_4px_16px_rgba(140,98,57,0.02)] transition-all"
            >
              {/* ID Tiket Laporan Bulanan */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-400">
                  <span className="text-[9px] font-bold tracking-wider">
                    FIN
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded-md lowercase">
                  {report.id}
                </span>
              </div>

              {/* Keterangan Periode Bulan */}
              <div className="col-span-3 text-left">
                <span className="text-xs font-semibold text-[#4A3B32] lowercase">
                  {report.bulan}
                </span>
              </div>

              {/* Total Omset Kotor */}
              <div className="col-span-2 text-left text-xs font-medium text-neutral-600">
                {report.omset}
              </div>

              {/* Total Pengeluaran Modal Belanja Bahan */}
              <div className="col-span-2 text-left text-xs font-medium text-neutral-400">
                {report.modal}
              </div>

              {/* Sisa Uang Untung Bersih (Ditandai Khusus Warna Hijau Keuntungan) */}
              <div className="col-span-2 text-left text-xs font-semibold text-emerald-600">
                {report.untungBersih}
              </div>

              {/* Pill Status Performa Bulanan (Pencegahan Eror Analisis) */}
              <div className="col-span-1 text-right flex justify-end">
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-medium lowercase inline-flex items-center gap-1 ${
                    report.status === "paling laris"
                      ? "bg-emerald-50 text-emerald-600"
                      : report.status === "perlu evaluasi"
                        ? "bg-red-50 text-red-500"
                        : "bg-neutral-50 text-neutral-500"
                  }`}
                >
                  {report.status === "paling laris" && <Sparkles size={10} />}
                  {report.status === "perlu evaluasi" && (
                    <AlertCircle size={10} />
                  )}
                  {report.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* HIGHLIGHT KESIMPULAN (Reduce Memory Load) */}
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#F5EFEA] border border-[#8C6239]/10 rounded-2xl p-5 flex items-center gap-4 text-left max-w-2xl mt-4"
      >
        <div className="p-3 bg-white rounded-xl text-[#8C6239] shrink-0 shadow-sm">
          <TrendingUp size={16} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-[#4A3B32] lowercase">
            catatan performa abah
          </span>
          <p className="text-[11px] text-neutral-500 font-normal leading-relaxed lowercase">
            grafik keuangan menunjukkan tren naik sebesar +12% di bulan juni
            karena rata-rata porsi terjual meningkat setelah istirahat dzuhur
            hingga sore hari[cite: 1].
          </p>
        </div>
      </motion.div>
    </div>
  );
}
