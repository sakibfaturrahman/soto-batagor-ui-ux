"use client";

import { motion, Variants } from "framer-motion";
import { ShoppingBag, QrCode, CheckCircle2 } from "lucide-react";

export default function Workflow() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const steps = [
    {
      icon: ShoppingBag,
      title: "Pilih porsi favoritmu",
      desc: "Tentukan pilihan porsi jajan santai atau porsi penuh yang sesuai dengan seleramu saat ini.",
    },
    {
      icon: QrCode,
      title: "Amankan dengan uang muka",
      desc: "Khusus pemesanan massal, bayar uang muka aman lewat QRIS untuk menghindari pesanan tidak terambil.",
    },
    {
      icon: CheckCircle2,
      title: "Ambil langsung tanpa antre",
      desc: "Pesanan disiapkan sebelum kamu datang. Cukup tunjukkan bukti pembayaran dan ambil instan tanpa ribet.",
    },
  ];

  return (
    <section className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-14">
        {/* Header Section */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] leading-tight">
            Komitmen kami menjaga kenyamanan antrean anda
          </h2>
        </div>

        {/* 3 Kolom Alur Proses Pemesanan */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col items-start text-left bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm relative group"
              >
                {/* Nomor Urutan Langkah */}
                <span className="absolute top-6 right-8 text-5xl font-semibold text-neutral-100 select-none group-hover:text-[#F5EFEA] transition-colors duration-300">
                  0{idx + 1}
                </span>

                {/* Lingkaran Ikon */}
                <div className="p-4 rounded-2xl bg-[#F5EFEA] text-[#8C6239] mb-6 shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Teks Judul & Deskripsi Langkah */}
                <h3 className="text-xl font-semibold text-[#4A3B32] mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
