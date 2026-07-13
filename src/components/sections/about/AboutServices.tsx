"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldAlert, Sparkles, Compass } from "lucide-react";

const marqueeItems = [
  "INDUSTRY TRAINING PROGRAMS",
  "MBA SKILL DEVELOPMENT COURSES",
  "HR CONSULTANCY",
  "Ahmedabad",
  "6 Years",
  "CAREER GUIDANCE",
  "RECRUITMENT SUPPORT",
  "INTERNSHIP PROGRAMS",
];

const timelineEvents = [
  { year: "2019", title: "The Genesis", desc: "Founded SBS Prospects in Ahmedabad, Gujarat, on a single belief: that financial advisory must serve client long-term growth." },
  { year: "2021", title: "Scope Expansion", desc: "Specialized MBA training programs to bridge the academic-corporate gap." },
  { year: "2024", title: "Community Scale", desc: "Leading boutique consultancy in Ahmedabad, training over 1,500+ candidates." },
  { year: "Present", title: "Counseling", desc: "Advising institutions and families with conflict-free wealth counseling." }
];

const valuesItems = [
  { title: "Conflict-Free Advice", icon: ShieldAlert, desc: "We are fiercely independent. We have no sales quotas or product bias. We answer solely to our clients." },
  { title: "No Cookie-Cutter", icon: Sparkles, desc: "Every portfolio, training pathway, and consultancy roadmap is custom-tailored for your unique milestones." },
  { title: "Fee Transparency", icon: Award, desc: "Complete transparency. We stand firm on zero hidden commissions, aligning our success with yours." }
];

