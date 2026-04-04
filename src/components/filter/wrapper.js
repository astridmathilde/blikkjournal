/**
 * Used for wrapping content to display loading states when filter is changed
 */

"use client";

import { useTransition } from "react";
import Filter from "./index";

export default function FilterWrapper({ categories, locations, years, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
    <Filter
      categories={categories}
      locations={locations}
      years={years}
      startTransition={startTransition}
    />
    {isPending  ? <p style={{textAlign: 'center'}}>{"( . . . )"}</p> : children }
    </>
  );
}