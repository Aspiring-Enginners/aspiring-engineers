"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Users, Award, Target, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const counsellingPoints = [
  "Personalized college recommendations",
  "Branch selection guidance",
  "Admission procedure support",
  "Career path counselling",
];

const counsellingStats = [
  { icon: Users, value: "1000+", label: "Students Guided" },
  { icon: Award, value: "100+", label: "Partner Colleges" },
  { icon: Target, value: "95%", label: "Success Rate" },
];

const featureBlocks = [
  {
    title: "Result Analysis",
    badge: "Code-style report",
    description:
      "Auto-generated insights from your mock & PYQ performance data.",
    type: "analysis",
  },
  {
    title: "Performance Analytics",
    badge: "Visual trend graph",
    description:
      "Spot momentum shifts and weak zones with weekly score tracking.",
    type: "graph",
  },
  {
    title: "Counselling Booking",
    badge: "Interactive UI preview",
    description: "One-tap slot booking with expert mentor preferences.",
    type: "booking",
  },
  {
    title: "Score Breakdown",
    badge: "Test insights",
    description:
      "Section-wise strengths, weaknesses & time allocation snapshots.",
    type: "breakdown",
  },
];

const PEEK = 10;
const SCALE_STEP = 0.05;
// Minimum scroll delta to trigger a card change (prevents accidental tiny scrolls)
const SCROLL_THRESHOLD = 40;