const statsItems = [
  { num: "15+", label: "Years of Practice", desc: "Cumulative years of professional advisory and counseling expertise." },
  { num: "98%", label: "Client Retention", desc: "Long-term client relationships built on trust, transparency, and stable vision." },
  { num: "₹0", label: "Hidden Commissions", desc: "Absolute clarity and conflict-free fee architecture." }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wheelRadius, setWheelRadius] = useState(150);

  // Active Orbit Index
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 360) {
        setWheelRadius(90);
      } else if (w < 480) {
        setWheelRadius(110);
      } else if (w < 768) {
        setWheelRadius(125);
      } else if (w < 1280) {
        setWheelRadius(115);
      } else {
        setWheelRadius(150);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute rotation angle for active node to rest at the top (angle = 270 deg or -90 deg)
  // By default, story is at 270deg, values is at 30deg, journey is at 150deg
  const rotationAngle = activeIndex * -120;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as const
      }
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? -60 : 60,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1] as const
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      style={{ fontFamily: "'Outfit', sans-serif", background: "#fff8ef", overflow: "hidden", position: "relative" }}
      className="py-16 md:py-24"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        /* ── Animations ── */
        @keyframes sbsFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sbsSlideLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes sbsExpandLine {
          from { width: 0; }
          to   { width: 52px; }
        }
        @keyframes sbsMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes sbsSpin {
          to { transform: rotate(360deg); }
        }

        .sbs-fade-up     { animation: sbsFadeUp    0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .sbs-slide-left  { animation: sbsSlideLeft  1s   cubic-bezier(0.22,1,0.36,1) both; }
        .sbs-gold-line   { animation: sbsExpandLine 0.8s ease both; }
        .sbs-spin        { animation: sbsSpin 24s linear infinite; }
        .sbs-marquee     { animation: sbsMarquee 22s linear infinite; white-space: nowrap; }
        .sbs-marquee:hover { animation-play-state: paused; }

        /* ── Layout ── */
        .sbs-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 64px;
        }
        .sbs-headline-wrap {
          position: relative;
          padding: 40px 64px 20px;
          text-align: center;
        }
        .sbs-tab-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 900px) {
          .sbs-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 0 24px;
          }
          .sbs-headline-wrap {
            padding: 30px 24px 20px;
          }
          .sbs-tab-container {
            padding: 0 24px;
          }
        }
      `}</style>

      {/* ── 1. TOP LABEL ROW ── */}
      <div className="sbs-top-row">
        <div
          className={visible ? "sbs-fade-up" : "opacity-0"}
          style={{ animationDelay: "0.05s", display: "flex", alignItems: "center", gap: 12 }}
        >
          <span style={{ display: "block", width: 20, height: 1, background: "#7A6A1E", flexShrink: 0 }} />
          <span style={{ fontSize: 14, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, color: "#b8901a" }}>
            About SBS Prospects
          </span>
        </div>
        <div
          className={visible ? "sbs-fade-up" : "opacity-0"}
          style={{ animationDelay: "0.15s", display: "flex", alignItems: "center", gap: 8 }}
        >
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#7A6A1E", flexShrink: 0 }} />
          <span style={{ fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, color: "#b8901a" }}>
            Ahmedabad (Gujarat), 2019
          </span>
        </div>
      </div>

      {/* ── 2. HERO HEADLINE ── */}
      <div className="sbs-headline-wrap">
        {/* Decorative spinning circles */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.03, pointerEvents: "none" }}>
          <div className="sbs-spin" style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", border: "1px dashed #7A6A1E" }} />
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", border: "1px solid #7A6A1E" }} />
        </div>

        <h2
          className={visible ? "sbs-slide-left" : "opacity-0"}
          style={{
            position: "relative", zIndex: 1,
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(28px, 4.5vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "#1a160a",
            animationDelay: "0.2s",
          }}
        >
          We manage growth with{" "}
          <em style={{ color: "#7A6A1E", fontStyle: "italic", fontWeight: 400 }}>discipline</em>{" "}
          &amp; conviction.
        </h2>

        {/* Gold divider */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <span
            className={visible ? "sbs-gold-line" : ""}
            style={{ display: "block", height: 1, background: "#b8901a", width: visible ? undefined : 0, animationDelay: "0.72s" }}
          />
        </div>
  
        {/* Description */}
        <p
          className={visible ? "sbs-fade-up" : "opacity-0"}
          style={{
            position: "relative", zIndex: 1,
            margin: "18px auto 0",
            maxWidth: 580,
            fontSize: "clamp(13px, 1.5vw, 15px)",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "#4A3F3A",
            fontFamily: "'Outfit', sans-serif",
            animationDelay: "0.45s",
          }}
        >
          A boutique wealth advisory and career growth firm built on a single belief — that every decision
          must serve the long-term prosperity of those we advise.
        </p>
      </div>

      {/* ── 3. INTERACTIVE RADIAL ORBITAL WHEEL GRID ── */}
      <div className="sbs-tab-container relative z-10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[500px]">
          
          {/* LEFT: THE ORBITAL WHEEL VIEWPORT */}
          <div className="lg:col-span-4 flex items-center justify-center relative min-h-[300px]">
            <div 
              style={{
                width: `${wheelRadius * 2}px`,
                height: `${wheelRadius * 2}px`
              }}
              className="relative flex items-center justify-center"
            >
              
              {/* Spinning gold dashed ring */}
              <motion.div
                animate={{ rotate: rotationAngle }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px dashed rgba(122, 106, 30, 0.25)"
                }}
              >
                {/* Orbital Nodes (120 degrees apart) */}
                {[
                  { id: 0, label: "01 / Story", angle: 270 }, // Top
                  { id: 1, label: "02 / Values", angle: 30 },  // Bottom Right
                  { id: 2, label: "03 / Journey", angle: 150 } // Bottom Left
                ].map((node) => {
                  const isActive = activeIndex === node.id;
                  const rad = (node.angle * Math.PI) / 180;
                  const radius = wheelRadius; // Dynamic radius in pixels
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        const dir = node.id > activeIndex ? 1 : -1;
                        setDirection(dir);
                        setActiveIndex(node.id);
                      }}
                      style={{
                        position: "absolute",
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        cursor: "pointer"
                      }}
                    >
                      {/* Counter-rotating container to keep text upright */}
                      <motion.div
                        animate={{ rotate: -rotationAngle }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-md border transition-all duration-300 ${
                          isActive 
                            ? "bg-[#7A6A1E] border-[#7A6A1E] text-[#fff8ef] scale-110" 
                            : "bg-[#FAF6F0] border-[#7A6A1E]/15 text-[#7A6A1E] hover:border-[#7A6A1E]/50"
                        }`}
                      >
                        <span className="text-[10px] font-sans font-bold opacity-60 leading-none">0{node.id + 1}</span>
                        <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-[10px] font-bold mt-0.5 leading-none">
                          {node.id === 0 ? "Story" : node.id === 1 ? "Values" : "Journey"}
                        </span>
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Central Gold Core Core */}
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#7A6A1E] flex items-center justify-center shadow-inner z-10">
                <Compass size={24} className="text-[#7A6A1E] sbs-spin" style={{ animationDuration: "12s" }} />
              </div>

            </div>
          </div>

          {/* RIGHT: THE DETAILED INFO CARD VIEWPORT */}
          <div className="lg:col-span-8">
            <div 
              style={{
                backgroundColor: "#FAF6F0",
                border: "1px solid rgba(122, 106, 30, 0.15)",
                borderRadius: "24px",
                padding: "28px 32px",
                boxShadow: "0 8px 30px rgba(122, 106, 30, 0.02)"
              }}
              className="relative min-h-[460px] flex flex-col justify-center overflow-hidden"
            >
              <AnimatePresence custom={direction} mode="wait">
                {activeIndex === 0 && (
                  <motion.div
                    key="story"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch w-full"
                  >
                    {/* Left: Intro Section */}
                    <div className="md:col-span-2 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold tracking-widest text-[#7A6A1E] uppercase">01 / Our Story</span>
                        <h3 
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          className="font-bold text-xl md:text-2xl text-[#7A6A1E] italic leading-tight"
                        >
                          Bridging the gap between vision &amp; execution.
                        </h3>
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#4A3F3A] font-light">
                        Founded in Ahmedabad in 2019, SBS Prospects combines the rigorous standards of institutional business practices with the deep personal care only a boutique firm can provide. We believe that training, advisory, and strategic consultancy are not isolated tasks.
                      </p>
                    </div>

                    {/* Right: 2x2 Editorial Card Grid */}
                    <div className="md:col-span-3 relative md:pl-6 border-t md:border-t-0 md:border-l border-[#7A6A1E]/15 pt-6 md:pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full">
                        {timelineEvents.map((event, eventIdx) => (
                          <div 
                            key={eventIdx} 
                            style={{
                              backgroundColor: "#ffffff",
                              border: "1px solid rgba(122, 106, 30, 0.15)",
                              borderRadius: "16px",
                              padding: "16px",
                              boxShadow: "0 4px 12px rgba(122, 106, 30, 0.02)"
                            }}
                            className="flex flex-col items-start gap-1 hover:border-[#7A6A1E] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(122, 106, 30, 0.05)] transition-all duration-300 group cursor-default"
                          >
                            <span 
                              style={{ fontFamily: "'Playfair Display', Georgia, serif" }} 
                              className="text-xs font-bold text-[#7A6A1E] block"
                            >
                              {event.year}
                            </span>
                            <h4 className="font-playfair font-bold text-xs text-[#1a160a]">
                              {event.title}
                            </h4>
                            <p className="text-[11px] text-[#4A3F3A] leading-normal font-light">
                              {event.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeIndex === 1 && (
                  <motion.div
                    key="values"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-6 w-full"
                  >
                    <span className="text-[11px] font-bold tracking-widest text-[#7A6A1E] uppercase">02 / Our Values</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      {valuesItems.map((val, valIdx) => (
                        <div 
                          key={valIdx} 
                          style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid rgba(122, 106, 30, 0.15)",
                            borderRadius: "16px",
                            padding: "20px",
                            boxShadow: "0 4px 12px rgba(122, 106, 30, 0.02)"
                          }}
                          className="flex flex-col items-start gap-3 hover:border-[#7A6A1E] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(122, 106, 30, 0.05)] transition-all duration-300 group cursor-default"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#7A6A1E]/10 flex items-center justify-center text-[#7A6A1E] shrink-0 group-hover:bg-[#7A6A1E] group-hover:text-[#fff8ef] transition-colors duration-300">
                            <val.icon size={18} className="stroke-[2]" />
                          </div>
                          <h4 className="font-playfair font-bold text-base text-[#1a160a]">{val.title}</h4>
                          <p className="text-xs leading-relaxed text-[#4A3F3A] font-light">{val.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeIndex === 2 && (
                  <motion.div
                    key="journey"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-6 w-full"
                  >
                    <span className="text-[11px] font-bold tracking-widest text-[#7A6A1E] uppercase">03 / Our Journey</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      {statsItems.map((s, statIdx) => (
                        <div 
                          key={statIdx} 
                          style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid rgba(122, 106, 30, 0.15)",
                            borderRadius: "16px",
                            padding: "24px 20px",
                            boxShadow: "0 4px 12px rgba(122, 106, 30, 0.02)"
                          }}
                          className="flex flex-col items-center text-center gap-2 hover:border-[#7A6A1E] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(122, 106, 30, 0.05)] transition-all duration-300 group cursor-default"
                        >
                          <h4 className="font-playfair font-black text-4xl md:text-5xl text-[#7A6A1E] leading-none">
                            {s.num}
                          </h4>
                          {/* Alternating gold/bronze accent line right below number */}
                          <div 
                            style={{ width: "28px", height: "2.5px" }}
                            className={`my-1 ${statIdx % 2 === 0 ? "bg-[#C9A84C]" : "bg-[#7A6A1E]"}`} 
                          />
                          <span className="text-xs font-bold text-[#1a160a] tracking-wide block">
                            {s.label}
                          </span>
                          <p className="text-[11px] leading-relaxed text-[#7c7267] font-light max-w-[200px]">
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* ── 4. MARQUEE ── */}
      <div className="sbs-marquee-wrap mt-16 border-t border-b border-[#7A6A1E]/15 py-4 bg-[#fbf3e4]">
        <div style={{ display: "flex" }}>
          {[0, 1].map((d) => (
            <div key={d} className="sbs-marquee" aria-hidden={d === 1} style={{ display: "flex", flexShrink: 0 }}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 20, padding: "0 36px",
                    fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 500, color: "#1a160a", fontFamily: "'Outfit', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: 6, color: '#C9A84C' }}>◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}