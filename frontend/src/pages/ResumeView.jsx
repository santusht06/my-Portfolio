import React, { useState } from "react";
import { FiDownload, FiExternalLink, FiFileText, FiEye } from "react-icons/fi";
import resumePreviewImg from "../assets/Pictures/resume-preview.png";
import Footer from "../components/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import SEOHead from "../components/SEOHead";

const ResumeView = () => {
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "pdf"
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Resume & Qualifications | Santusht Kotai"
        description="View and download the professional software engineer resume of Santusht Kotai. Backend development, distributed systems, FastAPI, and Supabase GSoC."
        canonical="/resume"
        keywords="Santusht Kotai Resume, Software Engineer Resume PDF, Backend Developer CV, FastAPI, Distributed Systems, Supabase GSoC"
      />

      {/* Header */}
      <ScrollReveal delay={0.04} y={16}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-1">
              Resume
            </h1>
            <p className="text-xs sm:text-sm text-[#909092] font-mono">
              View and download my professional curriculum vitae.
            </p>
          </div>

          {/* Action Buttons: single line with smooth responsive horizontal scroll fallback */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar shrink-0 py-0.5 max-w-full">
            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] shrink-0">
              <button
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  viewMode === "preview"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs font-semibold"
                    : "text-[#909092] hover:text-black dark:hover:text-white"
                }`}
                title="Document Preview"
              >
                <FiEye className="text-xs" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  viewMode === "pdf"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs font-semibold"
                    : "text-[#909092] hover:text-black dark:hover:text-white"
                }`}
                title="Interactive PDF Viewer"
              >
                <FiFileText className="text-xs" />
                <span>PDF View</span>
              </button>
            </div>

            {/* Open Tab */}
            <a
              href="/Santusht_Kotai_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white motion-safe:active:scale-[0.97] transition-[background-color,border-color,color,box-shadow] duration-150 ease-smooth shadow-xs group shrink-0 whitespace-nowrap"
            >
              <FiExternalLink className="text-xs group-hover:translate-x-0.5 transition-transform duration-150 ease-smooth motion-reduce:transform-none" />
              <span>Open Tab</span>
            </a>

            {/* Download PDF */}
            <a
              href="/Santusht_Kotai_Resume.pdf"
              download="Santusht_Kotai_Resume.pdf"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold text-xs font-mono hover:bg-black/90 dark:hover:bg-zinc-100 hover-only:hover:shadow-lg motion-safe:active:scale-[0.97] transition-[background-color,box-shadow] duration-150 ease-smooth shadow-md group shrink-0 whitespace-nowrap"
            >
              <FiDownload className="text-xs transition-transform duration-150 ease-smooth motion-reduce:transform-none" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Embedded Real Resume Document Card */}
      <ScrollReveal delay={0.08} y={16} duration={0.4}>
        <div className="w-full rounded-2xl bezel-outer p-2 sm:p-4 mb-8 overflow-hidden shadow-xl dark:shadow-2xl hover-only:hover:border-black/15 dark:hover-only:hover:border-white/15 transition-all duration-200 ease-smooth">
          <div className="bezel-inner rounded-xl p-2 sm:p-4 flex flex-col items-center">
            {viewMode === "preview" ? (
              /* Document Surface (High-res crisp preview) */
              <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl dark:shadow-2xl overflow-hidden border border-[#909092]/25 dark:border-[#909092]/30">
                <a
                  href="/Santusht_Kotai_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to open full PDF"
                  className="block group relative"
                >
                  <img
                    src={imageError ? "/resume-preview.png" : resumePreviewImg}
                    alt="Santusht Kotai Official Software Engineer Resume"
                    width={800}
                    height={1131}
                    loading="eager"
                    fetchPriority="high"
                    onError={() => setImageError(true)}
                    className="w-full h-auto object-contain block transition-transform duration-250 ease-out-fluid group-hover:scale-[1.008] motion-reduce:transform-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-150 ease-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/90 text-white font-mono text-xs px-3.5 py-1.5 rounded-full shadow-xl border border-white/20 flex items-center gap-1.5 transition-transform duration-150 ease-out-fluid group-hover:scale-105 motion-reduce:transform-none">
                      <FiExternalLink className="group-hover:translate-x-0.5 transition-transform duration-150 ease-smooth motion-reduce:transform-none" />
                      Click to view full PDF
                    </span>
                  </div>
                </a>
              </div>
            ) : (
              /* Interactive PDF Viewer Embed */
              <div className="w-full h-[750px] sm:h-[900px] rounded-lg overflow-hidden bg-white border border-[#909092]/25">
                <iframe
                  src="/Santusht_Kotai_Resume.pdf#toolbar=0"
                  title="Santusht Kotai Official Software Engineer Resume PDF"
                  className="w-full h-full border-0 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResumeView;
