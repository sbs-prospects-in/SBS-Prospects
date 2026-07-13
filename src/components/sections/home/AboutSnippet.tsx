"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(cardRef, { once: true, margin: "-60px 0px" });
  const [counters, setCounters] = useState({ years: 0, clients: 0, assets: 0, retention: 0 });

  /* ── Count-up ── */
  useEffect(() => {
    if (!inView) return;
    const targets = { years: 15, clients: 13, assets: 500, retention: 98 };
    const duration = 1800;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCounters({
        years:     Math.floor(ease * targets.years),
        clients:   Math.floor(ease * targets.clients),
        assets:    Math.floor(ease * targets.assets),
        retention: Math.floor(ease * targets.retention),
      });
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    const t = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 500);
    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, [inView]);

  return (
    <>
      <style>{`
        /* ── button hover ── */
        .sbs-about-btn { position:relative; overflow:hidden; cursor:pointer; transition: opacity .2s; }
        .sbs-about-btn-bg {
          position:absolute; inset:0;
          transform:translateX(-101%);
          transition:transform .4s cubic-bezier(.16,1,.3,1);
        }
        .sbs-about-btn:hover .sbs-about-btn-bg  { transform:translateX(0); }
        .sbs-about-btn:hover .sbs-about-btn-arr { transform:translateX(5px); }
        .sbs-about-btn-arr { transition:transform .3s; display:inline-block; }

        /* ── stat hover gold top bar ── */
        .sbs-abt-stat { position:relative; }
        .sbs-abt-stat::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:#C9A84C; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.16,1,.3,1);
        }
        .sbs-abt-stat:hover::before { transform:scaleX(1); }

        .sbs-portrait-mobile {
          width: 100%;
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
        }

        /* ── credentials: 2-col on mobile, 4-col from sm ── */
        .sbs-cred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(201,168,76,.15);
        }
        @media (min-width: 640px) {
          .sbs-cred-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── credential border-right handling ── */
        .sbs-cred-item { border-right: 1px solid rgba(201,168,76,.1); border-bottom: 1px solid rgba(201,168,76,.08); }
        @media (min-width: 640px) {
          .sbs-cred-item:nth-child(4) { border-right: none; }
          .sbs-cred-item { border-bottom: none; }
        }
        .sbs-cred-item:nth-child(2) { border-right: none; }
        @media (min-width: 640px) {
          .sbs-cred-item:nth-child(2) { border-right: 1px solid rgba(201,168,76,.1); }
        }

        /* ── stat strip: 2-col mobile, 4-col desktop ── */
        .sbs-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(201,168,76,.14);
        }
        @media (min-width: 1024px) {
          .sbs-stat-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .sbs-stat-item {
          border-right: 1px solid rgba(201,168,76,.1);
          border-bottom: 1px solid rgba(201,168,76,.08);
          padding: 24px 16px;
          text-align: center;
        }
        @media (min-width: 480px) {
          .sbs-stat-item { padding: 28px 20px; }
        }
        @media (min-width: 1024px) {
          .sbs-stat-item { padding: 32px 24px; border-bottom: none; }
          .sbs-stat-item:nth-child(4) { border-right: none; }
        }
        .sbs-stat-item:nth-child(2) { border-right: none; }
        @media (min-width: 1024px) {
          .sbs-stat-item:nth-child(2) { border-right: 1px solid rgba(201,168,76,.1); }
        }

        /* ── pulsing dot ── */
        @keyframes sbsDotPulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* ── card inner letter padding responsive ── */
        .sbs-letter-pad {
          padding: 32px 24px 28px;
        }
        @media (min-width: 640px) {
          .sbs-letter-pad { padding: 44px 44px 36px; }
        }
        @media (min-width: 1024px) {
          .sbs-letter-pad { padding: 52px 52px 48px; }
        }
      `}</style>

      {/* ═══════════ SECTION ═══════════ */}
      <section
        ref={sectionRef}
        style={{
          background: "#fbf3e4",
          padding: "60px 16px 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className="sm:pt-16 lg:pt-20"
      >

        {/* ── Centred Header ── */}
        <div style={{ textAlign: "center", marginBottom: 32, maxWidth: "85rem", margin: "0 auto 32px" }}
             className="px-4 sm:px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: "block", fontSize: 11, letterSpacing: ".26em",
              textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: 12,
            }}
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 5vw, 46px)",
              fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Who you&apos;ll work with.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(14px, 2vw, 15px)", color: "#7A7269", fontWeight: 400,
              margin: "0 auto", maxWidth: 400,
            }}
          >
            Meet the founder behind SBS Financial Services.
          </motion.p>
        </div>

        {/* ═════════════════════════════════
            THE CARD
        ═════════════════════════════════ */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6" ref={cardRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              background: "#FFFDF8",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 4,
              boxShadow: "0 12px 60px rgba(26,20,10,0.07)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Gold corner brackets */}
            {[
              { top:12, left:12, borderTop:"1.5px solid rgba(201,168,76,.45)", borderLeft:"1.5px solid rgba(201,168,76,.45)" },
              { top:12, right:12, borderTop:"1.5px solid rgba(201,168,76,.45)", borderRight:"1.5px solid rgba(201,168,76,.45)" },
              { bottom:12, left:12, borderBottom:"1.5px solid rgba(201,168,76,.45)", borderLeft:"1.5px solid rgba(201,168,76,.45)" },
              { bottom:12, right:12, borderBottom:"1.5px solid rgba(201,168,76,.45)", borderRight:"1.5px solid rgba(201,168,76,.45)" },
            ].map((s, i) => (
              <div key={i} style={{ position:"absolute", width:22, height:22, zIndex:4, pointerEvents:"none", ...s }} />
            ))}

            {/* ── MOBILE PORTRAIT (top of card on small screens) ── */}
            <div className="sbs-portrait-mobile block lg:hidden">
              <Image
                src="/images/about/founder.jpg"
                alt="Mr. Urval Shah"
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(15%)" }}
                priority
              />
              {/* Gradient at bottom */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, height:"40%",
                background:"linear-gradient(to top, #FFFDF8 0%, transparent 100%)",
                zIndex:2,
              }} />
              {/* 15+ badge mobile */}
              <div style={{
                position:"absolute", top:16, right:16, zIndex:5,
                background:"#C9A84C", padding:"10px 14px", textAlign:"center",
              }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#0A0906", lineHeight:1 }}>15+</div>
                <div style={{ fontSize:8, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(10,9,6,.65)", marginTop:2, fontWeight:600 }}>Years</div>
              </div>
              {/* SEBI badge mobile */}
              <div style={{
                position:"absolute", bottom:20, left:16, zIndex:5,
                background:"#1A1A1A", padding:"8px 14px",
                display:"flex", alignItems:"center", gap:7,
              }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#C9A84C", animation:"sbsDotPulse 2s ease infinite", flexShrink:0 }} />
                <span style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(245,240,232,.75)" }}>
                  SEBI Registered
                </span>
              </div>
            </div>

            {/* ── INNER GRID: letter (left) | portrait (right, desktop only) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr]">

              {/* ───── LEFT: The Letter ───── */}
              <div className="sbs-letter-pad" style={{ position:"relative", zIndex:2 }}>

                {/* Greeting */}
                <div style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:"clamp(22px, 3.5vw, 38px)",
                  fontWeight:700, color:"#1A1A1A",
                  marginBottom:6, lineHeight:1.2,
                }}>
                  Hello. <span style={{ fontWeight:400, fontStyle:"italic", color:"#C9A84C" }}>I&apos;m Urval Shah.</span>
                </div>

                {/* Subtitle */}
                <div style={{ fontSize:"clamp(12px, 1.6vw, 13px)", color:"#9A9088", marginBottom:22, letterSpacing:".01em" }}>
                  Founder &amp; Managing Director — SBS Financial Services
                </div>

                {/* Gold rule */}
                <div style={{ width:40, height:2, background:"#C9A84C", marginBottom:22, opacity:0.7 }} />

                {/* Letter paragraphs */}
                <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:28 }}>
                  {[
                    "I founded SBS Financial Services in 2019 with one conviction: that every family deserves access to financial guidance that is transparent, disciplined, and deeply personalised. Too often, financial advice is designed around products—not people. I set out to change that.",
                    "Over the past 15+ years, I have helped individuals, families, and professionals across Gujarat build financial plans that survive economic cycles. From SEBI-registered advisory to mutual funds, insurance, and tax-saving solutions—my team and I build frameworks that work for your life stage, risk appetite, and legacy goals.",
                    "When you work with SBS, you work directly with me. No hand-offs, no layers of intermediaries. Just honest, expert guidance—built on trust.",
                  ].map((text, i) => (
                    <p key={i} style={{ fontSize:"clamp(13px, 1.8vw, 15px)", color:"#4A4440", lineHeight:1.8, margin:0 }}>
                      {text}
                    </p>
                  ))}
                </div>

                {/* Animated Signature */}
                <div style={{ marginBottom:24 }}>
                  <svg viewBox="0 0 230 70" width="160" height="50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      stroke="#1A1A1A"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 2.5, delay: 0.9, ease: "easeInOut" }}
                      d="M12 56 C12 28, 28 8, 38 18 C48 28, 40 56, 30 56 C20 56, 10 44, 18 34 C26 24, 54 14, 62 14
                         M72 34 C80 14, 98 14, 94 34 C90 54, 72 54, 82 34 C92 14, 114 16, 122 18
                         M132 16 C124 54, 136 62, 148 44
                         M158 26 C150 60, 166 62, 174 28
                         M182 22 L206 22 C198 44, 212 54, 220 38"
                    />
                    <motion.line
                      stroke="#C9A84C" strokeWidth="1.2" strokeOpacity={0.55}
                      x1="8" y1="66" x2="222" y2="66"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.8, delay: 3.5 }}
                    />
                  </svg>
                  <div style={{ fontSize:10, letterSpacing:".16em", textTransform:"uppercase", color:"#9A9088", marginTop:5 }}>
                    — Mr. Urval Shah, Founder
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36 }}>
                  {[
                    { label:"Read Our Full Story", primary:true  },
                    { label:"Meet The Team",        primary:false },
                  ].map((b, i) => (
                    <button
                      key={i}
                      className="sbs-about-btn"
                      style={{
                        display:"flex", alignItems:"center", gap:8,
                        padding:"12px 22px",
                        border: b.primary ? "none" : "1px solid rgba(26,26,26,0.16)",
                        background: b.primary ? "#1A1A1A" : "transparent",
                        color: b.primary ? "#F5F0E8" : "#1A1A1A",
                        fontFamily:"'DM Sans',sans-serif",
                        fontSize:"clamp(10px, 1.4vw, 11px)",
                        letterSpacing:".13em", textTransform:"uppercase", fontWeight:600,
                        borderRadius:3,
                        whiteSpace:"nowrap",
                      }}
                    >
                      <div className="sbs-about-btn-bg" style={{ background: b.primary ? "#C9A84C" : "rgba(201,168,76,.1)" }} />
                      <span style={{ position:"relative", zIndex:1 }}>{b.label}</span>
                      <span className="sbs-about-btn-arr" style={{ position:"relative", zIndex:1, fontSize:13 }}>→</span>
                    </button>
                  ))}
                </div>

                {/* Credentials grid */}
                <div className="sbs-cred-grid">
                  {[
                    { label:"SEBI Registered", sub:"Investment Advisor" },
                    { label:"15+ Years",        sub:"of Experience"      },
                    { label:"NISM Certified",   sub:"Financial Planner"  },
                    { label:"₹500Cr+",          sub:"Assets Managed"     },
                  ].map((c, i) => (
                    <div
                      key={c.label}
                      className={`sbs-abt-stat sbs-cred-item`}
                      style={{ padding:"16px 14px" }}
                    >
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(13px, 2vw, 16px)", fontWeight:700, color:"#1A1A1A", marginBottom:3 }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize:9, letterSpacing:".1em", textTransform:"uppercase", color:"#9A9088" }}>
                        {c.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ───── RIGHT: Portrait (desktop only) ───── */}
              <div
                className="hidden lg:block"
                style={{ position:"relative", minHeight:560, overflow:"hidden" }}
              >
                <Image
                  src="/images/about/founder.jpg"
                  alt="Mr. Urval Shah — Founder, SBS Financial Services"
                  fill
                  sizes="(min-width: 1024px) 38vw, 0vw"
                  style={{ objectFit:"cover", objectPosition:"center top", filter:"grayscale(15%)" }}
                  priority
                />
                {/* Left fade into card */}
                <div style={{
                  position:"absolute", top:0, left:0, bottom:0, width:"42%",
                  background:"linear-gradient(to right, #FFFDF8 0%, transparent 100%)",
                  zIndex:2,
                }} />
                {/* Bottom fade */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, height:"28%",
                  background:"linear-gradient(to top, #FFFDF8 0%, transparent 100%)",
                  zIndex:2,
                }} />
                {/* SEBI badge */}
                <div style={{
                  position:"absolute", bottom:28, right:24, zIndex:5,
                  background:"#1A1A1A", padding:"10px 16px",
                  display:"flex", alignItems:"center", gap:8,
                }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#C9A84C", animation:"sbsDotPulse 2s ease infinite", flexShrink:0 }} />
                  <span style={{ fontSize:9, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(245,240,232,.75)" }}>
                    SEBI Registered Advisor
                  </span>
                </div>
                {/* 15+ badge */}
                <div style={{
                  position:"absolute", top:24, right:24, zIndex:5,
                  background:"#C9A84C", padding:"14px 18px", textAlign:"center",
                }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"#0A0906", lineHeight:1 }}>15+</div>
                  <div style={{ fontSize:8, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(10,9,6,.65)", marginTop:3, fontWeight:600 }}>Years</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═════════════════════════════════
            STAT STRIP
        ═════════════════════════════════ */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="sbs-stat-grid">
            {[
              { num:`${counters.years}`,    suf:"+",   lbl:"Years of Trust", sub:"Since 2019"         },
              { num:`${counters.clients}K`, suf:"+",   lbl:"Happy Clients",  sub:"Across Gujarat"     },
              { num:`₹${counters.assets}`,  suf:"Cr+", lbl:"Assets Managed", sub:"Growing every year" },
              { num:`${counters.retention}`,suf:"%",   lbl:"Retention Rate",  sub:"Clients for life"  },
            ].map((s, i) => (
              <motion.div
                key={s.lbl}
                initial={{ opacity:0, y:14 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay:0.5 + i*0.12 }}
                className="sbs-abt-stat sbs-stat-item"
              >
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px, 3.5vw, 34px)", fontWeight:700, color:"#1A1A1A", lineHeight:1, display:"block" }}>
                  {s.num}<span style={{ color:"#C9A84C" }}>{s.suf}</span>
                </span>
                <span style={{ fontSize:"clamp(9px, 1.2vw, 10px)", letterSpacing:".14em", textTransform:"uppercase", color:"#9A9088", display:"block", marginTop:6 }}>{s.lbl}</span>
                <span style={{ fontSize:"clamp(11px, 1.4vw, 12px)", color:"#C9A84C", fontWeight:500, display:"block", marginTop:2 }}>{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}