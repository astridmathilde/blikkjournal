/** 
* App -> entry -> [entryId] -> page.js
*/

import { getEntry } from "@/app/lib/notion"; 
import NavBack from "@/app/components/nav-back";
import EntryImage from "@/app/components/entry/image";
import utils from "@/app/assets/scss/utils.module.scss";
import styles from "@/app/assets/scss/components/entry/single.module.scss";

export default async function Post({ params }) {
  const { entryId } = await params
  const entry = await getEntry(entryId);
  
  const title = entry.properties?.Title?.title[0]?.plain_text || "";
  
  return (
    <NavBack>
    <article key={entryId} className={styles.singleEntry}>
    <header>
    <h2 className={utils.screen_reader_text}>{title}</h2>
    </header>
    <figure className={styles.image}>
    <EntryImage alt={title} entryId={entryId} width="600" height="600" preload={true} loading="eager" />
    </figure>
    </article>
    </NavBack>
  )
  
}