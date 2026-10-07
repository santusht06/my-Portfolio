import * as React from "react";
import {
  Cursor,
  CursorContainer,
  CursorProvider,
} from "@/components/animate-ui/primitives/animate/cursor";
import { cn } from "@/lib/utils";

/**
 * Custom Animated Cursor Pointer SVG Icon
 */
export const CursorIcon = ({ className = "size-6 text-black dark:text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
  >
    <path
      fill="currentColor"
      d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
    />
  </svg>
);

/**
 * Global or Local animated cursor without bottom description badge
 */
export const CustomCursor = ({ global = true }) => {
  return (
    <CursorProvider global={global}>
      <CursorContainer>
        <Cursor>
          <CursorIcon />
        </Cursor>
      </CursorContainer>
    </CursorProvider>
  );
};

/**
 * CursorDemo component without bottom description (omitting CursorFollow badge)
 */
export const CursorDemo = ({
  global = false,
  enableCursor = true,
  className = "",
}) => {
  return (
    <div
      key={String(global)}
      className={cn(
        "max-w-[400px] h-[400px] w-full bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center relative overflow-hidden",
        className
      )}
    >
      <p className="font-medium italic text-sm text-[#909092] select-none">
        Move your mouse over the div
      </p>
      <CursorProvider global={global}>
        <CursorContainer>
          {enableCursor && (
            <Cursor>
              <CursorIcon />
            </Cursor>
          )}
        </CursorContainer>
      </CursorProvider>
    </div>
  );
};

export default CustomCursor;
