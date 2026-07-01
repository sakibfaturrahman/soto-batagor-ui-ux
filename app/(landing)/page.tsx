"use client";

import { motion, Variants } from "framer-motion";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Features from "@/components/landing/features";
import MenuSlider from "@/components/landing/menu-slider";
import Workflow from "@/components/landing/workflow";
import ReviewsHours from "@/components/landing/reviews-hours";
import Location from "@/components/landing/location";
import Cta from "@/components/landing/cta";

// 1. Desain Varian Animasi Scroll Bolak-Balik yang Lembut (Tanpa Over-Icon)
const fadeUpScrollVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 40,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="w-full bg-[#FDFBF7] flex flex-col gap-0 overflow-hidden">
      {/* 2. SECTION HERO (Pengecualian: Muncul Instan Saat Pertama Dimuat) */}
      <Hero />

      {/* 3. SECTION ABOUT: Selalu Beranimasi Bolak-Balik */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.25 }}
        variants={fadeUpScrollVariants}
      >
        <About />
      </motion.div>

      {/* 4. SECTION FEATURES */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.25 }}
        variants={fadeUpScrollVariants}
      >
        <Features />
      </motion.div>

      {/* 5. SECTION MENU SLIDER (Anchor target tetap aman) */}
      <div id="komponen">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpScrollVariants}
        >
          <MenuSlider />
        </motion.div>
      </div>

      {/* 6. SECTION WORKFLOW */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.25 }}
        variants={fadeUpScrollVariants}
      >
        <Workflow />
      </motion.div>

      {/* 7. SECTION REVIEWS & HOURS */}
      <div id="ulasan">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpScrollVariants}
        >
          <ReviewsHours />
        </motion.div>
      </div>

      {/* 8. SECTION LOCATION */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.25 }}
        variants={fadeUpScrollVariants}
      >
        <Location />
      </motion.div>

      {/* 9. SECTION CTA PENUTUP */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUpScrollVariants}
      >
        <Cta />
      </motion.div>
    </div>
  );
}
