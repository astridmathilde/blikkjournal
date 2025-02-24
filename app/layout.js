import Link from "next/link";
import '../assets/scss/global.scss';

export const siteTitle = "astrid's blikkjournal";

export const metadata = {
  title: siteTitle,
  description: "a collection of moments",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <header>
    <h1><Link href="/">blikkjournal</Link></h1>
    <p>collected moments</p>
    </header>
    <main>
    {children}
    </main>
    </body>
    </html>
  );
}