function CardInner({
  block,
  index,
  darkMode,
}: {
  block: (typeof featureBlocks)[0];
  index: number;
  darkMode: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#2596be] font-semibold">
            {block.badge}
          </p>
          <h3
            className={`text-xl font-semibold mt-0.5 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {block.title}
          </h3>
        </div>
        <div className="h-10 w-10 rounded-xl bg-[#2596be]/10 text-[#2596be] flex items-center justify-center text-sm font-bold shrink-0">
          0{index + 1}
        </div>
      </div>

      <p
        className={`text-sm mb-4 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {block.description}
      </p>

      <div className="flex-1 flex flex-col min-h-0">
        {block.type === "analysis" && (
          <div className="flex-1 flex flex-col rounded-xl bg-slate-950/95 text-emerald-300 font-mono text-xs p-4 overflow-hidden">
            <div className="flex justify-between border-b border-emerald-900/40 pb-2 mb-2">
              <span className="text-emerald-500/50 text-[10px]">FIELD</span>
              <span className="text-emerald-500/50 text-[10px]">VALUE</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              {[
                { key: "scoreIndex", val: "78.4", hot: false },
                { key: "rankDelta", val: "+214 ↑", hot: true },
                { key: "focusArea", val: "Physics + Algebra", hot: false },
                { key: "confidence", val: "0.86", hot: false },
                { key: "testsAttempted", val: "12 / 20", hot: false },
                { key: "avgAccuracy", val: "74.2%", hot: true },
                { key: "strongSubject", val: "Chemistry", hot: false },
                { key: "weakChapter", val: "Kinematics", hot: false },
                { key: "nextTarget", val: "Mock #13", hot: false },
              ].map(({ key, val, hot }) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-0.5"
                >
                  <span className="text-emerald-400/60">{key}:</span>
                  <span
                    className={
                      hot ? "text-yellow-300 font-bold" : "text-emerald-300"
                    }
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {block.type === "graph" && (
          <div className="flex-1 flex flex-col rounded-xl bg-gradient-to-br from-[#2596be]/10 to-[#60DFFF]/10 p-4 gap-3">
            <div className="grid grid-cols-3 gap-2 shrink-0">
              {[
                { label: "Avg Score", val: "54.3" },
                { label: "Best Week", val: "W7 · 75" },
                { label: "Δ Growth", val: "+43pt" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-lg p-2 text-center ${darkMode ? "bg-white/5" : "bg-white/70"}`}
                >
                  <div
                    className={`text-[10px] mb-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {s.label}
                  </div>
                  <div className="text-sm font-bold text-[#2596be]">
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col justify-end min-h-0">
              <div className="flex items-end gap-1.5 h-full">
                {[28, 38, 32, 52, 60, 55, 68, 72, 75].map((bar, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-md bg-[#2596be]/70"
                    style={{ height: `${bar}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 shrink-0">
                <span>Week 1</span>
                <span>Week 9</span>
              </div>
            </div>
          </div>
        )}

        {block.type === "booking" && (
          <div className="flex-1 flex flex-col rounded-xl bg-[#2596be]/5 border border-[#2596be]/10 p-4 gap-4">
            <div className="flex-1 flex flex-col justify-between gap-2">
              {[
                {
                  name: "Dr. Ananya Bose",
                  subject: "JEE Advanced · IIT Bombay",
                  slots: 3,
                  avail: true,
                },
                {
                  name: "Rahul Mehta",
                  subject: "NEET · AIIMS Delhi",
                  slots: 2,
                  avail: true,
                },
                {
                  name: "Priya Singh",
                  subject: "WBJEE · Jadavpur Univ.",
                  slots: 4,
                  avail: false,
                },
              ].map((mentor) => (
                <div
                  key={mentor.name}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 ${darkMode ? "bg-white/5" : "bg-white"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${mentor.avail ? "bg-emerald-400" : "bg-gray-300"}`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}
                      >
                        {mentor.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {mentor.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-[11px] text-gray-400">
                      {mentor.slots} slots
                    </p>
                    <button className="text-[11px] text-[#2596be] font-semibold">
                      Book →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0">
              <p
                className={`text-xs mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Available today
              </p>
              <div className="grid grid-cols-4 gap-2">
                {["3:00 PM", "4:30 PM", "6:00 PM", "8:15 PM"].map((slot) => (
                  <div
                    key={slot}
                    className={`rounded-lg text-[11px] text-center py-2 font-medium ${darkMode ? "bg-white/5 text-gray-300" : "bg-[#2596be]/10 text-[#2596be]"}`}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {block.type === "breakdown" && (
          <div className="flex-1 flex flex-col rounded-xl border border-[#2596be]/20 p-4 gap-4">
            <div
              className={`flex items-center justify-between rounded-xl p-3 shrink-0 ${darkMode ? "bg-white/5" : "bg-[#2596be]/5"}`}
            >
              <div>
                <p className="text-[11px] text-gray-500 mb-0.5">Total Score</p>
                <p
                  className={`text-3xl font-bold leading-none ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  182
                  <span className="text-base font-normal text-gray-400">
                    {" "}
                    /300
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-500 mb-0.5">
                  Rank estimate
                </p>
                <p className="text-2xl font-bold text-[#2596be] leading-none">
                  #4,210
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-2">
              {[
                {
                  label: "Physics",
                  value: 78,
                  score: "62/80",
                  color: "bg-[#2596be]",
                },
                {
                  label: "Chemistry",
                  value: 66,
                  score: "53/80",
                  color: "bg-[#2596be]/80",
                },
                {
                  label: "Mathematics",
                  value: 36,
                  score: "29/80",
                  color: "bg-[#2596be]/60",
                },
                {
                  label: "Accuracy",
                  value: 61,
                  score: "61%",
                  color: "bg-emerald-400",
                },
              ].map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      {row.label}
                    </span>
                    <span className="text-[#2596be] font-semibold">
                      {row.score}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200/60 dark:bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Counselling() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardZoneRef = useRef<HTMLDivElement>(null);
  const total = featureBlocks.length;

  // Accumulated scroll delta — we only flip a card once threshold is crossed
  const scrollAccum = useRef(0);
  // Debounce: ignore rapid repeat fires
  const cooldown = useRef(false);

  useEffect(() => {
    const updateTheme = () =>
      setDarkMode(document.documentElement.classList.contains("dark"));
    updateTheme();
    const mo = new MutationObserver(updateTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (cooldown.current) return;
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, 600);

      setActiveIndex((prev) => {
        const next = prev + dir;
        // If we've gone past the last card forward, release scroll to page
        if (next >= total) return prev;
        // If we've gone before the first card backward, release scroll to page
        if (next < 0) return prev;
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    const el = cardZoneRef.current;
    if (!el) return;

    // ── WHEEL ──
    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = activeIndex + dir;

      // If we're at the start scrolling up OR at the end scrolling down,
      // let the page scroll normally — don't preventDefault
      if (
        (dir === -1 && activeIndex === 0) ||
        (dir === 1 && activeIndex === total - 1)
      ) {
        scrollAccum.current = 0;
        return;
      }

      // Otherwise hijack scroll and accumulate
      e.preventDefault();
      scrollAccum.current += Math.abs(e.deltaY);

      if (scrollAccum.current >= SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        advance(dir);
      }
    };

    // ── TOUCH ──
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;

      if (
        (dir === -1 && activeIndex === 0) ||
        (dir === 1 && activeIndex === total - 1)
      )
        return;

      if (Math.abs(dy) > SCROLL_THRESHOLD) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
        advance(dir);
      }
    };

    // { passive: false } is required so we can call preventDefault inside
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [activeIndex, total, advance]);

  return (
    <section
      id="counselling"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-visible"
    >
      <div className="absolute inset-0 opacity-80 pointer-events-none bg-gradient-to-br from-[#2596be]/15 to-[#4EA8DE]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-stretch">
          {/* ── LEFT: card zone — scroll is captured here only ── */}
          <div
            ref={cardZoneRef}
            className="order-2 lg:order-1 flex flex-col"
            // cursor hint so users know this area is scroll-interactive
            style={{ cursor: "ns-resize" }}
          >
            {/* Visual hint at top */}
            <div
              className={`flex items-center gap-2 mb-3 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              <span className="inline-flex flex-col gap-0.5">
                <span className="block w-3 h-0.5 bg-current rounded" />
                <span className="block w-3 h-0.5 bg-current rounded" />
              </span>
              Scroll here to explore cards
            </div>

            <div
              className="relative w-full flex-1"
              style={{ minHeight: 480, paddingBottom: PEEK * (total - 1) }}
            >
              {featureBlocks.map((block, index) => {
                const depth = (index - activeIndex + total) % total;
                const isTop = depth === 0;

                return (
                  <motion.div
                    key={block.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      bottom: PEEK * (total - 1),
                      zIndex: total - depth,
                      transformOrigin: "top center",
                    }}
                    animate={{
                      y: isTop ? 0 : depth * PEEK,
                      scale: isTop ? 1 : 1 - depth * SCALE_STEP,
                      opacity:
                        depth >= total - 1
                          ? 0
                          : isTop
                            ? 1
                            : Math.max(0.5, 1 - depth * 0.15),
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`rounded-2xl border shadow-[0_18px_40px_-24px_rgba(37,150,190,0.5)] p-5 backdrop-blur-xl select-none ${
                      darkMode
                        ? "bg-[#0d1b26]/92 border-white/10"
                        : "bg-white/96 border-gray-200"
                    }`}
                  >
                    <CardInner
                      block={block}
                      index={index}
                      darkMode={darkMode}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-5 justify-center shrink-0">
              {featureBlocks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 bg-[#2596be]"
                      : "w-1.5 bg-gray-300 dark:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: content ── */}
          <div className="order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <h2
                className={`text-4xl font-bold mb-6 tracking-tight ${darkMode ? "text-white" : "text-[#2596be]"}`}
              >
                Expert College Counselling
              </h2>

              <p
                className={`text-xl mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Navigate the admission process confidently with experts who know
                every step of JEE, NEET & WBJEE counselling.
              </p>

              <div className="space-y-4 mb-8">
                {counsellingPoints.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#2596be] flex items-center justify-center shadow-md shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/counselling">
                <button className="h-11 px-8 text-lg bg-[#2596be] text-white rounded-lg shadow-xl hover:scale-105 hover:bg-[#2596be]/90 transition">
                  Book Counselling Session
                </button>
              </Link>

              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Trusted by aspirants across JEE, NEET & WBJEE counselling.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {counsellingStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-4 shadow-sm ${
                      darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white/80 border-gray-200"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#2596be]/10 text-[#2596be] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
