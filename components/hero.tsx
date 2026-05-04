"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight-new"

import Link from "next/link"
import { Variants } from "framer-motion"

const textRevealVariants: Variants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
}
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      
      {/* Deep background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      {/* Red ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <Spotlight />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-zinc-300">
            Built for YouTubers & Editors
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Collaborate without sharing access.
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A secure collaboration platform for YouTubers and editors.
          Editors upload videos, owners review them, and publish directly to YouTube —
          without sharing channel access.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-red-500 text-white hover:bg-red-600 rounded-full px-8 h-12 text-base shadow-lg shadow-red-500/20 cursor-pointer"
            >
              Start
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>

          <a href="#Howitworks">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer"
            >
              See How it works
            </Button>
          </a>
        </motion.div>


      </div>
    </section>
  )
}