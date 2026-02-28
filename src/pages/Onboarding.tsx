import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCompanyInfo } from "@/lib/company-context";
import { useCurrency } from "@/lib/currency-context";
import { AlertCircle, Upload, Sparkles, Edit2, Check, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTORS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "E-commerce",
  "Education",
  "Real Estate",
  "Agriculture",
  "Transportation",
  "Hospitality",
  "Legal Services",
  "Consulting",
  "Media & Entertainment",
  "Other",
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Arabic",
];

// International currencies (simplified)
const INTERNATIONAL_CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
];

// All world currencies
const NATIONAL_CURRENCIES = [
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
  { code: "AFN", symbol: "؋", label: "Afghan Afghani" },
  { code: "ALL", symbol: "L", label: "Albanian Lek" },
  { code: "AMD", symbol: "֏", label: "Armenian Dram" },
  { code: "ANG", symbol: "ƒ", label: "Netherlands Antillean Guilder" },
  { code: "AOA", symbol: "Kz", label: "Angolan Kwanza" },
  { code: "ARS", symbol: "$", label: "Argentine Peso" },
  { code: "AUD", symbol: "$", label: "Australian Dollar" },
  { code: "AWG", symbol: "ƒ", label: "Aruban Florin" },
  { code: "AZN", symbol: "₼", label: "Azerbaijani Manat" },
  { code: "BAM", symbol: "KM", label: "Bosnia-Herzegovina Mark" },
  { code: "BBD", symbol: "$", label: "Barbadian Dollar" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "BGN", symbol: "лв", label: "Bulgarian Lev" },
  { code: "BHD", symbol: ".د.ب", label: "Bahraini Dinar" },
  { code: "BIF", symbol: "Fr", label: "Burundian Franc" },
  { code: "BMD", symbol: "$", label: "Bermudian Dollar" },
  { code: "BND", symbol: "$", label: "Brunei Dollar" },
  { code: "BOB", symbol: "Bs.", label: "Bolivian Boliviano" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "BSD", symbol: "$", label: "Bahamian Dollar" },
  { code: "BTN", symbol: "Nu.", label: "Bhutanese Ngultrum" },
  { code: "BWP", symbol: "P", label: "Botswana Pula" },
  { code: "BYN", symbol: "Br", label: "Belarusian Ruble" },
  { code: "BZD", symbol: "$", label: "Belize Dollar" },
  { code: "CAD", symbol: "$", label: "Canadian Dollar" },
  { code: "CDF", symbol: "Fr", label: "Congolese Franc" },
  { code: "CHE", symbol: "CHE", label: "Swiss WIR Euro" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
  { code: "CHW", symbol: "CHW", label: "Swiss WIR Franc" },
  { code: "CLF", symbol: "UF", label: "Chilean Unit of Account" },
  { code: "CLP", symbol: "$", label: "Chilean Peso" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "COP", symbol: "$", label: "Colombian Peso" },
  { code: "COU", symbol: "$", label: "Colombian Real Value Unit" },
  { code: "CRC", symbol: "₡", label: "Costa Rican Colon" },
  { code: "CUC", symbol: "$", label: "Cuban Convertible Peso" },
  { code: "CUP", symbol: "₱", label: "Cuban Peso" },
  { code: "CVE", symbol: "$", label: "Cape Verdean Escudo" },
  { code: "CZK", symbol: "Kč", label: "Czech Koruna" },
  { code: "DJF", symbol: "Fr", label: "Djiboutian Franc" },
  { code: "DKK", symbol: "kr", label: "Danish Krone" },
  { code: "DOP", symbol: "RD$", label: "Dominican Peso" },
  { code: "DZD", symbol: "د.ج", label: "Algerian Dinar" },
  { code: "EGP", symbol: "£", label: "Egyptian Pound" },
  { code: "ERN", symbol: "Nfk", label: "Eritrean Nakfa" },
  { code: "ETB", symbol: "Br", label: "Ethiopian Birr" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "FJD", symbol: "$", label: "Fiji Dollar" },
  { code: "FKP", symbol: "£", label: "Falkland Islands Pound" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "GEL", symbol: "₾", label: "Georgian Lari" },
  { code: "GHS", symbol: "₵", label: "Ghanaian Cedi" },
  { code: "GIP", symbol: "£", label: "Gibraltar Pound" },
  { code: "GMD", symbol: "D", label: "Gambian Dalasi" },
  { code: "GNF", symbol: "Fr", label: "Guinean Franc" },
  { code: "GTQ", symbol: "Q", label: "Guatemalan Quetzal" },
  { code: "GYD", symbol: "$", label: "Guyanese Dollar" },
  { code: "HKD", symbol: "$", label: "Hong Kong Dollar" },
  { code: "HNL", symbol: "L", label: "Honduran Lempira" },
  { code: "HRK", symbol: "kn", label: "Croatian Kuna" },
  { code: "HTG", symbol: "G", label: "Haitian Gourde" },
  { code: "HUF", symbol: "Ft", label: "Hungarian Forint" },
  { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah" },
  { code: "ILS", symbol: "₪", label: "Israeli Shekel" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "IQD", symbol: "ع.د", label: "Iraqi Dinar" },
  { code: "IRR", symbol: "﷼", label: "Iranian Rial" },
  { code: "ISK", symbol: "kr", label: "Icelandic Króna" },
  { code: "JMD", symbol: "J$", label: "Jamaican Dollar" },
  { code: "JOD", symbol: "د.ا", label: "Jordanian Dinar" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "KES", symbol: "Sh", label: "Kenyan Shilling" },
  { code: "KGS", symbol: "с", label: "Kyrgyzstani Som" },
  { code: "KHR", symbol: "៛", label: "Cambodian Riel" },
  { code: "KMF", symbol: "Fr", label: "Comorian Franc" },
  { code: "KPW", symbol: "₩", label: "North Korean Won" },
  { code: "KRW", symbol: "₩", label: "South Korean Won" },
  { code: "KWD", symbol: "د.ك", label: "Kuwaiti Dinar" },
  { code: "KYD", symbol: "$", label: "Cayman Islands Dollar" },
  { code: "KZT", symbol: "₸", label: "Kazakhstani Tenge" },
  { code: "LAK", symbol: "₭", label: "Laotian Kip" },
  { code: "LBP", symbol: "£", label: "Lebanese Pound" },
  { code: "LKR", symbol: "Rs", label: "Sri Lankan Rupee" },
  { code: "LRD", symbol: "$", label: "Liberian Dollar" },
  { code: "LSL", symbol: "L", label: "Lesotho Loti" },
  { code: "LYD", symbol: "ل.د", label: "Libyan Dinar" },
  { code: "MAD", symbol: "د.م.", label: "Moroccan Dirham" },
  { code: "MDL", symbol: "L", label: "Moldovan Leu" },
  { code: "MGA", symbol: "Ar", label: "Malagasy Ariary" },
  { code: "MKD", symbol: "ден", label: "Macedonian Denar" },
  { code: "MMK", symbol: "Ks", label: "Myanmar Kyat" },
  { code: "MNT", symbol: "₮", label: "Mongolian Tugrik" },
  { code: "MOP", symbol: "P", label: "Macanese Pataca" },
  { code: "MRU", symbol: "UM", label: "Mauritanian Ouguiya" },
  { code: "MUR", symbol: "₨", label: "Mauritian Rupee" },
  { code: "MVR", symbol: "Rf", label: "Maldivian Rufiyaa" },
  { code: "MWK", symbol: "MK", label: "Malawian Kwacha" },
  { code: "MXN", symbol: "$", label: "Mexican Peso" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit" },
  { code: "MZN", symbol: "MT", label: "Mozambican Metical" },
  { code: "NAD", symbol: "$", label: "Namibian Dollar" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
  { code: "NIO", symbol: "C$", label: "Nicaraguan Córdoba" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone" },
  { code: "NPR", symbol: "₨", label: "Nepalese Rupee" },
  { code: "NZD", symbol: "$", label: "New Zealand Dollar" },
  { code: "OMR", symbol: "ر.ع.", label: "Omani Rial" },
  { code: "PAB", symbol: "B/.", label: "Panamanian Balboa" },
  { code: "PEN", symbol: "S/", label: "Peruvian Sol" },
  { code: "PGK", symbol: "K", label: "Papua New Guinean Kina" },
  { code: "PHP", symbol: "₱", label: "Philippine Peso" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
  { code: "PLN", symbol: "zł", label: "Polish Zloty" },
  { code: "PYG", symbol: "₲", label: "Paraguayan Guarani" },
  { code: "QAR", symbol: "ر.ق", label: "Qatari Riyal" },
  { code: "RON", symbol: "lei", label: "Romanian Leu" },
  { code: "RSD", symbol: "Дин.", label: "Serbian Dinar" },
  { code: "RUB", symbol: "₽", label: "Russian Ruble" },
  { code: "RWF", symbol: "Fr", label: "Rwandan Franc" },
  { code: "SAR", symbol: "ر.س", label: "Saudi Riyal" },
  { code: "SBD", symbol: "$", label: "Solomon Islands Dollar" },
  { code: "SCR", symbol: "₨", label: "Seychellois Rupee" },
  { code: "SDG", symbol: "£", label: "Sudanese Pound" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona" },
  { code: "SGD", symbol: "$", label: "Singapore Dollar" },
  { code: "SHP", symbol: "£", label: "Saint Helena Pound" },
  { code: "SLE", symbol: "Le", label: "Sierra Leonean Leone" },
  { code: "SLL", symbol: "Le", label: "Sierra Leonean Leone (old)" },
  { code: "SOS", symbol: "Sh", label: "Somali Shilling" },
  { code: "SRD", symbol: "$", label: "Surinamese Dollar" },
  { code: "SSP", symbol: "£", label: "South Sudanese Pound" },
  { code: "STN", symbol: "Db", label: "São Tomé & Príncipe Dobra" },
  { code: "SYP", symbol: "£", label: "Syrian Pound" },
  { code: "SZL", symbol: "L", label: "Eswatini Lilangeni" },
  { code: "THB", symbol: "฿", label: "Thai Baht" },
  { code: "TJS", symbol: "ЅМ", label: "Tajikistani Somoni" },
  { code: "TMT", symbol: "m", label: "Turkmenistani Manat" },
  { code: "TND", symbol: "د.ت", label: "Tunisian Dinar" },
  { code: "TOP", symbol: "T$", label: "Tongan Paʻanga" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },
  { code: "TTD", symbol: "$", label: "Trinidad & Tobago Dollar" },
  { code: "TWD", symbol: "$", label: "Taiwan Dollar" },
  { code: "TZS", symbol: "Sh", label: "Tanzanian Shilling" },
  { code: "UAH", symbol: "₴", label: "Ukrainian Hryvnia" },
  { code: "UGX", symbol: "Sh", label: "Ugandan Shilling" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "USN", symbol: "$", label: "US Dollar (Next day)" },
  { code: "UYI", symbol: "$", label: "Uruguayan Real Value Unit" },
  { code: "UYU", symbol: "$", label: "Uruguayan Peso" },
  { code: "UYW", symbol: "$", label: "Uruguayan Peso (Indexed)" },
  { code: "UZS", symbol: "so'm", label: "Uzbekistani Som" },
  { code: "VEF", symbol: "Bs.", label: "Venezuelan Bolívar (old)" },
  { code: "VES", symbol: "Bs.", label: "Venezuelan Bolívar" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong" },
  { code: "VUV", symbol: "Vt", label: "Vanuatu Vatu" },
  { code: "WST", symbol: "T", label: "Samoan Tala" },
  { code: "XAF", symbol: "Fr", label: "Central African CFA Franc" },
  { code: "XAG", symbol: "Ag", label: "Silver (Troy Ounce)" },
  { code: "XAU", symbol: "Au", label: "Gold (Troy Ounce)" },
  { code: "XBA", symbol: "XBA", label: "European Composite Unit Bond" },
  { code: "XBB", symbol: "XBB", label: "European Monetary Unit Bond" },
  { code: "XBC", symbol: "XBC", label: "European Unit of Account 9" },
  { code: "XBD", symbol: "XBD", label: "European Unit of Account 17" },
  { code: "XCD", symbol: "$", label: "East Caribbean Dollar" },
  { code: "XDR", symbol: "XDR", label: "SDR (IMF)" },
  { code: "XOF", symbol: "Fr", label: "West African CFA Franc" },
  { code: "XPD", symbol: "Pd", label: "Palladium (Troy Ounce)" },
  { code: "XPF", symbol: "Fr", label: "CFP Franc" },
  { code: "XPT", symbol: "Pt", label: "Platinum (Troy Ounce)" },
  { code: "XSU", symbol: "XSU", label: "Sucre (ALBA)" },
  { code: "XTS", symbol: "XTS", label: "Testing Code" },
  { code: "XUA", symbol: "XUA", label: "ADB Unit of Account" },
  { code: "XXX", symbol: "XXX", label: "No Currency" },
  { code: "YER", symbol: "﷼", label: "Yemeni Rial" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "ZMW", symbol: "ZK", label: "Zambian Kwacha" },
  { code: "ZWL", symbol: "$", label: "Zimbabwean Dollar" },
];

const inputErrorClass = "border-red-500 focus-visible:ring-red-500/20";
const inputBaseClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateCompanyInfo, companyInfo } = useCompanyInfo();
  const { setCurrency } = useCurrency();
  const formRef = useRef<HTMLFormElement>(null);

  // Required fields
  const [companyName, setCompanyName] = useState(
    companyInfo?.companyName || "",
  );
  const [description, setDescription] = useState(
    companyInfo?.description || "",
  );
  const [numberOfWorkers, setNumberOfWorkers] = useState(
    companyInfo?.numberOfWorkers || "",
  );
  const [sector, setSector] = useState(companyInfo?.sector || "");
  const [companySize, setCompanySize] = useState(
    companyInfo?.companySize || "",
  );
  const [country, setCountry] = useState(companyInfo?.country || "");
  const [state, setState] = useState(companyInfo?.state || "");
  const [city, setCity] = useState(companyInfo?.city || "");
  const [websiteUrl, setWebsiteUrl] = useState(companyInfo?.websiteUrl || "");

  // Optional fields
  const [showOptional, setShowOptional] = useState(false);
  const [email, setEmail] = useState(companyInfo?.email || "");
  const [phone, setPhone] = useState(companyInfo?.phone || "");
  const [fiscalYearEndDate, setFiscalYearEndDate] = useState(
    companyInfo?.fiscalYearEndDate || "",
  );
  const [currencyFormat, setCurrencyFormat] = useState(
    companyInfo?.currencyFormat || "international"
  );
  const [currencyPreference, setCurrencyPreference] = useState(
    companyInfo?.currencyPreference || "USD",
  );
  const [language, setLanguage] = useState(companyInfo?.language || "English");
  const [numberOfEntities, setNumberOfEntities] = useState(
    companyInfo?.numberOfEntities || "",
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // AI Business Summary
  const [aiSummary, setAiSummary] = useState(companyInfo?.aiSummary || "");
  const [summaryApproved, setSummaryApproved] = useState(
    !!companyInfo?.aiSummary
  );
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [editingSummary, setEditingSummary] = useState(false);

  const canGenerateSummary =
    [companyName, description, numberOfWorkers, sector, companySize, country, state, city].every(
      (v) => typeof v === "string" && v.trim().length > 0
    );

  const generateAISummary = async () => {
    if (!canGenerateSummary) return;
    setGeneratingSummary(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.aiSummary;
      return next;
    });
    try {
      const summary = `${companyName.trim()} is a ${companySize} company in the ${sector} sector with ${numberOfWorkers} employees, based in ${city.trim()}, ${state.trim()}, ${country.trim()}. ${description.trim()}`;
      setAiSummary(summary);
      setSummaryApproved(false);
      setEditingSummary(false);
    } catch (error) {
      console.error("Error generating summary:", error);
      setErrors((prev) => ({
        ...prev,
        aiSummary: "Failed to generate AI summary. Please try again.",
      }));
    } finally {
      setGeneratingSummary(false);
    }
  };

  useEffect(() => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey || !formRef.current) return;
    const el = formRef.current.querySelector(`[data-error-key="${firstKey}"]`);
    (el as HTMLElement)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  const validateRequired = () => {
    const newErrors: Record<string, string> = {};

    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!numberOfWorkers)
      newErrors.numberOfWorkers = "Number of workers is required";
    if (!sector) newErrors.sector = "Sector is required";
    if (!companySize) newErrors.companySize = "Company size is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!state.trim()) newErrors.state = "State/Province is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!currencyFormat) newErrors.currencyFormat = "Please select a currency format";
    if (!currencyPreference) newErrors.currencyPreference = "Please select a currency";
    if (!summaryApproved)
      newErrors.aiSummary = "Please approve the AI-generated business summary";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: "Logo must be less than 5MB" }));
        return;
      }
      setLogoFile(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.logo;
        return next;
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompanyInfo({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRequired()) {
      return;
    }

    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      updateCompanyInfo({
        companyName,
        description,
        numberOfWorkers: Number(numberOfWorkers),
        sector,
        companySize: companySize as "small" | "medium" | "enterprise",
        country,
        state,
        city,
        currencyFormat,
        currencyPreference,
        aiSummary,
        ...(websiteUrl && websiteUrl !== "" && { websiteUrl }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(fiscalYearEndDate && { fiscalYearEndDate }),
        ...(language && { language }),
        ...(numberOfEntities && { numberOfEntities: Number(numberOfEntities) }),
      });

      // Sync with global currency context
      if (currencyPreference) {
        setCurrency(currencyPreference);
      }

      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-6 px-4 sm:py-8 sm:px-6 md:py-12">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="shadow-lg shadow-primary/5 border-0 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 sm:py-8 px-4 sm:px-6 md:px-8">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
                Complete Your Company Profile
              </CardTitle>
              <p className="text-blue-100 text-sm sm:text-base">
                Set up your company information to personalize your Joseph experience
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Required Fields Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Required Information
                </h3>
                <div className="space-y-4">
                  <div data-error-key="companyName">
                    <Label
                      htmlFor="companyName"
                      className="text-sm font-medium"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.companyName;
                          return newErrors;
                        });
                      }}
                      placeholder="Enter your company name"
                      className={cn("mt-1.5", errors.companyName && inputErrorClass)}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div data-error-key="description">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Company Description
                    </Label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.description;
                          return newErrors;
                        });
                      }}
                      placeholder="Brief description of your company"
                      className={cn(
                        "mt-1.5 resize-y min-h-[80px]",
                        inputBaseClass,
                        errors.description && inputErrorClass
                      )}
                      rows={3}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div data-error-key="numberOfWorkers">
                      <Label
                        htmlFor="numberOfWorkers"
                        className="text-sm font-medium"
                      >
                        Number of Workers
                      </Label>
                      <Input
                        id="numberOfWorkers"
                        type="number"
                        value={numberOfWorkers}
                        onChange={(e) => {
                          setNumberOfWorkers(e.target.value);
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.numberOfWorkers;
                            return newErrors;
                          });
                        }}
                        placeholder="e.g., 50"
                        min="1"
                        className={cn("mt-1.5", errors.numberOfWorkers && inputErrorClass)}
                      />
                      {errors.numberOfWorkers && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errors.numberOfWorkers}
                        </p>
                      )}
                    </div>

                    <div data-error-key="sector">
                      <Label htmlFor="sector" className="text-sm font-medium">
                        Sector
                      </Label>
                      <select
                        id="sector"
                        value={sector}
                        onChange={(e) => {
                          setSector(e.target.value);
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.sector;
                            return newErrors;
                          });
                        }}
                        className={cn(
                          "mt-1.5",
                          inputBaseClass,
                          "cursor-pointer",
                          errors.sector && inputErrorClass
                        )}
                      >
                        <option value="">Select a sector</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errors.sector}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div data-error-key="companySize">
                      <Label
                        htmlFor="companySize"
                        className="text-sm font-medium"
                      >
                        Company Size
                      </Label>
                      <select
                        id="companySize"
                        value={companySize}
                        onChange={(e) => {
                          setCompanySize(e.target.value);
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.companySize;
                            return newErrors;
                          });
                        }}
                        className={cn(
                          "mt-1.5",
                          inputBaseClass,
                          "cursor-pointer",
                          errors.companySize && inputErrorClass
                        )}
                      >
                        <option value="">Select company size</option>
                        <option value="small">Small (1-50 employees)</option>
                        <option value="medium">
                          Medium (51-250 employees)
                        </option>
                        <option value="enterprise">
                          Enterprise (250+ employees)
                        </option>
                      </select>
                      {errors.companySize && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errors.companySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      Location
                    </h4>
                    <div className="space-y-3">
                      <div data-error-key="country">
                        <Label
                          htmlFor="country"
                          className="text-sm font-medium"
                        >
                          Country
                        </Label>
                        <Input
                          id="country"
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.country;
                              return newErrors;
                            });
                          }}
                          placeholder="e.g., United States"
                          className={cn("mt-1.5", errors.country && inputErrorClass)}
                        />
                        {errors.country && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div data-error-key="state">
                          <Label
                            htmlFor="state"
                            className="text-sm font-medium"
                          >
                            State / Province
                          </Label>
                          <Input
                            id="state"
                            value={state}
                            onChange={(e) => {
                              setState(e.target.value);
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.state;
                                return newErrors;
                              });
                            }}
                            placeholder="e.g., California"
                            className={cn("mt-1.5", errors.state && inputErrorClass)}
                          />
                          {errors.state && (
                            <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                              <AlertCircle className="h-4 w-4 shrink-0" />
                              {errors.state}
                            </p>
                          )}
                        </div>

                        <div data-error-key="city">
                          <Label htmlFor="city" className="text-sm font-medium">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.city;
                                return newErrors;
                              });
                            }}
                            placeholder="e.g., San Francisco"
                            className={cn("mt-1.5", errors.city && inputErrorClass)}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                              <AlertCircle className="h-4 w-4 shrink-0" />
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl" className="text-sm font-medium">
                      Website URL{" "}
                      <span className="text-muted-foreground text-xs">(Optional)</span>
                    </Label>
                    <div className="mt-1.5 flex items-center rounded-md border border-input bg-background overflow-hidden ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-shadow">
                      <span className="px-3 py-2.5 text-sm font-medium text-muted-foreground bg-muted/30 border-r border-input whitespace-nowrap">
                        https://
                      </span>
                      <input
                        id="websiteUrl"
                        type="text"
                        value={websiteUrl.replace(/^https:\/\//, "")}
                        onChange={(e) => {
                          const domainValue = e.target.value.replace(
                            /^https:\/\//,
                            "",
                          );
                          setWebsiteUrl(
                            domainValue ? `https://${domainValue}` : "",
                          );
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.websiteUrl;
                            return newErrors;
                          });
                        }}
                        placeholder="example.com (optional)"
                        className="flex-1 min-w-0 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Business Summary - Required */}
              <div data-error-key="aiSummary" className="border-t border-border pt-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      AI Business Summary
                    </h3>
                    {summaryApproved && (
                      <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                        <Check className="h-4 w-4 shrink-0" />
                        Approved
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fill in the required fields above, then generate and approve a short description of your company.
                  </p>

                  {!aiSummary ? (
                    <div className="space-y-2">
                      <Button
                        type="button"
                        onClick={generateAISummary}
                        disabled={generatingSummary || !canGenerateSummary}
                        className="w-full min-h-[44px] sm:min-h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 disabled:opacity-60"
                      >
                        <Sparkles className="h-4 w-4 mr-2 shrink-0" />
                        {generatingSummary
                          ? "Generating Summary..."
                          : canGenerateSummary
                            ? "Generate AI Summary"
                            : "Fill required fields above first"}
                      </Button>
                      {!canGenerateSummary && (
                        <p className="text-xs text-muted-foreground">
                          Company name, description, workers, sector, size, and location are required.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editingSummary ? (
                        <textarea
                          value={aiSummary}
                          onChange={(e) => setAiSummary(e.target.value)}
                          className={cn(inputBaseClass, "min-h-[100px] resize-y")}
                          rows={4}
                        />
                      ) : (
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg transition-colors">
                          <p className="text-sm text-foreground">{aiSummary}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2">
                        {!summaryApproved ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => {
                                setSummaryApproved(true);
                                setEditingSummary(false);
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors.aiSummary;
                                  return newErrors;
                                });
                              }}
                              className="flex-1 min-h-[44px] sm:min-h-10 bg-green-600 hover:bg-green-700 text-white transition-colors"
                            >
                              <Check className="h-4 w-4 mr-2 shrink-0" />
                              Approve
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setEditingSummary(!editingSummary)}
                              variant="outline"
                              className="flex-1 min-h-[44px] sm:min-h-10"
                            >
                              <Edit2 className="h-4 w-4 mr-2 shrink-0" />
                              {editingSummary ? "Cancel" : "Edit"}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="button"
                              onClick={() => {
                                setSummaryApproved(false);
                                setEditingSummary(true);
                              }}
                              variant="outline"
                              className="flex-1 min-h-[44px] sm:min-h-10"
                            >
                              <Edit2 className="h-4 w-4 mr-2 shrink-0" />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setAiSummary("");
                                setSummaryApproved(false);
                                setEditingSummary(false);
                              }}
                              variant="outline"
                              className="flex-1 min-h-[44px] sm:min-h-10"
                            >
                              Regenerate
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {errors.aiSummary && (
                    <p className="text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.aiSummary}
                    </p>
                  )}
                </div>
              </div>

              {/* Currency Format - Required */}
              <div className="border-t border-border pt-6 space-y-4">
                <div data-error-key="currencyFormat">
                  <Label className="text-sm font-medium">
                    Currency Format <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Choose how you want to select your currency
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {errors.currencyFormat && (
                      <p className="col-span-full text-sm text-destructive mb-2 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.currencyFormat}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrencyFormat("international");
                        setCurrencyPreference("USD");
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.currencyFormat;
                          return next;
                        });
                      }}
                      className={cn(
                        "p-3 sm:p-4 rounded-lg border-2 min-h-[72px] sm:min-h-[80px] transition-all duration-200 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        currencyFormat === "international"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-muted-foreground/30 text-foreground"
                      )}
                    >
                      <span className="block">🌍 International</span>
                      <span className="text-xs font-normal text-muted-foreground mt-1 block">
                        Dollars & Euros
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrencyFormat("national");
                        setCurrencyPreference("USD");
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.currencyFormat;
                          return next;
                        });
                      }}
                      className={cn(
                        "p-3 sm:p-4 rounded-lg border-2 min-h-[72px] sm:min-h-[80px] transition-all duration-200 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        currencyFormat === "national"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-muted-foreground/30 text-foreground"
                      )}
                    >
                      <span className="block">🗺️ National</span>
                      <span className="text-xs font-normal text-muted-foreground mt-1 block">
                        All currencies
                      </span>
                    </button>
                  </div>
                </div>

                <div data-error-key="currencyPreference">
                  <Label
                    htmlFor="currencyPreference"
                    className="text-sm font-medium"
                  >
                    Select Currency <span className="text-destructive">*</span>
                  </Label>
                  {errors.currencyPreference && (
                    <p className="text-sm text-destructive mt-1 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.currencyPreference}
                    </p>
                  )}
                  <select
                    id="currencyPreference"
                    value={currencyPreference}
                    onChange={(e) => {
                      setCurrencyPreference(e.target.value);
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.currencyPreference;
                        return next;
                      });
                    }}
                    className={cn(
                      "mt-1.5",
                      inputBaseClass,
                      "cursor-pointer",
                      errors.currencyPreference && inputErrorClass
                    )}
                  >
                      {currencyFormat === "international"
                        ? INTERNATIONAL_CURRENCIES.map((curr) => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.label}
                            </option>
                          ))
                        : NATIONAL_CURRENCIES.map((curr) => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.label}
                            </option>
                          ))}
                    </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currencyFormat === "international"
                      ? "Choose between USD or EUR"
                      : `${NATIONAL_CURRENCIES.length} currencies available`}
                  </p>
                </div>
              </div>

              {/* Optional Fields Toggle */}
              <div className="border-t border-border pt-6">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  aria-expanded={showOptional}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/90 transition-colors py-1 -ml-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] sm:min-h-0"
                >
                  {showOptional ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  Optional Information
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-out",
                    showOptional ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="mt-4 space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">
                      These fields are optional and can be filled in later.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address (Optional)
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@company.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="fiscalYearEndDate"
                        className="text-sm font-medium"
                      >
                        Fiscal Year End Date (Optional)
                      </Label>
                      <Input
                        id="fiscalYearEndDate"
                        type="date"
                        value={fiscalYearEndDate}
                        onChange={(e) => setFiscalYearEndDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>


                    <div>
                      <Label
                        htmlFor="language"
                        className="text-sm font-medium"
                      >
                        Preferred Language (Optional)
                      </Label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={cn("mt-1.5", inputBaseClass, "cursor-pointer")}
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label
                        htmlFor="numberOfEntities"
                        className="text-sm font-medium"
                      >
                        Number of Business Entities/Subsidiaries (Optional)
                      </Label>
                      <Input
                        id="numberOfEntities"
                        type="number"
                        value={numberOfEntities}
                        onChange={(e) => setNumberOfEntities(e.target.value)}
                        placeholder="e.g., 3"
                        min="1"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="logo" className="text-sm font-medium">
                        Company Logo (Optional)
                      </Label>
                      <div className="mt-1 flex items-center gap-3">
                        <input
                          id="logo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="logo"
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">
                            {logoFile ? logoFile.name : "Choose logo (max 5MB)"}
                          </span>
                        </label>
                      </div>
                      {errors.logo && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errors.logo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col gap-3 pt-6 border-t border-border">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] sm:min-h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-70"
                >
                  {loading
                    ? "Setting up your company..."
                    : "Complete Setup & Continue"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  You can update all of this information later in company settings.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
