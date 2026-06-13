/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Gauge, 
  Layers, 
  Terminal, 
  Zap, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronDown,
  Wrench,
  Rocket,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  Flame,
  Award
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  desc: string;
  role?: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  stats?: string;
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  isSuperstar?: boolean;
  bulletpoints: string[];
}

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center skew-x-[-12deg]">
          <Zap className="text-white w-5 h-5 fill-current animate-pulse" />
        </div>
        <span className="font-mono text-xl font-bold tracking-tighter italic uppercase text-white">SAI MOULI</span>
      </div>
      <div className="hidden md:flex gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        <a href="#about" className="hover:text-red-500 transition-colors">Engine</a>
        <a href="#metrics" className="hover:text-red-500 transition-colors">Diagnostics</a>
        <a href="#projects" className="hover:text-red-500 transition-colors">OS Garage</a>
        <a href="#experience" className="hover:text-red-500 transition-colors">Track Record</a>
        <a href="#skills" className="hover:text-red-500 transition-colors">Specs</a>
        <a href="#contact" className="hover:text-red-500 transition-colors">Pit Stop</a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Grid Pattern & Red Ambient Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-red-500/30 bg-red-500/10 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-500">Superstar SDE • Q4 2025</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none mb-4"
        >
          BANDARI SAI <span className="text-transparent stroke-red-500 stroke-1" style={{ WebkitTextStroke: '1px rgba(239, 68, 68, 0.5)' }}>MOULI</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 font-mono text-xs uppercase tracking-widest text-zinc-400"
        >
          <span>Distributed Systems</span>
          <span className="text-red-600">•</span>
          <span>Observability</span>
          <span className="text-red-600">•</span>
          <span>Query Performance</span>
          <span className="text-red-600">•</span>
          <span>Data Infrastructure</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl mx-auto text-zinc-400 text-base md:text-lg font-light tracking-wide leading-relaxed"
        >
          Hello, I'm a backend-strong Full Stack Engineer with ~4 years of engineering high-throughput telemetry pipelines, optimized databases, and intelligent proxy engines. Speed is not a luxury—it's a critical specification.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold uppercase italic tracking-widest hover:bg-red-700 transition-all transform hover:skew-x-[-6deg] active:scale-95 text-center">
            Open Garage
          </a>
          <a href="#metrics" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold uppercase italic tracking-widest hover:bg-white/10 transition-all transform hover:skew-x-[-6deg] text-center">
            View Analytics
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ title, subtitle, number }: { title: string, subtitle: string, number: string }) => {
  return (
    <div className="mb-16 relative">
      <span className="absolute -top-10 left-0 text-8xl font-black text-white/5 italic select-none">{number}</span>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter mb-2">{title}</h2>
        <div className="w-20 h-1 bg-red-600 mb-4 skew-x-[-20deg]" />
        <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">{subtitle}</p>
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 bg-zinc-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading title="The Engine" subtitle="Architecture & Philosophy" number="01" />
          <div className="space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
            <p>
              I build backend systems with the structural rigor and aerodynamic efficiency of sports cars. When dealing with <strong className="text-white">high-throughput streams</strong> or complex schemas, guesswork is the bottleneck. Systematic profiling is the cure.
            </p>
            <p>
              Whether it’s architecting an observability system ingesting millions of records per hour, designing custom <strong className="text-white">Zero Trust proxies</strong> from scratch, or squeezing speed out of critical database schemas, my obsession revolves around resource optimization, speed, and safety.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                <Gauge className="text-red-500 mb-2" />
                <h4 className="text-white font-bold italic uppercase text-sm">Query Tuning</h4>
                <p className="text-xs text-zinc-500">EXPLAIN ANALYZE, materialized views & customized schemas.</p>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                <Layers className="text-red-500 mb-2" />
                <h4 className="text-white font-bold italic uppercase text-sm">Telemetry Pipelines</h4>
                <p className="text-xs text-zinc-500">Log ingestion, filtering, and cost optimization at scale.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000" 
              alt="Engine Engineering Design" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-red-600" />
                <span className="text-white font-mono text-xs uppercase tracking-widest">Distributed Core</span>
              </div>
              <p className="text-zinc-300 italic">"Engineering is not just code; it's the art of building scalable, observable, and resilient pipelines that execute perfectly under peak production loads."</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-red-600/50" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-red-600/50" />
        </motion.div>
      </div>
    </section>
  );
};

