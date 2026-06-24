import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/contexts/LangContext";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CursorGlow from "@/components/effects/CursorGlow";
import PageLoader from "@/components/effects/PageLoader";
import CommandPalette from "@/components/effects/CommandPalette";
import ThemeColorPicker from "@/components/effects/ThemeColorPicker";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ExplosionClick from "@/components/effects/ExplosionClick";
import KonamiCode from "@/components/effects/KonamiCode";
import UISounds from "@/components/effects/UISounds";
import AIChatWidget from "@/components/effects/AIChatWidget";
import Spotlight from "@/components/effects/Spotlight";
import WorldClock from "@/components/effects/WorldClock";
import HireMeBanner from "@/components/effects/HireMeBanner";

export const metadata: Metadata = {
  title: "Miraziz — Full Stack Developer",
  description: "15-year-old Full Stack Developer from Uzbekistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LangProvider>
          <PageLoader />
          <ScrollProgress />
          <CursorGlow />
          <Spotlight />
          <WorldClock />
          <CommandPalette />
          <ThemeColorPicker />
          <SmoothScroll />
          <ExplosionClick />
          <KonamiCode />
          <UISounds />
          <AIChatWidget />
          <HireMeBanner />
          <Navbar />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}