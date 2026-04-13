"use client";

import React, { useState } from "react";
import { ProjectData } from "@/lib/data";
import { MacbookMockup } from "./MacbookMockup";
import { IphoneMockup } from "./IphoneMockup";
import { Rating } from "./Rating";
import { BookingModal } from "./BookingModal";
import { ArrowLeft, ArrowRight, Monitor, Smartphone, Code2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectShowcase({ projects }: { projects: ProjectData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isAutoScroll] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const currentProject = projects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects || projects.length === 0) return <div>No projects found.</div>;

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-hidden bg-black text-white">
        {/* Top Section */}
        <header className="flex h-[20vh] min-h-[140px] w-full border-b border-white/10 shrink-0">
          <div className="flex flex-col justify-center w-[80vw] px-8 md:px-12 lg:px-20 border-r border-white/10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl md:text-5xl font-semibold text-blue-600 tracking-tight mb-2 md:mb-4 truncate">
                  {currentProject.title}
                </h1>
                <p className="text-sm md:text-lg text-zinc-400 max-w-3xl leading-relaxed line-clamp-2 md:line-clamp-none">
                  {currentProject.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center justify-center w-[20vw] px-4 md:px-8 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm text-zinc-500 font-medium tracking-widest uppercase">
              {currentIndex + 1} / {projects.length}
            </p>
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 bg-white text-black text-xs md:text-base font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Visit Site
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            </a>
            <div className="flex gap-2 md:gap-4 mt-2">
              <button onClick={handlePrev} className="p-2 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button onClick={handleNext} className="p-2 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Bottom Section */}
        <main className="flex h-[80vh] w-full min-h-0 shrink-0">
          <div className="relative flex flex-col items-center justify-center w-[80vw] bg-zinc-950/50 pt-24 pb-8 px-8 border-r border-white/10 min-h-0 overflow-hidden">

            {/* Controls Overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-6 z-50">
              <div className="flex bg-zinc-900 p-1.5 rounded-full border border-zinc-800 shadow-2xl">
                <button
                  onClick={() => setDevice("desktop")}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-2 rounded-full transition ${device === "desktop" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline-block">Desktop</span>
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-2 rounded-full transition ${device === "mobile" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline-block">Mobile</span>
                </button>
              </div>
            </div>

            {/* Mockup area */}
            <div className="flex-1 w-full flex items-center justify-center min-h-0" style={{ maxHeight: "100%" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentProject.id}-${device}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="flex items-center justify-center"
                  style={{ height: "90%", maxHeight: "calc(80vh - 80px)", width: "auto" }}
                >
                  {device === "desktop" ? (
                    <MacbookMockup iframeUrl={currentProject.liveUrl} isAutoScroll={isAutoScroll} />
                  ) : (
                    <IphoneMockup iframeUrl={currentProject.liveUrl} isAutoScroll={isAutoScroll} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col w-[20vw] bg-black p-4 lg:p-8 relative min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
              >
                <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />

                <div className="mb-6 lg:mb-10">
                  <h3 className="flex items-center gap-2 text-lg lg:text-xl font-semibold mb-4 text-white">
                    <Code2 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" /> Technology
                  </h3>
                  <ul className="space-y-2 lg:space-y-3">
                    {currentProject.techStack.map((tech) => (
                      <li key={tech} className="flex items-center gap-2 lg:gap-3">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="text-xs lg:text-sm text-zinc-300 font-medium break-all">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 lg:mb-10">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-4 text-white">More Info</h3>
                  <p className="text-zinc-400 text-xs lg:text-sm leading-relaxed">
                    {currentProject.moreInfo}
                  </p>
                </div>

                <Rating projectId={currentProject.id} projectTitle={currentProject.title} />

              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-4 lg:pt-8 bg-black">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-3 lg:py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm lg:text-base font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                Book Delivery
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Booking Modal — rendered outside the overflow-hidden layout */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        projectTitle={currentProject.title}
      />
    </>
  );
}
