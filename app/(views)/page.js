import { siteTitle, siteDescription } from "./layout";
import { getEntries } from "@/app/lib/notion";
import Loader from "@/app/components/loader";
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
      <Loader
        initialEntries={results}
        initialCursor={nextCursor}
        initialHasMore={hasMore}
      />
    </>
  );
}