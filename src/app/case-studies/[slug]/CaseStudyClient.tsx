"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight, 
  User, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import caseStudiesData from "@/data/case-studies.json";

// Type definition based on our flexible schema
export type CaseStudy = {
  slug: string;
  title?: {
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
  };
  subtitle?: string;
  initiatives?: Array<{
    title: string;
    description: string;
  }>;
  overview?: {
    intro?: string;
    mainResult?: {
      value: string;
      label: string;
    };
    metrics?: Array<{
      value: string;
      description: string;
    }>;
  };
  strategy?: {
    title?: string;
    results?: Array<{
      value: string;
      label: string;
    }>;
    challenges?: Array<{
      num: string;
      title: string;
      description: string;
      solution: string;
    }>;
    footer?: string;
  };
  techStack?: string[];
  testimonials?: Array<{
    name: string;
    role: string;
    text: string;
  }>;
  engineers?: string[];
};

const caseStudies = caseStudiesData as CaseStudy[];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface CaseStudyClientProps {
  slug: string;
}

export default function CaseStudyClient({ slug }: CaseStudyClientProps) {
  const study = caseStudies.find(s => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="w-full h-[100dvh] overflow-y-auto overflow-x-hidden bg-black text-zinc-300 font-sans selection:bg-blue-500/30 scroll-smooth">
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between items-start mb-24"
          >
            <motion.div variants={fadeIn} className="lg:w-1/2">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                {study.title?.line1 && <span className="block text-white">{study.title.line1}</span>}
                {study.title?.line2 && <span className="block text-white">{study.title.line2}</span>}
                {study.title?.line3 && <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">{study.title.line3}</span>}
                {study.title?.line4 && <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">{study.title.line4}</span>}
              </h1>
              {study.subtitle && (
                <p className="mt-8 text-xl font-medium text-zinc-400">{study.subtitle}</p>
              )}
            </motion.div>

            <motion.div variants={fadeIn} className="lg:w-1/3 flex flex-col gap-12 mt-4 lg:mt-0">
              {study.initiatives?.map((init, idx) => (
                <div key={idx} className="relative">
                  <h3 className="text-white font-bold tracking-tight mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {init.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {init.description}
                  </p>
                  <Link href="#strategy" className="inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors gap-2 group">
                    View Impact <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="absolute -bottom-6 left-0 right-0 h-px bg-zinc-900" />
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-medium text-white tracking-tight">Project<br/>Outcome</span>
                <ArrowUpRight className="w-8 h-8 text-zinc-600" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Overview Section */}
        {study.overview && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-zinc-950 border-y border-zinc-900 py-20 relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
              {/* Left Column */}
              <motion.div variants={fadeIn} className="lg:w-5/12 flex flex-col relative z-10">
                <div className="flex gap-3 mb-12">
                  <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Overview</h2>
                {study.overview.intro && (
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {study.overview.intro}
                  </p>
                )}

                <div className="mb-20">
                  {study.techStack && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {study.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {study.overview.mainResult && (
                  <div className="mt-auto">
                    <div className="flex items-end gap-4 mb-2">
                      <span className="text-xl text-zinc-400">Result</span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-600 mb-1" />
                    </div>
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400 tracking-tighter">
                      {study.overview.mainResult.value}
                    </div>
                    <div className="text-xs text-zinc-600 uppercase tracking-widest mt-2">
                      {study.overview.mainResult.label}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Right Column / Stats */}
              {study.overview.metrics && (
                <motion.div variants={fadeIn} className="lg:w-7/12 flex flex-col relative z-10 lg:pl-16 lg:border-l border-zinc-900">
                  <div className="flex flex-col gap-6 mb-16">
                    {study.overview.metrics.map((stat, i) => (
                      <div key={i} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-900/30">
                        <div className="text-5xl font-bold text-blue-500 tracking-tighter shrink-0 w-32">
                          {stat.value}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed border-l border-zinc-800 pl-6">
                          {stat.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bars (Decorative) */}
                  <div className="mt-auto hidden sm:block">
                    <p className="text-xs text-zinc-500 mb-6 uppercase tracking-wider">Performance Metrics</p>
                    <div className="space-y-4">
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full" 
                        />
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Strategies Section */}
        {study.strategy && (
          <motion.section 
            id="strategy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 py-24"
          >
            <motion.div variants={fadeIn} className="flex justify-between items-start mb-16 relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight tracking-tight uppercase">
                {study.strategy.title || "The Engineering Strategy"}
              </h2>
              <div className="hidden lg:flex relative">
                 <div className="w-16 h-16 rounded-full bg-blue-500/80 mix-blend-screen -ml-6" />
                 <div className="w-16 h-16 rounded-full bg-indigo-500/80 mix-blend-screen -ml-8 mt-4" />
                 <div className="w-16 h-16 rounded-full bg-purple-500/80 mix-blend-screen -ml-8 -mt-2" />
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left Result Cards */}
              <motion.div variants={fadeIn} className="lg:w-5/12 flex flex-col gap-6">
                {study.strategy.results?.map((card, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-600 to-indigo-600 p-10 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
                    <p className="text-blue-200 text-sm mb-2 font-medium">Result</p>
                    <p className="text-5xl font-black text-white mb-6 tracking-tighter">{card.value}</p>
                    <p className="text-xs font-bold text-white tracking-widest uppercase">{card.label}</p>
                  </div>
                ))}
                <div className="h-2 w-32 bg-white mt-12 mb-4" />
                <div className="h-0.5 w-full bg-zinc-900" />
                
                {study.engineers && study.engineers.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-zinc-900">
                     <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Core Engineering Team</p>
                     <div className="flex flex-col gap-2">
                       {study.engineers.map((engineer, i) => (
                         <div key={i} className="text-sm font-medium text-white">{engineer}</div>
                       ))}
                     </div>
                  </div>
                )}
              </motion.div>

              {/* Right Challenges */}
              <motion.div variants={fadeIn} className="lg:w-7/12 flex flex-col justify-between pt-4">
                <div className="flex flex-col gap-12">
                  {study.strategy.challenges?.map((item, idx) => (
                    <div key={idx} className="relative pb-12 border-b border-zinc-900">
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xl font-bold text-white tracking-wider max-w-[80%]">{item.title}</h3>
                        <span className="text-lg font-medium text-zinc-600">#{item.num}</span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-medium italic">
                        Challenge: {item.description}
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                        Solution: {item.solution}
                      </p>
                    </div>
                  ))}
                </div>

                {study.strategy.footer && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-bold text-blue-500 uppercase tracking-wider leading-snug max-w-md">
                      {study.strategy.footer}
                    </h3>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Happy Client Section */}
        {study.testimonials && study.testimonials.length > 0 && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-light text-blue-500">Stakeholder Impact</h2>
              <ArrowUpRight className="w-8 h-8 text-blue-500/50 rotate-45" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
              {study.testimonials.map((testimonial, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      <User className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{testimonial.name}</h4>
                      <p className="text-xs text-zinc-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed opacity-80 italic">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