// --- Interactive Instrument Cluster ---
const MetricsCluster = () => {
  const [selectedSpec, setSelectedSpec] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const specs = [
    {
      title: "Data Ingestion",
      metric: "1.2M+",
      unit: "Records/Hour",
      perfText: "Time-series sensor & structured telemetry ingestion handling high-volume streaming with ring-buffers without a single data loss under network partitions.",
      carAnalogy: "Top speed performance. High RPM handling representing supreme pipeline throughput.",
      color: "from-red-600 to-orange-500",
      gaugeValue: 85,
    },
    {
      title: "API Optimization",
      metric: "600ms",
      unit: "Latency Tuned",
      perfText: "Reduced mission-critical API latency down from 2-3s by designing database-per-service isolation, non-blocking asynchronous pipeline structures, and exact tracer profiling.",
      carAnalogy: "0-60 mph acceleration. Fast latency response representing incredible gear shifts and fast feedback loops.",
      color: "from-orange-500 to-amber-500",
      gaugeValue: 95,
    },
    {
      title: "Database Efficiency",
      metric: "-64%",
      unit: "DB Peak Load Reduced",
      perfText: "Tuned database peak utilization from 99% down to 35% using EXPLAIN ANALYZE, materialized views, and precise composite indexing under high-concurrency workloads.",
      carAnalogy: "Streamlined aerodynamics. Extremely low drag and high fuel efficiency that keeps the database cool during stressful sprints.",
      color: "from-emerald-500 to-teal-500",
      gaugeValue: 70,
    },
    {
      title: "Cloud Infrastructure",
      metric: "-30%",
      unit: "Spend Optimization",
      perfText: "Architected production observability pipeline (GCP Pub/Sub → Vector → ClickHouse → Logchef) to streamline cost, saving substantial cloud resources.",
      carAnalogy: "Weight reduction. Stripping unnecessary chassis elements to supercharge performance-per-kilowatt.",
      color: "from-sky-500 to-blue-500",
      gaugeValue: 60,
    }
  ];

  return (
    <section id="metrics" className="py-32 px-6 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Diagnostics" subtitle="High-Performance Telemetry" number="02" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Circular Instrument Gauge */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 border-4 border-zinc-900 rounded-full flex items-center justify-center bg-zinc-950 p-6 shadow-[0_0_50px_rgba(220,38,38,0.05)]">
              {/* Speedometer Tick Marks */}
              <div className="absolute inset-2 border border-zinc-800/30 rounded-full border-dashed" />
              
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="144"
                  cy="144"
                  r="120"
                  className="stroke-zinc-900 fill-none"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="144"
                  cy="144"
                  r="120"
                  className="stroke-red-600 fill-none"
                  strokeWidth="8"
                  strokeDasharray="753.9"
                  initial={{ strokeDashoffset: 753.9 }}
                  animate={isInView ? { strokeDashoffset: 753.9 - (753.9 * specs[selectedSpec].gaugeValue) / 100 } : {}}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>

              <div className="text-center relative z-10">
                <motion.span 
                  key={selectedSpec}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="block text-5xl font-black justify-center items-center tracking-tight text-white italic select-none"
                >
                  {specs[selectedSpec].metric}
                </motion.span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mt-2">
                  {specs[selectedSpec].unit}
                </span>
              </div>

              {/* Tachometer needle mock */}
              <motion.div 
                key={`needle-${selectedSpec}`}
                initial={{ rotate: -120 }}
                animate={{ rotate: -120 + (specs[selectedSpec].gaugeValue * 2.4) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-2 h-24 bg-red-600 origin-bottom rounded-full"
                style={{ top: '24px', left: '143px', transformOrigin: 'bottom center' }}
              />
              <div className="absolute w-6 h-6 bg-zinc-900 border-2 border-red-600 rounded-full flex items-center justify-center" />
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {specs.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpec(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${selectedSpec === idx ? 'bg-red-600 scale-125' : 'bg-zinc-800'}`}
                  aria-label={`Show metrics dashboard index ${idx}`}
                />
              ))}
            </div>
          </div>

          {/* Metrics Select & Cards */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, idx) => (
                <button
                  key={spec.title}
                  onClick={() => setSelectedSpec(idx)}
                  className={`text-left p-6 rounded-xl border transition-all relative overflow-hidden group ${
                    selectedSpec === idx 
                      ? 'border-red-600/50 bg-red-600/5 shadow-[0_0_20px_rgba(220,38,38,0.05)]' 
                      : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 hover:border-white/10'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${spec.color} opacity-80`} />
                  <span className="block text-2xl font-black italic uppercase text-white mb-1 tracking-tight">
                    {spec.metric}
                  </span>
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {spec.title}
                  </span>
                </button>
              ))}
            </div>

            <motion.div
              key={selectedSpec}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 bg-zinc-950 border border-white/5 rounded-2xl relative"
            >
              <div className="flex items-center gap-2 mb-4 text-red-500 font-mono text-[10px] uppercase tracking-widest font-bold">
                <Flame size={14} className="animate-pulse" />
                <span>Diagnostics Report</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white mb-3 italic">
                {specs[selectedSpec].title}
              </h3>
              <p className="text-zinc-440 text-zinc-400 font-light mb-6 leading-relaxed">
                {specs[selectedSpec].perfText}
              </p>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">Supercar Analogy</span>
                <p className="text-xs text-zinc-500 italic">
                  {specs[selectedSpec].carAnalogy}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, desc, role, tags, image, index, link, github }: Project & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-500"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        {role && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white font-mono text-[9px] uppercase tracking-widest rounded skew-x-[-10deg]">
            {role}
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black italic uppercase text-white tracking-tight group-hover:text-red-500 transition-colors">
            {title}
          </h3>
          <div className="flex gap-3">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label={`View ${title} on GitHub`}>
                <Github size={18} />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label={`Visit ${title}`}>
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-light">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-white/5 text-zinc-500 border border-white/5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      title: "SessionDB",
      role: "Creator",
      desc: "An open source, production-grade database proxy with Zero Trust policy engines, SQL dialect parsing, credential masking, query governance, and LLM-powered natural language SQL translation for MySQL/PostgreSQL.",
      tags: ["TypeScript", "Node.js", "React", "MySQL", "PostgreSQL", "Docker", "LLMs"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      link: "https://sessiondb.in",
      github: "https://github.com/sessiondb"
    },
    {
      title: "Observability Pipeline",
      role: "Architect",
      desc: "Designed and rolled out a massive production telemetry stack handling 1.2M+ records/hour from GCP Pub/Sub to Vector, columnar ClickHouse instances, and Logchef, capturing logs platform-wide while saving 30% cloud spend.",
      tags: ["GCP Pub/Sub", "Vector", "ClickHouse", "Logchef", "Go", "Observability"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
      link: "https://medium.com/@saimouli.bandari"
    },
    {
      title: "Machine Health Telemetry",
      role: "Core Developer",
      desc: "Industrial telemetry engine capable of scanning 1.2M+ sensor records and timeseries data per hour, leveraging ring-buffers and time-windowed aggregates to handle high-concurrency loops without packet drop.",
      tags: ["Node.js", "MERN", "Timeseries", "ClickHouse", "RabbitMQ"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="The Garage" subtitle="Open Source & core systems" number="03" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  const experiences: Experience[] = [
    {
      role: "Software Development Engineer — Full Stack & Platform",
      company: "Supertails (Petfully Yours Pvt. Ltd.)",
      location: "Bengaluru, India",
      period: "Apr 2025 - Present",
      isSuperstar: true,
      bulletpoints: [
        "Architected an end-to-end telemetry system (GCP Pub/Sub → Vector → ClickHouse → Logchef) storing structured logs across all services, slashing cloud expenditure by 30%.",
        "Operated as solo cloud platform owner across ~10 Google Cloud platforms using Service Mesh with mTLS/Zero Trust, VPC partitions, CI/CD routines, and production rotation control.",
        "Drove endpoint latency down to ~600ms by introducing database isolation, non-blocking asynchronous pipeline routers, and distributed tracer profiling.",
        "Supercharged query performance, reducing peak database consumption from 99% down to 35% through custom index schemas and materialized data views under load.",
        "Integrated modern AI automation: coded image-based classification routines and code review systems with Go/Python and LLM engines."
      ]
    },
    {
      role: "Software Development Engineer — MERN Stack",
      company: "Akrivia Automation Pvt. Ltd. (Facttwin)",
      location: "Visakhapatnam, India",
      period: "Nov 2022 - Apr 2025",
      bulletpoints: [
        "Constructed custom machine diagnostics loops processing 1.2M+ records/hour using ring buffers and time-window aggregation routines to eliminate stream dropout.",
        "Unlocked sub-35ms speed targets on columnar databases, modifying schemas with partial/covering indexes audited through query explain plans.",
        "Modernized monolithic setups from Angular 16 to 18; profiled change detectors and bundle files, creating massive enhancements to TTI values.",
        "Secured APIs with JWT and detailed role-based access configurations across highly-available services."
      ]
    },
    {
      role: "Program Analyst Trainee",
      company: "Cognizant",
      location: "Hyderabad, India",
      period: "Sep 2022 - Nov 2022",
      bulletpoints: [
        "Configured SAP PP (Production Planning) modules, partnering with stakeholders on requirement collection and user testing."
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Track Record" subtitle="Professional Experience" number="04" />
        
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-zinc-950 border-2 border-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              </div>

              {/* Header Box */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-xl md:text-2xl font-black italic uppercase text-white tracking-tight">
                    {exp.role}
                  </h3>
                  {exp.isSuperstar && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-red-500/30 bg-red-500/10 rounded text-[9px] font-mono font-bold tracking-wider text-red-500">
                      <Award size={10} /> SUPERSTAR SDE
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-zinc-500">
                  <span className="text-zinc-300 font-semibold">{exp.company}</span>
                  <span className="hidden md:inline">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Bulletpoints */}
              <ul className="space-y-2 mt-4 text-zinc-400 font-light text-sm max-w-3xl leading-relaxed list-none">
                {exp.bulletpoints.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex gap-2.5 items-start">
                    <span className="text-red-500 font-bold font-mono mt-0.5 select-none text-[11px]">&gt;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { category: "Languages", items: ["Go", "Python", "TypeScript", "SQL", "Java (Spring Boot)"], icon: <Code2 size={20} /> },
    { category: "Data & Queries", items: ["ClickHouse (columnar)", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"], icon: <Layers size={20} /> },
    { category: "System Specs", items: ["Microservices", "mTLS (Zero Trust)", "GCP Pub/Sub", "Vector Pipeline", "RabbitMQ"], icon: <Cpu size={20} /> },
    { category: "AI & LLMs", items: ["LLM SQL Generation", "Agentic Services", "Code Review Automation", "PyTorch"], icon: <Sparkles size={20} /> },
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Technical Specs" subtitle="Expert Engine Blueprint" number="05" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-black border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                {skill.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase text-white mb-4 tracking-tight">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map(item => (
                  <li key={item} className="text-zinc-500 font-mono text-xs flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%] bg-red-600/10 blur-[120px] rounded-full" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <SectionHeading title="Pit Stop" subtitle="Execute Connection" number="06" />
        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter mb-8 leading-none">
          Ready to <span className="text-red-500">Ignite</span> your platform loops?
        </h2>
        <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          I'm always checking diagnostics and analyzing bottlenecks. Connect for architectural inquiries or high-throughput optimization projects.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:saimouli.bandari@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase italic tracking-widest hover:bg-red-600 hover:text-white transition-all transform hover:skew-x-[-6deg]">
            <Mail size={20} />
            Email Me
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/SaimouliBandari" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all transform hover:skew-x-[-6deg]">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/saimouli03" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all transform hover:skew-x-[-6deg]">
              <Linkedin size={24} />
            </a>
            <a href="https://medium.com/@saimouli.bandari" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all transform hover:skew-x-[-6deg]">
              <BookOpen size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center skew-x-[-12deg]">
            <Zap className="text-white w-4 h-4 fill-current" />
          </div>
          <span className="font-mono text-lg font-bold tracking-tighter italic uppercase text-white">SAI MOULI</span>
        </div>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">
          © 2026 Bandari Sai Mouli • Built for speed and structural efficiency
        </p>
        <div className="flex gap-6 text-zinc-500 text-xs font-mono uppercase">
          <a href="https://sessiondb.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">sessiondb.in</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <MetricsCluster />
        <Projects />
        <ExperienceTimeline />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

