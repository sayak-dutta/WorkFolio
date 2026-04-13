"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MacbookMockupProps {
  iframeUrl: string;
  className?: string;
  isAutoScroll?: boolean;
}

export function MacbookMockup({ iframeUrl, className, isAutoScroll = false }: MacbookMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const isHoveredRef = useRef(false);
  const autoScrollYRef = useRef(0);

  // Enforce a 1440×900 desktop viewport inside the scaled container
  const DESKTOP_WIDTH = 1440;
  const DESKTOP_HEIGHT = 900;
  // Max pixels to scroll down during auto-scroll before looping back
  const AUTO_SCROLL_MAX = 4000;

  // Fake loading progress
  useEffect(() => {
    setIframeLoaded(false);
    setProgress(0);
    autoScrollYRef.current = 0;
    if (iframeRef.current) iframeRef.current.style.transform = "translateY(0)";
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.random() * 25));
    }, 100);
    
    // Force reveal after 1.2s max if iframe is slow
    const forceReveal = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIframeLoaded(true), 150);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(forceReveal);
    };
  }, [iframeUrl]);

  const handleIframeLoad = () => {
    setProgress(100);
    setTimeout(() => setIframeLoaded(true), 150);
  };

  // Scale the 1440px iframe container to fit the actual rendered width
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / DESKTOP_WIDTH);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll: CORS-safe translateY on the iframe element itself
  useEffect(() => {
    if (!isAutoScroll) {
      // Smoothly reset position
      if (iframeRef.current) iframeRef.current.style.transform = "translateY(0)";
      autoScrollYRef.current = 0;
      return;
    }

    let rafId: number;
    const SPEED = 0.7;

    const tick = () => {
      if (!isHoveredRef.current && iframeRef.current && iframeLoaded) {
        autoScrollYRef.current += SPEED;
        if (autoScrollYRef.current >= AUTO_SCROLL_MAX) {
          autoScrollYRef.current = 0; // loop back to top
        }
        iframeRef.current.style.transform = `translateY(-${autoScrollYRef.current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoScroll, iframeLoaded]);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ height: "100%", aspectRatio: "16/10", maxWidth: "100%" }}
    >
      {/* ── Screen lid ── */}
      <div className="absolute top-0 left-0 w-full" style={{ height: "93%" }}>
        <div className="w-full h-full rounded-[3%] border-[6px] border-zinc-800 bg-black p-[3px] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          {/* Webcam notch */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-16 bg-zinc-800 rounded-b-lg z-30 flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-zinc-700" />
          </div>

          {/* Display panel */}
          <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden rounded-[1.5%] bg-zinc-950"
          >
            {/* Loading bar */}
            {!iframeLoaded && (
              <div className="absolute inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center gap-3">
                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-zinc-500 text-xs animate-pulse">
                  Loading… {Math.round(Math.min(progress, 100))}%
                </p>
              </div>
            )}

            {/* Scaled 1440-wide viewport wrapper — overflow hidden clips translateY scroll */}
            <div
              className="absolute top-0 left-0 origin-top-left overflow-hidden"
              style={{
                width: `${DESKTOP_WIDTH}px`,
                height: `${DESKTOP_HEIGHT}px`,
                transform: `scale(${scale})`,
              }}
            >
              {/* Auto-scroll overlay — only present when auto-scroll is ON */}
              {isAutoScroll && iframeLoaded && (
                <div
                  className="absolute inset-0 z-20 cursor-pointer"
                  onMouseEnter={() => (isHoveredRef.current = true)}
                  onMouseLeave={() => (isHoveredRef.current = false)}
                />
              )}

              {/*
                iframe height = DESKTOP_HEIGHT so the site renders a natural 1440×900
                viewport — no artificial blank space below. The site's own scroll
                is active when pointer-events: auto (interactive mode).
                translateY from the auto-scroll rAF visually scrolls the page upward
                while overflow:hidden on the parent clips it cleanly.
              */}
              <iframe
                key={iframeUrl}
                ref={iframeRef}
                src={iframeUrl}
                onLoad={handleIframeLoad}
                className={`border-none bg-white transition-opacity duration-500 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                style={{
                  width: `${DESKTOP_WIDTH}px`,
                  height: `${DESKTOP_HEIGHT}px`,
                  display: "block",
                  // Interactive when auto-scroll is off, blocked when rAF is animating
                  pointerEvents: isAutoScroll ? "none" : "auto",
                  willChange: "transform",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                title="Desktop Website Mockup"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Laptop base ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-zinc-800 rounded-b-lg shadow-xl"
        style={{ width: "112%", height: "7%" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[14%] h-[35%] bg-zinc-700/60 rounded-b" />
      </div>
    </div>
  );
}
