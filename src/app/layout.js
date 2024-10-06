import "./globals.css";
import ClientNavbar from "./ClientNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        <main className="container mx-auto mt-8 mb-16 md:mb-8">{children}</main>
      </body>
    </html>
  );
}
