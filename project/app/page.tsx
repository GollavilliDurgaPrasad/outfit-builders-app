"use client";

import { useState, useEffect } from 'react';
import OutfitBuilder from '@/components/OutfitBuilder';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-background">
        <OutfitBuilder />
        <Toaster />
      </main>
    </ThemeProvider>
  );
}