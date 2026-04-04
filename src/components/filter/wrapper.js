/**
* Used for wrapping content to display loading states when filter is changed
*/

"use client";

import { useTransition } from "react";
import { useClutter } from "../clutter/context";
import Loading from "../loading";
import Filter from "./index";

export default function FilterWrapper({ categories, locations, years, children }) {
  const { level } = useClutter();
  
  if (level <= -6) {
    return children;
  } else {
    const [isPending, startTransition] = useTransition();
    
    return (
      <>
      <Filter
      categories={categories}
      locations={locations}
      years={years}
      startTransition={startTransition}
      />
      {isPending  ? <Loading /> : children }
      </>
    );
  }
}