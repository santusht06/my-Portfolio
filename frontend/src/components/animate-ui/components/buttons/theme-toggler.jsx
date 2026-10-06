'use client';

import * as React from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

import {
  ThemeToggler as ThemeTogglerPrimitive,
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';
import { cn } from '@/lib/utils';

const getIcon = (
  effective,
  resolved,
  modes,
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor className="size-4" />
  ) : theme === 'dark' ? (
    <Moon className="size-4" />
  ) : (
    <Sun className="size-4" />
  );
};

const getNextTheme = (
  effective,
  modes,
) => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

function useSafeTheme() {
  const [mounted, setMounted] = React.useState(false);
  const [localTheme, setLocalTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  let nextThemeContext = null;
  try {
    nextThemeContext = useNextTheme();
  } catch (err) {
    // outside next-themes ThemeProvider
  }

  React.useEffect(() => {
    setMounted(true);
    const initial = localStorage.getItem('theme') || 'dark';
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (initial === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (nextThemeContext && nextThemeContext.setTheme) {
    return {
      theme: nextThemeContext.theme || 'dark',
      resolvedTheme: nextThemeContext.resolvedTheme || 'dark',
      setTheme: (t) => {
        nextThemeContext.setTheme(t);
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', t);
        }
      },
    };
  }

  const resolvedTheme =
    localTheme === 'system'
      ? typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : localTheme;

  const handleSetTheme = (t) => {
    setLocalTheme(t);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', t);
      const isDark =
        t === 'dark' ||
        (t === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    }
  };

  return {
    theme: mounted ? localTheme : 'dark',
    resolvedTheme: mounted ? resolvedTheme : 'dark',
    setTheme: handleSetTheme,
  };
}

export function ThemeTogglerButton({
  variant = 'default',
  size = 'default',
  modes = ['light', 'dark', 'system'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}) {
  const { theme, resolvedTheme, setTheme } = useSafeTheme();

  return (
    <ThemeTogglerPrimitive
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <button
          type="button"
          data-slot="theme-toggler-button"
          aria-label={`Current theme: ${effective}. Click to toggle theme.`}
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
          {...props}
        >
          {getIcon(effective, resolved, modes)}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export function ThemeTogglerButtonDemo({
  variant = 'outline',
  size = 'default',
  direction = 'btt',
  system = false,
}) {
  return (
    <ThemeTogglerButton
      variant={variant}
      size={size}
      direction={direction}
      modes={system ? ['light', 'dark', 'system'] : ['light', 'dark']}
    />
  );
}

export default ThemeTogglerButtonDemo;
