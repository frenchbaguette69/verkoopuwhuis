import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Huis verkopen zonder makelaar | Direct bod ontvangen",
  description:
    "Uw huis verkopen zonder makelaar? verkoopuwhuis.nu koopt woningen in heel Nederland direct op. Ontvang binnen 24 uur een vrijblijvend bod zonder gedoe, makelaarskosten of onzekerheid.",
  keywords: [
    "huis verkopen zonder makelaar",
    "woning verkopen zonder makelaar",
    "huis direct verkopen",
    "huis verkopen snel",
    "huis verkopen binnen 1 week",
    "vrijblijvend bod op huis",
    "woning opkoper Nederland",
    "huis verkopen zonder Funda",
    "woning verkopen zonder kosten",
  ],
  openGraph: {
    title: "Huis verkopen zonder makelaar | verkoopuwhuis.nu",
    description:
      "Wilt u uw woning snel verkopen zonder tussenkomst van een makelaar? verkoopuwhuis.nu koopt uw huis direct op. Binnen 24 uur een bod!",
    url: "https://verkoopuwhuis.nu",
    siteName: "verkoopuwhuis.nu",
    images: [
      {
        url: "https://verkoopuwhuis.nu/logo.png",
        width: 1200,
        height: 630,
        alt: "Huis verkopen zonder makelaar - verkoopuwhuis.nu",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
