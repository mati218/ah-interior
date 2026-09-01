import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "A&H Interiors | Luxury Interior Design",
    template: "%s | A&H Interiors",
  },
  description:
    "A boutique interior design studio crafting warm, timeless spaces — residential, hospitality, and commercial interiors shaped around light, material, and calm.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="grain-overlay min-h-full flex flex-col bg-ivory text-black">
        <Providers>
          <SmoothScrollProvider />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
