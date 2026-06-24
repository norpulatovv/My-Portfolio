"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; changeLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", changeLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return <LangContext.Provider value={{ lang, changeLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);