import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <main key={location.pathname} className="animate-fade-up">
      {children}
    </main>
  );
}
