import "./globals.css";
import Shell from "@/components/Shell";
import ThemeProvider from "@/components/ThemeProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "NextPrompt.tech — AI-ready Prompt Packs",
  description: "Pre-sequenced prompts for vibe-coders. Copy, paste, ship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
