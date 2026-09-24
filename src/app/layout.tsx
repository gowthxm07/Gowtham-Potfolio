import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gowtham Hari S | Engineering Portfolio",
  description:
    "Official engineering portfolio of Gowtham Hari S — B.Tech Computer Science student at Amrita Vishwa Vidhyapeetham, LeetCode Knight, and Full-Stack & Computer Vision developer.",
  keywords: [
    "Gowtham Hari S",
    "Computer Science",
    "Amrita Vishwa Vidhyapeetham",
    "Portfolio",
    "Full-Stack",
    "Computer Vision",
    "AI",
    "LeetCode Knight",
  ],
  authors: [{ name: "Gowtham Hari S" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark bg-background text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
