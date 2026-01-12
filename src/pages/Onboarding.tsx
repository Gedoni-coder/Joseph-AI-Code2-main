import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCompanyInfo } from "@/lib/company-context";
import { AlertCircle, Upload } from "lucide-react";

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

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CAD", symbol: "$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "$", label: "Australian Dollar" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "MXN", symbol: "$", label: "Mexican Peso" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateCompanyInfo, companyInfo } = useCompanyInfo();

  // Required fields
  const [companyName, setCompanyName] = useState(
    companyInfo?.companyName || ""
  );
  const [description, setDescription] = useState(companyInfo?.description || "");
  const [numberOfWorkers, setNumberOfWorkers] = useState(
    companyInfo?.numberOfWorkers || ""
  );
  const [sector, setSector] = useState(companyInfo?.sector || "");
  const [companySize, setCompanySize] = useState(
    companyInfo?.companySize || ""
  );
  const [country, setCountry] = useState(companyInfo?.country || "");
  const [state, setState] = useState(companyInfo?.state || "");
  const [city, setCity] = useState(companyInfo?.city || "");
  const [websiteUrl, setWebsiteUrl] = useState(
    companyInfo?.websiteUrl || ""
  );

  // Optional fields
  const [showOptional, setShowOptional] = useState(false);
  const [email, setEmail] = useState(companyInfo?.email || "");
  const [phone, setPhone] = useState(companyInfo?.phone || "");
  const [fiscalYearEndDate, setFiscalYearEndDate] = useState(
    companyInfo?.fiscalYearEndDate || ""
  );
  const [currencyPreference, setCurrencyPreference] = useState(
    companyInfo?.currencyPreference || "USD"
  );
  const [language, setLanguage] = useState(companyInfo?.language || "English");
  const [numberOfEntities, setNumberOfEntities] = useState(
    companyInfo?.numberOfEntities || ""
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateRequired = () => {
    const newErrors: Record<string, string> = {};

    if (!companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!numberOfWorkers)
      newErrors.numberOfWorkers = "Number of workers is required";
    if (!sector) newErrors.sector = "Sector is required";
    if (!companySize) newErrors.companySize = "Company size is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!state.trim()) newErrors.state = "State/Province is required";
    if (!city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: "Logo must be less than 5MB",
        }));
        return;
      }
      setLogoFile(file);
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
        address,
        websiteUrl,
        ...(email && { email }),
        ...(phone && { phone }),
        ...(fiscalYearEndDate && { fiscalYearEndDate }),
        ...(currencyPreference && { currencyPreference }),
        ...(language && { language }),
        ...(numberOfEntities && { numberOfEntities: Number(numberOfEntities) }),
      });

      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div>
              <CardTitle className="text-2xl mb-2">
                Complete Your Company Profile
              </CardTitle>
              <p className="text-blue-100 text-sm">
                Set up your company information to personalize your Joseph
                experience
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Required Fields Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Required Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">
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
                      className={`mt-1 ${
                        errors.companyName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">
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
                      className={`mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      rows={3}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                        className={`mt-1 ${
                          errors.numberOfWorkers ? "border-red-500" : ""
                        }`}
                      />
                      {errors.numberOfWorkers && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.numberOfWorkers}
                        </p>
                      )}
                    </div>

                    <div>
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
                        className={`mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                          errors.sector ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select a sector</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.sector}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                        className={`mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                          errors.companySize ? "border-red-500" : ""
                        }`}
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
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.companySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address / Location
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.address;
                          return newErrors;
                        });
                      }}
                      placeholder="Enter your company address"
                      className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl" className="text-sm font-medium">
                      Website URL
                    </Label>
                    <div className={`mt-1 flex items-center rounded-md border border-input bg-background overflow-hidden ${
                      errors.websiteUrl ? "border-red-500" : ""
                    }`}>
                      <span className="px-3 py-2 text-sm font-medium text-muted-foreground bg-muted/30 border-r border-input whitespace-nowrap">
                        https://
                      </span>
                      <input
                        id="websiteUrl"
                        type="text"
                        value={websiteUrl.replace(/^https:\/\//, "")}
                        onChange={(e) => {
                          const domainValue = e.target.value.replace(/^https:\/\//, "");
                          setWebsiteUrl(`https://${domainValue}`);
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.websiteUrl;
                            return newErrors;
                          });
                        }}
                        placeholder="example.com"
                        className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.websiteUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Optional Fields Toggle */}
              <div className="border-t pt-6">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {showOptional ? "▼" : "▶"} Optional Information
                </button>

                {showOptional && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      These fields are optional and can be filled in later
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="currencyPreference"
                          className="text-sm font-medium"
                        >
                          Currency Preference (Optional)
                        </Label>
                        <select
                          id="currencyPreference"
                          value={currencyPreference}
                          onChange={(e) =>
                            setCurrencyPreference(e.target.value)
                          }
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {CURRENCIES.map((curr) => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.label}
                            </option>
                          ))}
                        </select>
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
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
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
                            {logoFile
                              ? logoFile.name
                              : "Choose logo (max 5MB)"}
                          </span>
                        </label>
                      </div>
                      {errors.logo && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.logo}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading
                    ? "Setting up your company..."
                    : "Complete Setup & Continue"}
                </Button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                You can update all of this information later in your company
                settings.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
