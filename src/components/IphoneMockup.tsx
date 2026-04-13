"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface IphoneMockupProps {
  iframeUrl: string;
  className?: string;
  isAutoScroll?: boolean;
}

export function IphoneMockup({ iframeUrl, className, isAutoScroll = false }: IphoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const isHoveredRef = useRef(false);
  const autoScrollYRef = useRef(0);

  // iPhone 14 Pro logical resolution
  const MOBILE_WIDTH = 390;
  const MOBILE_HEIGHT = 844;
  const AUTO_SCROLL_MAX = 3500;

  useEffect(() => {
    setIframeLoaded(false);
    setProgress(0);
    autoScrollYRef.current = 0;
    if (iframeRef.current) iframeRef.current.style.transform = "translateY(0)";
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.random() * 12));
    }, 300);
    return () => clearInterval(interval);
  }, [iframeUrl]);

  const handleIframeLoad = () => {
    setProgress(100);
    setTimeout(() => setIframeLoaded(true), 200);
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / MOBILE_WIDTH);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll via translateY — CORS-safe
  useEffect(() => {
    if (!isAutoScroll) {
      if (iframeRef.current) iframeRef.current.style.transform = "translateY(0)";
      autoScrollYRef.current = 0;
      return;
    }

    let rafId: number;
    const SPEED = 0.7;

    const tick = () => {
      if (!isHoveredRef.current && iframeRef.current && iframeLoaded) {
        autoScrollYRef.current += SPEED;
        if (autoScrollYRef.current >= AUTO_SCROLL_MAX) autoScrollYRef.current = 0;
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
      style={{ height: "100%", aspectRatio: "9/19.5", maxWidth: "240px" }}
    >
      {/* Phone chassis */}
      <div className="absolute inset-0 rounded-[12%] border-[8px] border-zinc-800 bg-black p-[3px] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2 z-30 h-5 w-20 -translate-x-1/2 rounded-3xl bg-black" />

        {/* Side buttons */}
        <div className="absolute -left-[10px] top-[20%] h-10 w-[4px] rounded-l-md bg-zinc-700" />
        <div className="absolute -left-[10px] top-[32%] h-10 w-[4px] rounded-l-md bg-zinc-700" />
        <div className="absolute -right-[10px] top-[26%] h-14 w-[4px] rounded-r-md bg-zinc-700" />

        {/* Display */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden rounded-[10%] bg-zinc-950"
        >
          {/* Loading bar */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center gap-3">
              <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Scaled 390-wide viewport — overflow hidden clips translateY */}
          <div
            className="absolute top-0 left-0 origin-top-left overflow-hidden"
            style={{
              width: `${MOBILE_WIDTH}px`,
              height: `${MOBILE_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            {/* Auto-scroll overlay — only when auto-scroll is active */}
            {isAutoScroll && iframeLoaded && (
              <div
                className="absolute inset-0 z-20 cursor-pointer"
                onMouseEnter={() => (isHoveredRef.current = true)}
                onMouseLeave={() => (isHoveredRef.current = false)}
              />
            )}

            <iframe
              key={iframeUrl}
              ref={iframeRef}
              src={iframeUrl}
              onLoad={handleIframeLoad}
              className={`border-none bg-white transition-opacity duration-500 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
              style={{
                width: `${MOBILE_WIDTH}px`,
                height: `${MOBILE_HEIGHT}px`,
                display: "block",
                pointerEvents: isAutoScroll ? "none" : "auto",
                willChange: "transform",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title="Mobile Website Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
