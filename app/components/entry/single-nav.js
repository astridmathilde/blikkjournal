import { getEntries } from "@/app/lib/notion";
import Link from "next/link";

export default async function SingleEntryNav(entryId) {
  const entries = await getEntries();
  const currentIndex = entries.findIndex(entry => entry.id === entryId);
  
  async function getNext() {
    if (currentIndex < entries.length - 1) {
      return entries[currentIndex + 1];
    } else {
      return null;
    }
  }
  
  async function getPrev() {
    if (currentIndex > 0) {
      return entries[currentIndex - 1];
    } else {
      return null;
    }
  }
  
  const prev = await getPrev();
  const next = await getNext();
  
  return (
    <nav>
    <ul>
    {prev ? <li><Link href={`/entry/${prev.id}`} aria-label="Go to previous entry">Prev</Link></li> : "" }
    {next ? <li><Link href={`/entry/${next.id}`} aria-label="Go to next entry">next</Link></li> : "" }
    </ul>
    </nav>
  )
  
}