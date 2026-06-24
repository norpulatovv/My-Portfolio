"use client";
import { useState, useEffect } from "react";
import { Lang } from "@/lib/i18n";

export function useLang() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return { lang, changeLang };
}