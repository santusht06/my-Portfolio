import React, { useState, useEffect, useCallback } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "../data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";

const FALLBACK_QUOTES = [
  {
    quote: profileData.quote.text,
    author: profileData.quote.author,
    category: "wisdom",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    category: "success",
  },
  {
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    category: "wisdom",
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "wisdom",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "success",
  },
  {
    quote: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
    category: "wisdom",
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
  },
];

const fetchZenQuote = async () => {
  const apiKey = import.meta.env.VITE_ZENQUOTES_KEY;
  const devEndpoint = apiKey ? `/api-quotes/random/${apiKey}` : "/api-quotes/random";

  // 1. Try local dev proxy (Vite)
  try {
    const res = await fetch(devEndpoint, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0]?.q) {
        return {
          quote: data[0].q,
          author: data[0].a || "Unknown",
        };
      }
    }
  } catch (err) {
    // dev proxy not reachable or returned error
  }

  // 2. Try backend route
  try {
    const res = await fetch("/api/v1/quote", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.quote) {
        return {
          quote: data.quote,
          author: data.author || "Unknown",
        };
      }
    }
  } catch (err) {
    // backend not reachable
  }

  return null;
};

const QuoteCard = () => {
  const [quoteData, setQuoteData] = useState(() => {
    try {
      const cached = sessionStorage.getItem("current_quote");
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }
    return {
      quote: profileData.quote.text,
      author: profileData.quote.author,
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);

    try {
      const zenQuote = await fetchZenQuote();
      if (zenQuote && zenQuote.quote) {
        setQuoteData(zenQuote);
        try {
          sessionStorage.setItem("current_quote", JSON.stringify(zenQuote));
        } catch {
          // ignore
        }
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn("ZenQuotes fetch error, using fallback cycle:", err);
    }

    // Graceful cycle through curated inspirational quotes if offline or rate-limited
    setFallbackIndex((prev) => {
      const next = (prev + 1) % FALLBACK_QUOTES.length;
      const nextQuote = FALLBACK_QUOTES[next];
      setQuoteData(nextQuote);
      try {
        sessionStorage.setItem("current_quote", JSON.stringify(nextQuote));
      } catch {
        // ignore
      }
      return next;
    });

    setIsLoading(false);
  }, []);

  // Fetch ZenQuote on initial mount if not already cached in this session
  useEffect(() => {
    if (!sessionStorage.getItem("current_quote")) {
      fetchQuote();
    }
  }, [fetchQuote]);

  return (
    <ScrollReveal y={20} duration={0.5}>
      <div className="relative w-full my-12 p-1.5 rounded-[1.75rem] bezel-outer overflow-hidden hover-only:hover:border-black/15 dark:hover-only:hover:border-white/15 transition-[border-color,box-shadow] duration-200 ease-smooth group">
        <div className="relative bezel-inner rounded-[1.5rem] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] dark:border-white/[0.04]">
          {/* Watermark Quote Icon */}
          <div className="absolute top-2 left-4 text-black/[0.04] dark:text-white/[0.04] group-hover:text-black/[0.07] dark:group-hover:text-white/[0.07] text-7xl sm:text-8xl font-serif pointer-events-none select-none leading-none transition-colors duration-250 ease-smooth">
            “
          </div>

          {/* Top Bar with category tag & refresh button */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] text-[#909092]">
              #zenquotes
            </span>

            <button
              onClick={fetchQuote}
              disabled={isLoading}
              title="Get another quote from ZenQuotes"
              aria-label="Refresh quote"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#909092] hover:text-black dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.06] transition-[color,background-color,transform] duration-150 ease-smooth motion-safe:active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <FiRefreshCw
                className={`text-xs transition-transform ${
                  isLoading ? "animate-spin text-black dark:text-white" : ""
                }`}
              />
              <span className="hidden sm:inline">New Quote</span>
            </button>
          </div>

          {/* Animated Quote Content */}
          <div className="relative z-10 flex flex-col gap-4 min-h-[4rem] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteData.quote}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                <p className="font-mono text-black dark:text-white text-sm sm:text-base md:text-lg leading-relaxed tracking-tight italic">
                  "{quoteData.quote}"
                </p>

                <div className="flex justify-end items-center">
                  <span className="font-mono text-xs sm:text-sm text-[#909092] tracking-wider uppercase">
                    — {quoteData.author}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default QuoteCard;
