'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';

function getSystemEffective() {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getClipKeyframes(direction) {
  switch (direction) {
    case 'ltr':
      return ['inset(0 100% 0 0)', 'inset(0 0 0 0)'];
    case 'rtl':
      return ['inset(0 0 0 100%)', 'inset(0 0 0 0)'];
    case 'ttb':
      return ['inset(0 0 100% 0)', 'inset(0 0 0 0)'];
    case 'btt':
      return ['inset(100% 0 0 0)', 'inset(0 0 0 0)'];
    default:
      return ['inset(0 100% 0 0)', 'inset(0 0 0 0)'];
  }
}

export function ThemeToggler({
  theme = 'dark',
  resolvedTheme = 'dark',
  setTheme,
  onImmediateChange,
  direction = 'ltr',
  children,
  ...props
}) {
  const [preview, setPreview] = React.useState(null);
  const [current, setCurrent] = React.useState({
    effective: theme,
    resolved: resolvedTheme,
  });

  React.useEffect(() => {
    if (
      preview &&
      theme === preview.effective &&
      resolvedTheme === preview.resolved
    ) {
      setPreview(null);
    }
  }, [theme, resolvedTheme, preview]);

  const [fromClip, toClip] = getClipKeyframes(direction);

  const toggleTheme = React.useCallback(
    async (newTheme) => {
      const resolved = newTheme === 'system' ? getSystemEffective() : newTheme;

      setCurrent({ effective: newTheme, resolved });
      onImmediateChange?.(newTheme);

      if (newTheme === 'system' && resolved === resolvedTheme) {
        setTheme?.(newTheme);
        return;
      }

      if (!document.startViewTransition) {
        flushSync(() => {
          setPreview({ effective: newTheme, resolved });
          document.documentElement.classList.toggle('dark', resolved === 'dark');
        });
        setTheme?.(newTheme);
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setPreview({ effective: newTheme, resolved });
          document.documentElement.classList.toggle(
            'dark',
            resolved === 'dark',
          );
        });
      });

      await transition.ready;

      document.documentElement
        .animate(
          { clipPath: [fromClip, toClip] },
          {
            duration: 650,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
        .finished.finally(() => {
          setTheme?.(newTheme);
        });
    },
    [onImmediateChange, resolvedTheme, fromClip, toClip, setTheme],
  );

  return (
    <React.Fragment {...props}>
      {typeof children === 'function'
        ? children({
            effective: current.effective,
            resolved: current.resolved,
            toggleTheme,
          })
        : children}
      <style>{`::view-transition-old(root), ::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
    </React.Fragment>
  );
}

export default ThemeToggler;
