"use client";

import { useClutter } from "./clutter-context";

export default function ClutterControl() {
  const { level, setLevel, min, max } = useClutter();
  
  return (
    <>
    <label>
    Clutter
    <input
    type="range"
    min={min}
    max={max}
    step={1}
    value={level}
    onChange={(e) => setLevel(Number(e.target.value))}
    />
    </label>
    </>
  )
}