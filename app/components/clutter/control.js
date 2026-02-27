"use client";

import { useState } from "react";
import { useClutter } from "./context";
import IconClutter from "../icons/icon-clutter";
import utils from "@/app/assets/scss/utils.module.scss";
import styles from "@/app/assets/scss/components/clutter-control.module.scss";

export default function ClutterControl() {
  const [open, setOpen] = useState(false);
  const { level, setLevel, min, max } = useClutter();
  
  const handleClick = () => {
    setOpen(!open);
  }
  
  return (
    <div className={styles.clutterControl}>
    <button onClick={handleClick} aria-expanded={open} aria-controls="clutter-input">
    {! open ? <IconClutter /> : ""}
    {level !== -6 || open ? <span className={styles.label}>Clutter</span> : <span className={utils.screen_reader_text}>Clutter</span> }
    </button>
    
    {open ? (
      <div className={styles.clutterInput} id="clutter-input">
      <label><span className={utils.screen_reader_text}>Clutter</span>
      <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={level}
      onChange={(e) => setLevel(Number(e.target.value))}
      />
      </label>
      </div>
    )
  : ""  
  }
  </div>
)
}