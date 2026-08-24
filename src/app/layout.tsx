import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vision Ops | Growth Command Center",
  description: "Growth operations dashboard for acquisition, retention, and tracking reliability.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

