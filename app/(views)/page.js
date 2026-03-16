import { siteTitle, siteDescription } from "./layout";
import { getEntries } from "@/app/lib/notion";
import EntryGalleryLoader from "../components/entry/gallery-loader";
import utils from "@/app/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};

export default async function Gallery() {
  const { results, nextCursor, hasMore } = await getEntries();

  return (
    <>
      <h2 className={utils.screen_reader_text}>Gallery</h2>
      <EntryGalleryLoader
        initialEntries={results}
        initialCursor={nextCursor}
        initialHasMore={hasMore}
      />
    </>
  );
}