/**
 * Currency utility functions for formatting and displaying monetary values
 * These work in conjunction with the CurrencyContext
 */

/**
 * Conversion rates (relative to USD)
 * In a real app, these would be fetched from an API
 * These are approximate rates for demonstration
 */
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.89,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.05,
  BRL: 4.97,
  ZAR: 18.64,
  SGD: 1.34,
  HKD: 7.78,
  KRW: 1319.5,
  THB: 35.29,
  IDR: 15950,
  PHP: 56.25,
  MYR: 4.73,
  PKR: 278.5,
  BDT: 109.45,
  VND: 24500,
  TWD: 31.85,
  TRY: 32.5,
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  QAR: 3.64,
  OMR: 0.38,
  BHD: 0.38,
  JOD: 0.71,
  EGP: 48.5,
  NGN: 1235,
  GHS: 13.2,
  KES: 157.5,
  UGX: 3895,
  SEK: 10.85,
  NOK: 10.65,
  DKK: 6.87,
  PLN: 4.05,
  CZK: 24.15,
  HUF: 393.5,
  RON: 4.97,
  BGN: 1.96,
  HRK: 6.97,
  RUB: 98.5,
  ARS: 841,
  CLP: 945,
  COP: 4185,
  PEN: 3.75,
  UYU: 39.5,
  NZD: 1.67,
  FJD: 2.28,
};

/**
 * Convert amount from one currency to another
 * @param amount Amount in source currency
 * @param fromCurrency Source currency code
 * @param toCurrency Target currency code
 * @returns Converted amount
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
  const toRate = EXCHANGE_RATES[toCurrency] || 1;
  return (amount / fromRate) * toRate;
}

/**
 * Get currency symbol by code
 * @param currencyCode Currency code (e.g., 'USD', 'EUR')
 * @returns Currency symbol
 */
export function getCurrencySymbol(currencyCode: string): string {
  const symbolMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "$",
    AUD: "$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹",
    MXN: "$",
    BRL: "R$",
    ZAR: "R",
    SGD: "$",
    HKD: "$",
    KRW: "₩",
    THB: "฿",
    IDR: "Rp",
    PHP: "₱",
    MYR: "RM",
    PKR: "₨",
    BDT: "৳",
    VND: "₫",
    TWD: "$",
    TRY: "₺",
    AED: "د.إ",
    SAR: "﷼",
    KWD: "د.ك",
    QAR: "﷼",
    OMR: "﷼",
    BHD: ".د.ب",
    JOD: "د.ا",
    EGP: "£",
    NGN: "₦",
    GHS: "₵",
    KES: "KSh",
    UGX: "USh",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    CZK: "Kč",
    HUF: "Ft",
    RON: "lei",
    BGN: "лв",
    HRK: "kn",
    RUB: "₽",
    ARS: "$",
    CLP: "$",
    COP: "$",
    PEN: "S/",
    UYU: "$",
    NZD: "$",
    FJD: "$",
  };
  return symbolMap[currencyCode] || currencyCode;
}

/**
 * Format a number as currency
 * @param amount Amount to format
 * @param currencyCode Currency code
 * @param options Intl.NumberFormat options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  } catch (error) {
    // Fallback for unsupported currencies
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Format a large number with K, M, B suffixes (e.g., 1.5M)
 * @param amount Amount to format
 * @param currencyCode Currency code
 * @returns Formatted string with symbol and suffix
 */
export function formatCompactCurrency(
  amount: number,
  currencyCode: string = "USD"
): string {
  const symbol = getCurrencySymbol(currencyCode);
  const absAmount = Math.abs(amount);

  if (absAmount >= 1e9) {
    return `${symbol}${(amount / 1e9).toFixed(2)}B`;
  }
  if (absAmount >= 1e6) {
    return `${symbol}${(amount / 1e6).toFixed(2)}M`;
  }
  if (absAmount >= 1e3) {
    return `${symbol}${(amount / 1e3).toFixed(2)}K`;
  }
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Parse a currency string to extract the numeric value
 * @param currencyString Currency string (e.g., '$1,234.56')
 * @returns Numeric value
 */
export function parseCurrency(currencyString: string): number {
  const numericString = currencyString.replace(/[^\d.-]/g, "");
  return parseFloat(numericString) || 0;
}
