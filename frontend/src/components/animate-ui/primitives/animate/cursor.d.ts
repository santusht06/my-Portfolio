import * as React from "react";
import { HTMLMotionProps, SpringOptions } from "framer-motion";

export type CursorFollowSide = "top" | "right" | "bottom" | "left";
export type CursorFollowAlign = "start" | "center" | "end";

export interface CursorContextType {
  cursorPos: { x: number; y: number };
  active: boolean;
  global: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
}

export function useCursor(): CursorContextType;

export interface CursorProviderProps {
  children: React.ReactNode;
  global?: boolean;
}

export function CursorProvider(props: CursorProviderProps): React.JSX.Element;

export interface CursorContainerProps extends HTMLMotionProps<"div"> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const CursorContainer: React.ForwardRefExoticComponent<
  CursorContainerProps & React.RefAttributes<HTMLDivElement>
>;

export interface CursorProps extends HTMLMotionProps<"div"> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Cursor: React.ForwardRefExoticComponent<
  CursorProps & React.RefAttributes<HTMLDivElement>
>;

export interface CursorFollowProps extends Omit<HTMLMotionProps<"div">, "transition"> {
  asChild?: boolean;
  side?: CursorFollowSide;
  sideOffset?: number;
  align?: CursorFollowAlign;
  alignOffset?: number;
  transition?: SpringOptions;
  children?: React.ReactNode;
}

export const CursorFollow: React.ForwardRefExoticComponent<
  CursorFollowProps & React.RefAttributes<HTMLDivElement>
>;
