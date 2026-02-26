/**
* Component setting the global state for clutter control
* 
*/

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "blikkjournal.clutterLevel";
const MIN_LEVEL = -6;
const MAX_LEVEL = 6 ;

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function levelToToken(level) {
  if (level === 0) return "default-0";
  if (level < 0) return `declutter-${Math.abs(level)}`;
  return `clutter-${level}`;
}

const ClutterContext = createContext(null);

export function ClutterProvider({ children, defaultLevel = 0 }) {
  const [level, setLevel] = useState(defaultLevel);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw == null) return;
      const parsed = Number(raw);
      if (Number.isNaN(parsed)) return;
      setLevel(clamp(parsed, MIN_LEVEL, MAX_LEVEL));
    } catch {
    }
  }, []);

  const token = useMemo(() => levelToToken(level), [level]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(level));
    } catch {
    }

    document.documentElement.dataset.clutter = token;
  }, [level, token]);

  const value = {
    level,
    setLevel,
    token,
    min: MIN_LEVEL,
    max: MAX_LEVEL,
  }

  return <ClutterContext.Provider value={value}>{children}</ClutterContext.Provider>;
}

export function useClutter() {
  const ctx = useContext(ClutterContext);
  return ctx;
}
