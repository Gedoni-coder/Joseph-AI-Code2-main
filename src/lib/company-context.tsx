import React, { createContext, useContext, useState, useEffect } from "react";

export interface CompanyInfo {
  // Required fields
  companyName: string;
  description: string;
  numberOfWorkers: number;
  sector: string;
  companySize: "small" | "medium" | "enterprise";
  country: string;
  state: string;
  city: string;
  websiteUrl?: string;

  // Optional fields
  email?: string;
  phone?: string;
  fiscalYearEndDate?: string;
  currencyFormat?: string;
  currencyPreference?: string;
  logo?: string;
  language?: string;
  numberOfEntities?: number;
}

interface CompanyContextType {
  companyInfo: CompanyInfo | null;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  isSetup: boolean;
  clearCompanyInfo: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const STORAGE_KEY = "joseph:companyInfo";

export function useCompanyInfo() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyInfo must be used within CompanyInfoProvider");
  }
  return context;
}

export function CompanyInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompanyInfo(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load company info from storage:", error);
    }
  }, []);

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => {
      const updated = { ...(prev || ({} as CompanyInfo)), ...info };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save company info:", error);
      }
      return updated;
    });
  };

  const clearCompanyInfo = () => {
    setCompanyInfo(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear company info:", error);
    }
  };

  const isSetup = !!(
    companyInfo?.companyName &&
    companyInfo?.description &&
    companyInfo?.numberOfWorkers &&
    companyInfo?.sector &&
    companyInfo?.companySize &&
    companyInfo?.country &&
    companyInfo?.state &&
    companyInfo?.city
  );

  return (
    <CompanyContext.Provider
      value={{
        companyInfo,
        updateCompanyInfo,
        isSetup,
        clearCompanyInfo,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
