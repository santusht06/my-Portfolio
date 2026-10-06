import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  Dialog,
  DialogPanel,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/animate-ui/components/headless/dialog";
import { Button } from "@/components/ui/button";

const DetailModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  items,
  content,
  tags,
  date,
}) => {
  const [cached, setCached] = React.useState({
    title,
    subtitle,
    items,
    content,
    tags,
    date,
  });

  React.useEffect(() => {
    if (isOpen && (title || content || items)) {
      setCached({ title, subtitle, items, content, tags, date });
    }
  }, [isOpen, title, subtitle, items, content, tags, date]);

  const activeTitle = title || cached.title;
  const activeSubtitle = subtitle || cached.subtitle;
  const activeItems = items || cached.items;
  const activeContent = content || cached.content;
  const activeTags = tags || cached.tags;
  const activeDate = date || cached.date;

  return (
    <Dialog open={Boolean(isOpen)} onClose={onClose}>
      <DialogPanel
        from="top"
        showCloseButton={true}
        className="w-full max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col bg-white dark:bg-black border border-black/10 dark:border-white/10"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-black pr-12">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                {activeTitle}
              </DialogTitle>
              {activeDate && (
                <span className="text-xs font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] px-2 py-0.5 rounded border border-black/[0.08] dark:border-white/[0.06]">
                  {activeDate}
                </span>
              )}
            </div>
            {activeSubtitle && (
              <DialogDescription className="text-sm text-[#909092]">
                {activeSubtitle}
              </DialogDescription>
            )}
          </DialogHeader>

          {activeTags && activeTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {activeTags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#909092] border border-black/[0.08] dark:border-white/[0.08] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/20 hover-only:hover:text-black dark:hover-only:hover:text-white transition-[border-color,color] duration-150"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {activeContent && (
            <div className="text-sm sm:text-base text-black/80 dark:text-white/80 leading-relaxed font-sans prose dark:prose-invert">
              <p>{activeContent}</p>
            </div>
          )}

          {activeItems && activeItems.length > 0 && (
            <div className="space-y-3">
              {activeItems.map((it, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] hover-only:hover:border-black/15 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.04] dark:hover-only:hover:bg-white/[0.045] flex items-start gap-3 transition-[border-color,background-color] duration-150 ease-smooth group"
                >
                  <FiCheckCircle className="text-[#909092] group-hover:text-black dark:group-hover:text-white mt-1 flex-shrink-0 text-sm group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-black dark:text-white">
                      {it.name || it.title}
                    </h4>
                    <p className="text-xs text-[#909092] mt-0.5">
                      {it.detail || it.takeaway || it.note || it.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs font-mono"
          >
            Close
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default DetailModal;
