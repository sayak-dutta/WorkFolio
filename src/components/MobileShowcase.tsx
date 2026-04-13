"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectData } from "@/lib/data";
import { BookingModal } from "./BookingModal";
import { Rating } from "./Rating";
import { Code2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileShowcase({ projects }: { projects: ProjectData[] }) {
  const [bookingProject, setBookingProject] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-5 py-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
          WorkFolio
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Premium Websites & Apps</p>
      </header>

      {/* Projects List */}
      <main className="flex flex-col gap-6 p-4 md:p-6 pb-32">
        {projects.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          return (
            <motion.article 
              key={project.id} 
              className="bg-black border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Project Image Area */}
              <div className="relative w-full aspect-[9/16] bg-zinc-900 overflow-hidden">
                {!imageErrors[project.id] ? (
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top"
                    onError={() => setImageErrors(prev => ({ ...prev, [project.id]: true }))}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-600 text-sm font-medium tracking-wide pb-12">Screenshot Placeholder</span>
                  </div>
                )}
                
                {/* Enhanced Gradient vignette overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                    {project.title}
                  </h2>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white"
                    aria-label={`Visit ${project.title}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 flex flex-col gap-4">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                <button 
                  onClick={() => toggleExpand(project.id)}
                  className="flex items-center text-sm font-semibold text-blue-500 self-start mt-2"
                >
                  {isExpanded ? (
                     <><ChevronUp className="w-4 h-4 mr-1" /> View Less</>
                  ) : (
                     <><ChevronDown className="w-4 h-4 mr-1" /> View Details</>
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-zinc-900 flex flex-col gap-5">
                        {/* Tech Stack */}
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3 text-zinc-200">
                            <Code2 className="w-4 h-4 text-blue-400" /> Technology
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                              <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* More Info */}
                        <div>
                           <h3 className="text-sm font-semibold mb-2 text-zinc-200">Insights</h3>
                           <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                             {project.moreInfo}
                           </p>
                        </div>
                        
                        {/* Ratings */}
                        <div className="pt-2">
                          <Rating projectId={project.id} projectTitle={project.title} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary CTA */}
                <button
                  onClick={() => setBookingProject(project.title)}
                  className="mt-2 w-full py-3.5 bg-blue-600 active:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                >
                  Book Delivery
                </button>
              </div>
            </motion.article>
          )
        })}
      </main>

      {/* Credit Footer */}
      <footer className="mt-auto py-8 text-center text-xs text-zinc-600 border-t border-zinc-900/50 bg-black">
        <p>
          Designed & Engineered by {' '}
          <a href="https://sayak.me" target="_blank" rel="noopener text-blue-500 hover:underline">
            Sayak Dutta
          </a>
        </p>
      </footer>

      {/* Booking Modal (mounts globally when any button is pressed) */}
      <BookingModal
        isOpen={!!bookingProject}
        onClose={() => setBookingProject(null)}
        projectTitle={bookingProject || ""}
      />
    </div>
  );
}
