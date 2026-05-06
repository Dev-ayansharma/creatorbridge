
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-[#0f1113] flex items-center justify-center overflow-hidden antialiased">

          {/* Subtle grid texture */}
   

          {/* Soft center glow */}
          <div className="absolute w-[500px] h-[500px] bg-white/[0.03] blur-3xl rounded-full" />

      
      

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">

            {/* 404 */}
            <h1
              className="select-none text-transparent"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(120px, 18vw, 200px)",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                WebkitBackgroundClip: "text",
              }}
            >
              404
            </h1>

            {/* Divider */}
            <div className="w-px h-10 my-6 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

            {/* Label */}
            <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-3">
              Page Not Found
            </p>

            {/* Heading */}
            <h2
              className="text-zinc-200 leading-tight mb-3"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(24px, 3.5vw, 32px)",
              }}
            >
              Youve gone off track.
            </h2>

            {/* Description */}
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed mb-8">
              The page you're looking for doesn&pos;t exist or has been moved.
              Let&pos;get you back to your workspace.
            </p>
         

          </div>
        </div>
      </body>
    </html>
  )
}