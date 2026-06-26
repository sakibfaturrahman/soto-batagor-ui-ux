"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function About() {
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
      transition: { duration: 0.7, ease: "easeOut" }, // Changed ease to a valid type
    },
  };

  return (
    <section
      id="tentang"
      className="w-full bg-[#FDFBF7] py-20 px-6 md:px-16 flex justify-center"
    >
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* SISI KIRI: Frame Foto Visual (Mengadaptasi gaya melengkung lebar yang estetik) */}
        <motion.div
          className="lg:col-span-5 relative h-[450px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-sm"
          variants={itemVariants}
        >
          <Image
            src="/image/batagor.webp"
            alt="Proses pembuatan adonon batagor tradisional"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B32]/30 to-transparent" />
        </motion.div>

        {/* SISI KANAN: Storytelling Berdasarkan Hasil Wawancara Nyata */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col items-start text-left">
          <motion.span
            className="text-xs font-semibold text-[#8C6239] tracking-wider uppercase bg-[#8C6239]/10 px-3 py-1 rounded-full mb-4"
            variants={itemVariants}
          >
            Cerita kami
          </motion.span>

          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-[#4A3B32] leading-tight mb-6"
            variants={itemVariants}
          >
            Lima tahun menjaga konsistensi rasa kuliner tradisional
          </motion.h2>

          <div className="flex flex-col gap-4 text-base text-neutral-600 font-normal leading-relaxed">
            <motion.p variants={itemVariants}>
              Perjalanan warung batagor sederhana ini dimulai sejak lima tahun
              lalu di sudut jalan yang sama. Tanpa promosi besar-besaran di
              media sosial, kelezatan adonan kami menyebar secara alami dari
              mulut ke mulut melalui kepuasan para pelanggan setia yang terus
              kembali datang[cite: 1].
            </motion.p>

            <motion.p variants={itemVariants}>
              Kunci utama kami bertahan adalah kejujuran dalam rasa. Setiap
              subuh, adonan daging ikan tenggiri segar diracik secara mendadak
              bersama tahu sutra lembut untuk memastikan kualitas hidangan
              terbaik saat digoreng[cite: 1]. Dipadukan dengan siraman bumbu
              kacang kental yang gurih alami, kami berkomitmen menyajikan
              kehangatan rasa autentik yang tidak pernah berubah sejak hari
              pertama kami berjualan[cite: 1].
            </motion.p>
          </div>

          {/* Catatan Kaki Unik Tradisional */}
          <motion.div
            className="mt-8 pt-6 border-t border-neutral-200/60 w-full flex flex-col gap-1 text-left"
            variants={itemVariants}
          >
            <span className="text-sm font-semibold text-[#4A3B32]">
              Dibuat segar setiap hari
            </span>
            <span className="text-xs text-neutral-500 font-normal">
              Kami membatasi takaran harian demi menjaga keaslian rasa ikan
              tenggiri murni tanpa pengawet[cite: 1].
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
