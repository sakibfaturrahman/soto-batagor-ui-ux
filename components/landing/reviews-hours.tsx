"use client";

import { motion, Variants } from "framer-motion";
import { Star, Clock, Package } from "lucide-react";

export default function ReviewsHours() {
  // Animasi Stagger saat masuk ke dalam jangkauan layar (Scroll Triggered)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const reviews = [
    {
      name: "M Khalif",
      role: "Pelanggan setia 2 tahun", // Disesuaikan dengan durasi usaha riil di wawancara
      text: "Rasa bumbu kacangnya pas banget, teksturnya kental gurih alami. Paling mantap kalau dimakan pas masih hangat habis digoreng.",
      rating: 5,
    },
    {
      name: "Ahmad Faisal",
      role: "Pembeli harian",
      text: "Suka banget beli batagor kuah dibungkus buat disantap disela istirahat. Rasa adonan ikan tenggirinya konsisten dan kerasa asli dari dulu sampai sekarang.",
      rating: 5,
    },
    {
      name: "Opek",
      role: "Pembeli harian",
      text: "Buat Mahasiswa Kere Hore ini worth it banget, dengan porsi 5000 bisa ganjel perut setelah seharian kuliah",
      rating: 5,
    },
    {
      name: "Koh Rocky",
      role: "Pembeli harian",
      text: "Rasa batagor kuahnya enak banget, selalu jadi pilihan pertama saat ngemil di kampus.",
      rating: 4,
    },

  ];

  return (
    <section
      id="ulasan"
      className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center overflow-hidden"
    >
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* SISI KIRI: Testimoni Autentik Mulut ke Mulut (7 Kolom) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#4A3B32] leading-tight mb-2">
              Apa kata mereka tentang rasa kami
            </h2>
          </motion.div>

          {/* Kartu Testimoni dengan Interaksi Hover Tingkat Lanjut */}
          <div className="flex flex-col gap-4 mt-4 w-full">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  boxShadow: "0 10px 30px -15px rgba(140, 98, 57, 0.1)",
                }}
                className="bg-white p-6 rounded-[1.5rem] border border-neutral-100 shadow-sm flex flex-col gap-3 text-left transition-all duration-300 origin-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-[#4A3B32]">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-normal">
                      {rev.role}
                    </p>
                  </div>
                  {/* Efek Stagger Tipis Pada Bintang Saat Di-hover */}
                  <motion.div
                    className="flex items-center gap-0.5"
                    whileHover={{ scale: 1.05 }}
                  >
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </motion.div>
                </div>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  "{rev.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SISI KANAN: Waktu Operasional & Preferensi (5 Kolom) */}
        <div className="lg:col-span-5 lg:col-start-8 w-full">
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)" }}
            className="bg-[#F5F3EE] p-8 rounded-[2rem] border border-neutral-200/40 shadow-sm flex flex-col gap-6 text-left transition-all duration-500"
          >
            <h3 className="text-xl font-semibold text-[#4A3B32] tracking-wide mb-2">
              Informasi kunjungan
            </h3>

            {/* Jam Operasional */}
            <div className="flex items-start gap-4 group">
              {/* Efek rotasi micro-interaction pada ikon saat area didekati */}
              <motion.div
                className="p-3 rounded-xl bg-white text-[#8C6239] shrink-0 shadow-sm"
                whileHover={{ rotate: 15 }}
              >
                <Clock className="h-5 w-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#4A3B32]">
                  Jam operasional harian
                </span>
                <span className="text-xs text-neutral-500 font-normal mt-0.5">
                  Setiap hari: 10:00 - 20:00
                </span>

                {/* Visual Alert Jam Ramai - Memiliki Efek Idle Pulse Lembut (UX Feedback) */}
                <motion.div
                  className="mt-3 bg-[#8C6239]/10 border border-[#8C6239]/20 rounded-lg p-2.5 max-w-xs relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(140, 98, 57, 0)",
                      "0 0 12px 2px rgba(140, 98, 57, 0.08)",
                      "0 0 0 0 rgba(140, 98, 57, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-[11px] text-[#734F2E] font-medium leading-normal">
                    Waktu antrean terpadat fisik terjadi pada setelah Dzuhur
                    hingga selesai Ashar (12:00 - 16:00).
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Karakteristik Pembelian */}
            <div className="flex items-start gap-4 pt-4 border-t border-neutral-300/40 group">
              <motion.div
                className="p-3 rounded-xl bg-white text-[#8C6239] shrink-0 shadow-sm"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Package className="h-5 w-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#4A3B32]">
                  Karakteristik pesanan
                </span>
                <span className="text-xs text-neutral-500 font-normal mt-0.5">
                  Mayoritas pelanggan lebih menyukai pesanan dibungkus untuk
                  dibawa pulang hangat ke rumah[cite: 1].
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
