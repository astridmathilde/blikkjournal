/**
* Used for wrapping content to display loading states when filter is changed
*/

"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { useClutter } from "../clutter/context";
import Loading from "../loading";
import Filter from "./index";

export default function FilterWrapper({ categories, locations, years, children, noEntries }) {
  const { level } = useClutter();
   const pathname = usePathname();
  
  if (level <= -4) {
    return children;
  } else {
    const [isPending, startTransition] = useTransition();
    
    return (
      <div className={pathname == "/list" ? "list" : "gallery"}>
      <Filter
      categories={categories}
      locations={locations}
      years={years}
      startTransition={startTransition}
      />
      {isPending  ? (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", minHeight: "50vh", opacity: "0.7", filter: "alpha(opacity=70)"}}>
        <Loading />
        </div>
      ) : noEntries ? (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "50vh", opacity: "0.7", filter: "alpha(opacity=70)"}}>
        <p>( keep looking )</p>
        </div>
      ) : (
        children
      )
    }
    </div>
  );
}
}