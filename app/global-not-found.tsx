'use client'
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
         <div className="relative min-h-screen bg-[#111213] flex items-center justify-center overflow-hidden antialiased">
 
      {/* Dot grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #aab4c9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />
 
      {/* Soft radial glow behind 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
 
      {/* ── Brand mark — top left ── */}
      <Link
        href="/dashboard"
        className="fixed top-6 left-6 flex items-center gap-2.5 group"
      >
         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-sm">||</span>
          </div>
        <span className="text-[13px] font-semibold tracking-tight text-white group-hover:text-[#585a5c] transition-colors duration-200">
          Creator Bridge
        </span>
      </Link>
 
      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
 
        {/* Ghost 404 numeral */}
        <p
          className="select-none leading-[0.85] tracking-[-0.06em] text-transparent"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(140px, 22vw, 240px)",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.36)",
            backgroundImage: "linear-gradient(180deg, #272829 0%, #161617 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          404
        </p>
 
        {/* Vertical rule */}
        <div className="w-px h-11 my-8 bg-gradient-to-b from-transparent via-[#2e2f31] to-transparent" />
 
        {/* Eyebrow label */}
        <p className="text-[10px] tracking-[0.22em] font-semibold text-[#404040] uppercase mb-4">
          Page Not Found
        </p>
 
        {/* Heading */}
        <h1
          className="font-normal text-[#cecece] tracking-tight leading-snug mb-4"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(26px, 4vw, 36px)",
          }}
        >
          You've drifted off the map.
        </h1>
 
        {/* Body copy */}
        <p className="text-sm text-[#484848] leading-relaxed max-w-[300px] mb-10">
          This page doesn't exist or may have been moved.
          Head back to your workspace.
        </p>
 
        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl   text-black text-[13px] font-semibold shadow-[0_2px_16px_rgba(0,0,0,0.45)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
        >
          {/* Left arrow */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
         Go to Home page directly
        </Link>
      </div>
    </div>
      </body>
    </html>
  )
}