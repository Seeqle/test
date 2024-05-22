import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Metadonnées, liens vers les feuilles de style, etc. */}
      </head>
      <body className={inter.className}>
        <div style={{ display: "flex" }}>
          <Navbar />
          <main style={{ flex: 1, marginLeft: "240px" }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
