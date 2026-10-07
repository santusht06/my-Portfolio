import * as React from "react";
import {
  Cursor,
  CursorContainer,
  CursorProvider,
} from "@/components/animate-ui/primitives/animate/cursor";

/**
 * CursorDemo component with custom SVG cursor and without the bottom description badge
 */
export const CursorDemo = ({
  global = false,
  enableCursor = true,
  className = "max-w-[400px] h-[400px] w-full bg-accent flex items-center justify-center relative overflow-hidden",
}) => {
  return (
    <div key={String(global)} className={className}>
      <p className="font-medium italic text-muted-foreground select-none">
        Move your mouse over the div
      </p>
      <CursorProvider global={global}>
        <CursorContainer>
          {enableCursor && (
            <Cursor>
              <svg
                className="size-6 text-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <path
                  fill="currentColor"
                  d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                />
              </svg>
            </Cursor>
          )}
        </CursorContainer>
      </CursorProvider>
    </div>
  );
};

export default CursorDemo;
