"use client";

import { createContext, useContext, ReactNode } from "react";

interface CMSContentContextType {
  content: { [key: string]: string | null };
  getSection: (key: string) => string | null;
  getSectionWithFallback: (key: string, fallback: string) => string;
}

const CMSContentContext = createContext<CMSContentContextType | undefined>(
  undefined
);

interface CMSContentProviderProps {
  children: ReactNode;
  content: { [key: string]: string | null };
}

/**
 * CMS Content Provider
 * 
 * Provides CMS content to child components via React Context.
 * Components can use useCMSContent() hook to access CMS data.
 */
export default function CMSContentProvider({
  children,
  content,
}: CMSContentProviderProps) {
  const getSection = (key: string): string | null => {
    return content[key] || null;
  };

  const getSectionWithFallback = (key: string, fallback: string): string => {
    return content[key] || fallback;
  };

  return (
    <CMSContentContext.Provider
      value={{
        content,
        getSection,
        getSectionWithFallback,
      }}
    >
      {children}
    </CMSContentContext.Provider>
  );
}

/**
 * Hook to access CMS content in components
 */
export function useCMSContent() {
  const context = useContext(CMSContentContext);
  if (context === undefined) {
    // Return default functions if used outside provider (fallback behavior)
    return {
      content: {},
      getSection: () => null,
      getSectionWithFallback: (_key: string, fallback: string) => fallback,
    };
  }
  return context;
}

