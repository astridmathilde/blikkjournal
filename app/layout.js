
import '../assets/scss/global.scss';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <main>
    {children}
    </main>
    </body>
    </html>
  );
}