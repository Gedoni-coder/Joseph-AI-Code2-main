// Currency configurations
export const CURRENCY_SYMBOLS: Record<
  string,
  { symbol: string; code: string; name: string; position: "before" | "after" }
> = {
  USD: { symbol: "$", code: "USD", name: "US Dollar", position: "before" },
  EUR: { symbol: "€", code: "EUR", name: "Euro", position: "after" },
  AED: { symbol: "د.إ", code: "AED", name: "UAE Dirham", position: "after" },
  AFN: { symbol: "؋", code: "AFN", name: "Afghan Afghani", position: "after" },
  ALL: { symbol: "L", code: "ALL", name: "Albanian Lek", position: "after" },
  AMD: { symbol: "֏", code: "AMD", name: "Armenian Dram", position: "after" },
  ANG: {
    symbol: "ƒ",
    code: "ANG",
    name: "Netherlands Antillean Guilder",
    position: "before",
  },
  AOA: {
    symbol: "Kz",
    code: "AOA",
    name: "Angolan Kwanza",
    position: "before",
  },
  ARS: { symbol: "$", code: "ARS", name: "Argentine Peso", position: "before" },
  AUD: {
    symbol: "$",
    code: "AUD",
    name: "Australian Dollar",
    position: "before",
  },
  AWG: { symbol: "ƒ", code: "AWG", name: "Aruban Florin", position: "before" },
  AZN: {
    symbol: "₼",
    code: "AZN",
    name: "Azerbaijani Manat",
    position: "after",
  },
  BAM: {
    symbol: "KM",
    code: "BAM",
    name: "Bosnia-Herzegovina Mark",
    position: "after",
  },
  BBD: {
    symbol: "$",
    code: "BBD",
    name: "Barbadian Dollar",
    position: "before",
  },
  BDT: {
    symbol: "৳",
    code: "BDT",
    name: "Bangladeshi Taka",
    position: "before",
  },
  BGN: { symbol: "лв", code: "BGN", name: "Bulgarian Lev", position: "after" },
  BHD: {
    symbol: ".د.ب",
    code: "BHD",
    name: "Bahraini Dinar",
    position: "after",
  },
  BIF: {
    symbol: "Fr",
    code: "BIF",
    name: "Burundian Franc",
    position: "after",
  },
  BMD: {
    symbol: "$",
    code: "BMD",
    name: "Bermudian Dollar",
    position: "before",
  },
  BND: { symbol: "$", code: "BND", name: "Brunei Dollar", position: "before" },
  BOB: {
    symbol: "Bs.",
    code: "BOB",
    name: "Bolivian Boliviano",
    position: "before",
  },
  BRL: {
    symbol: "R$",
    code: "BRL",
    name: "Brazilian Real",
    position: "before",
  },
  BSD: {
    symbol: "$",
    code: "BSD",
    name: "Bahamian Dollar",
    position: "before",
  },
  BTN: {
    symbol: "Nu.",
    code: "BTN",
    name: "Bhutanese Ngultrum",
    position: "before",
  },
  BWP: { symbol: "P", code: "BWP", name: "Botswana Pula", position: "before" },
  BYN: {
    symbol: "Br",
    code: "BYN",
    name: "Belarusian Ruble",
    position: "after",
  },
  BZD: { symbol: "$", code: "BZD", name: "Belize Dollar", position: "before" },
  CAD: {
    symbol: "$",
    code: "CAD",
    name: "Canadian Dollar",
    position: "before",
  },
  CDF: {
    symbol: "Fr",
    code: "CDF",
    name: "Congolese Franc",
    position: "after",
  },
  CHF: { symbol: "CHF", code: "CHF", name: "Swiss Franc", position: "before" },
  CLP: { symbol: "$", code: "CLP", name: "Chilean Peso", position: "before" },
  CNY: { symbol: "¥", code: "CNY", name: "Chinese Yuan", position: "before" },
  COP: { symbol: "$", code: "COP", name: "Colombian Peso", position: "before" },
  CRC: {
    symbol: "₡",
    code: "CRC",
    name: "Costa Rican Colon",
    position: "before",
  },
  CUC: {
    symbol: "$",
    code: "CUC",
    name: "Cuban Convertible Peso",
    position: "before",
  },
  CUP: { symbol: "₱", code: "CUP", name: "Cuban Peso", position: "before" },
  CVE: {
    symbol: "$",
    code: "CVE",
    name: "Cape Verdean Escudo",
    position: "before",
  },
  CZK: { symbol: "Kč", code: "CZK", name: "Czech Koruna", position: "after" },
  DJF: {
    symbol: "Fr",
    code: "DJF",
    name: "Djiboutian Franc",
    position: "after",
  },
  DKK: { symbol: "kr", code: "DKK", name: "Danish Krone", position: "after" },
  DOP: {
    symbol: "RD$",
    code: "DOP",
    name: "Dominican Peso",
    position: "before",
  },
  DZD: {
    symbol: "د.ج",
    code: "DZD",
    name: "Algerian Dinar",
    position: "after",
  },
  EGP: { symbol: "£", code: "EGP", name: "Egyptian Pound", position: "after" },
  ERN: {
    symbol: "Nfk",
    code: "ERN",
    name: "Eritrean Nakfa",
    position: "after",
  },
  ETB: { symbol: "Br", code: "ETB", name: "Ethiopian Birr", position: "after" },
  FJD: { symbol: "$", code: "FJD", name: "Fiji Dollar", position: "before" },
  FKP: {
    symbol: "£",
    code: "FKP",
    name: "Falkland Islands Pound",
    position: "before",
  },
  GBP: { symbol: "£", code: "GBP", name: "British Pound", position: "before" },
  GEL: { symbol: "₾", code: "GEL", name: "Georgian Lari", position: "after" },
  GHS: { symbol: "₵", code: "GHS", name: "Ghanaian Cedi", position: "before" },
  GIP: {
    symbol: "£",
    code: "GIP",
    name: "Gibraltar Pound",
    position: "before",
  },
  GMD: { symbol: "D", code: "GMD", name: "Gambian Dalasi", position: "after" },
  GNF: { symbol: "Fr", code: "GNF", name: "Guinean Franc", position: "after" },
  GTQ: {
    symbol: "Q",
    code: "GTQ",
    name: "Guatemalan Quetzal",
    position: "before",
  },
  GYD: {
    symbol: "$",
    code: "GYD",
    name: "Guyanese Dollar",
    position: "before",
  },
  HKD: {
    symbol: "$",
    code: "HKD",
    name: "Hong Kong Dollar",
    position: "before",
  },
  HNL: {
    symbol: "L",
    code: "HNL",
    name: "Honduran Lempira",
    position: "before",
  },
  HRK: { symbol: "kn", code: "HRK", name: "Croatian Kuna", position: "after" },
  HTG: { symbol: "G", code: "HTG", name: "Haitian Gourde", position: "before" },
  HUF: {
    symbol: "Ft",
    code: "HUF",
    name: "Hungarian Forint",
    position: "after",
  },
  IDR: {
    symbol: "Rp",
    code: "IDR",
    name: "Indonesian Rupiah",
    position: "before",
  },
  ILS: { symbol: "₪", code: "ILS", name: "Israeli Shekel", position: "before" },
  INR: { symbol: "₹", code: "INR", name: "Indian Rupee", position: "before" },
  IQD: { symbol: "ع.د", code: "IQD", name: "Iraqi Dinar", position: "after" },
  IRR: { symbol: "﷼", code: "IRR", name: "Iranian Rial", position: "after" },
  ISK: {
    symbol: "kr",
    code: "ISK",
    name: "Icelandic Króna",
    position: "after",
  },
  JMD: {
    symbol: "J$",
    code: "JMD",
    name: "Jamaican Dollar",
    position: "before",
  },
  JOD: {
    symbol: "د.ا",
    code: "JOD",
    name: "Jordanian Dinar",
    position: "after",
  },
  JPY: { symbol: "¥", code: "JPY", name: "Japanese Yen", position: "before" },
  KES: {
    symbol: "Sh",
    code: "KES",
    name: "Kenyan Shilling",
    position: "before",
  },
  KGS: { symbol: "с", code: "KGS", name: "Kyrgyzstani Som", position: "after" },
  KHR: { symbol: "៛", code: "KHR", name: "Cambodian Riel", position: "before" },
  KMF: { symbol: "Fr", code: "KMF", name: "Comorian Franc", position: "after" },
  KPW: {
    symbol: "₩",
    code: "KPW",
    name: "North Korean Won",
    position: "before",
  },
  KRW: {
    symbol: "₩",
    code: "KRW",
    name: "South Korean Won",
    position: "before",
  },
  KWD: { symbol: "د.ك", code: "KWD", name: "Kuwaiti Dinar", position: "after" },
  KYD: {
    symbol: "$",
    code: "KYD",
    name: "Cayman Islands Dollar",
    position: "before",
  },
  KZT: {
    symbol: "₸",
    code: "KZT",
    name: "Kazakhstani Tenge",
    position: "after",
  },
  LAK: { symbol: "₭", code: "LAK", name: "Laotian Kip", position: "before" },
  LBP: { symbol: "£", code: "LBP", name: "Lebanese Pound", position: "before" },
  LKR: {
    symbol: "Rs",
    code: "LKR",
    name: "Sri Lankan Rupee",
    position: "before",
  },
  LRD: {
    symbol: "$",
    code: "LRD",
    name: "Liberian Dollar",
    position: "before",
  },
  LSL: { symbol: "L", code: "LSL", name: "Lesotho Loti", position: "before" },
  LYD: { symbol: "ل.د", code: "LYD", name: "Libyan Dinar", position: "after" },
  MAD: {
    symbol: "د.م.",
    code: "MAD",
    name: "Moroccan Dirham",
    position: "after",
  },
  MDL: { symbol: "L", code: "MDL", name: "Moldovan Leu", position: "after" },
  MGA: {
    symbol: "Ar",
    code: "MGA",
    name: "Malagasy Ariary",
    position: "before",
  },
  MKD: {
    symbol: "ден",
    code: "MKD",
    name: "Macedonian Denar",
    position: "after",
  },
  MMK: { symbol: "Ks", code: "MMK", name: "Myanmar Kyat", position: "before" },
  MNT: {
    symbol: "₮",
    code: "MNT",
    name: "Mongolian Tugrik",
    position: "before",
  },
  MOP: {
    symbol: "P",
    code: "MOP",
    name: "Macanese Pataca",
    position: "before",
  },
  MRU: {
    symbol: "UM",
    code: "MRU",
    name: "Mauritanian Ouguiya",
    position: "before",
  },
  MUR: {
    symbol: "₨",
    code: "MUR",
    name: "Mauritian Rupee",
    position: "before",
  },
  MVR: {
    symbol: "Rf",
    code: "MVR",
    name: "Maldivian Rufiyaa",
    position: "before",
  },
  MWK: {
    symbol: "MK",
    code: "MWK",
    name: "Malawian Kwacha",
    position: "before",
  },
  MXN: { symbol: "$", code: "MXN", name: "Mexican Peso", position: "before" },
  MYR: {
    symbol: "RM",
    code: "MYR",
    name: "Malaysian Ringgit",
    position: "before",
  },
  MZN: {
    symbol: "MT",
    code: "MZN",
    name: "Mozambican Metical",
    position: "before",
  },
  NAD: {
    symbol: "$",
    code: "NAD",
    name: "Namibian Dollar",
    position: "before",
  },
  NGN: { symbol: "₦", code: "NGN", name: "Nigerian Naira", position: "before" },
  NIO: {
    symbol: "C$",
    code: "NIO",
    name: "Nicaraguan Córdoba",
    position: "before",
  },
  NOK: {
    symbol: "kr",
    code: "NOK",
    name: "Norwegian Krone",
    position: "after",
  },
  NPR: { symbol: "₨", code: "NPR", name: "Nepalese Rupee", position: "before" },
  NZD: {
    symbol: "$",
    code: "NZD",
    name: "New Zealand Dollar",
    position: "before",
  },
  OMR: { symbol: "ر.ع.", code: "OMR", name: "Omani Rial", position: "after" },
  PAB: {
    symbol: "B/.",
    code: "PAB",
    name: "Panamanian Balboa",
    position: "before",
  },
  PEN: { symbol: "S/", code: "PEN", name: "Peruvian Sol", position: "before" },
  PGK: {
    symbol: "K",
    code: "PGK",
    name: "Papua New Guinean Kina",
    position: "before",
  },
  PHP: {
    symbol: "₱",
    code: "PHP",
    name: "Philippine Peso",
    position: "before",
  },
  PKR: {
    symbol: "₨",
    code: "PKR",
    name: "Pakistani Rupee",
    position: "before",
  },
  PLN: { symbol: "zł", code: "PLN", name: "Polish Zloty", position: "after" },
  PYG: {
    symbol: "₲",
    code: "PYG",
    name: "Paraguayan Guarani",
    position: "before",
  },
  QAR: { symbol: "ر.ق", code: "QAR", name: "Qatari Riyal", position: "after" },
  RON: { symbol: "lei", code: "RON", name: "Romanian Leu", position: "after" },
  RSD: {
    symbol: "Дин.",
    code: "RSD",
    name: "Serbian Dinar",
    position: "after",
  },
  RUB: { symbol: "₽", code: "RUB", name: "Russian Ruble", position: "after" },
  RWF: { symbol: "Fr", code: "RWF", name: "Rwandan Franc", position: "after" },
  SAR: { symbol: "ر.س", code: "SAR", name: "Saudi Riyal", position: "after" },
  SBD: {
    symbol: "$",
    code: "SBD",
    name: "Solomon Islands Dollar",
    position: "before",
  },
  SCR: {
    symbol: "₨",
    code: "SCR",
    name: "Seychellois Rupee",
    position: "before",
  },
  SDG: { symbol: "£", code: "SDG", name: "Sudanese Pound", position: "after" },
  SEK: { symbol: "kr", code: "SEK", name: "Swedish Krona", position: "after" },
  SGD: {
    symbol: "$",
    code: "SGD",
    name: "Singapore Dollar",
    position: "before",
  },
  SHP: {
    symbol: "£",
    code: "SHP",
    name: "Saint Helena Pound",
    position: "before",
  },
  SLE: {
    symbol: "Le",
    code: "SLE",
    name: "Sierra Leonean Leone",
    position: "before",
  },
  SLL: {
    symbol: "Le",
    code: "SLL",
    name: "Sierra Leonean Leone (old)",
    position: "before",
  },
  SOS: {
    symbol: "Sh",
    code: "SOS",
    name: "Somali Shilling",
    position: "before",
  },
  SRD: {
    symbol: "$",
    code: "SRD",
    name: "Surinamese Dollar",
    position: "before",
  },
  SSP: {
    symbol: "£",
    code: "SSP",
    name: "South Sudanese Pound",
    position: "before",
  },
  STN: {
    symbol: "Db",
    code: "STN",
    name: "São Tomé & Príncipe Dobra",
    position: "before",
  },
  SYP: { symbol: "£", code: "SYP", name: "Syrian Pound", position: "before" },
  SZL: {
    symbol: "L",
    code: "SZL",
    name: "Eswatini Lilangeni",
    position: "before",
  },
  THB: { symbol: "฿", code: "THB", name: "Thai Baht", position: "before" },
  TJS: {
    symbol: "ЅМ",
    code: "TJS",
    name: "Tajikistani Somoni",
    position: "after",
  },
  TMT: {
    symbol: "m",
    code: "TMT",
    name: "Turkmenistani Manat",
    position: "after",
  },
  TND: {
    symbol: "د.ت",
    code: "TND",
    name: "Tunisian Dinar",
    position: "after",
  },
  TOP: {
    symbol: "T$",
    code: "TOP",
    name: "Tongan Paʻanga",
    position: "before",
  },
  TRY: { symbol: "₺", code: "TRY", name: "Turkish Lira", position: "after" },
  TTD: {
    symbol: "$",
    code: "TTD",
    name: "Trinidad & Tobago Dollar",
    position: "before",
  },
  TWD: { symbol: "$", code: "TWD", name: "Taiwan Dollar", position: "before" },
  TZS: {
    symbol: "Sh",
    code: "TZS",
    name: "Tanzanian Shilling",
    position: "before",
  },
  UAH: {
    symbol: "₴",
    code: "UAH",
    name: "Ukrainian Hryvnia",
    position: "after",
  },
  UGX: {
    symbol: "Sh",
    code: "UGX",
    name: "Ugandan Shilling",
    position: "before",
  },
  UYU: { symbol: "$", code: "UYU", name: "Uruguayan Peso", position: "before" },
  UZS: {
    symbol: "so'm",
    code: "UZS",
    name: "Uzbekistani Som",
    position: "after",
  },
  VES: {
    symbol: "Bs.",
    code: "VES",
    name: "Venezuelan Bolívar",
    position: "before",
  },
  VND: {
    symbol: "₫",
    code: "VND",
    name: "Vietnamese Dong",
    position: "before",
  },
  VUV: { symbol: "Vt", code: "VUV", name: "Vanuatu Vatu", position: "before" },
  WST: { symbol: "T", code: "WST", name: "Samoan Tala", position: "before" },
  XAF: {
    symbol: "Fr",
    code: "XAF",
    name: "Central African CFA Franc",
    position: "after",
  },
  XCD: {
    symbol: "$",
    code: "XCD",
    name: "East Caribbean Dollar",
    position: "before",
  },
  XOF: {
    symbol: "Fr",
    code: "XOF",
    name: "West African CFA Franc",
    position: "after",
  },
  XPF: { symbol: "Fr", code: "XPF", name: "CFP Franc", position: "after" },
  YER: { symbol: "﷼", code: "YER", name: "Yemeni Rial", position: "after" },
  ZAR: {
    symbol: "R",
    code: "ZAR",
    name: "South African Rand",
    position: "before",
  },
  ZMW: {
    symbol: "ZK",
    code: "ZMW",
    name: "Zambian Kwacha",
    position: "before",
  },
  ZWL: {
    symbol: "$",
    code: "ZWL",
    name: "Zimbabwean Dollar",
    position: "before",
  },
};

/**
 * Formats a number as currency based on the provided currency code
 * @param amount - The numeric amount to format
 * @param currencyCode - The currency code (e.g., "USD", "EUR", "INR")
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string,
  currencyCode: string = "USD",
  decimalPlaces: number = 2,
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "0";
  }

  const currency = CURRENCY_SYMBOLS[currencyCode] || CURRENCY_SYMBOLS["USD"];
  const formatted = numAmount.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  if (currency.position === "before") {
    return `${currency.symbol}${formatted}`;
  } else {
    return `${formatted} ${currency.symbol}`;
  }
}

/**
 * Gets currency symbol for a given currency code
 * @param currencyCode - The currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode]?.symbol || "$";
}

/**
 * Gets full currency info for a given code
 * @param currencyCode - The currency code
 * @returns Full currency info object
 */
export function getCurrencyInfo(
  currencyCode: string,
): (typeof CURRENCY_SYMBOLS)[string] | null {
  return CURRENCY_SYMBOLS[currencyCode] || null;
}

/**
 * Converts a value to K (thousands) format with currency
 * @param amount - The amount to convert
 * @param currencyCode - The currency code
 * @returns Formatted string like "$50K"
 */
export function formatCurrencyShort(
  amount: number,
  currencyCode: string = "USD",
): string {
  const currency = CURRENCY_SYMBOLS[currencyCode] || CURRENCY_SYMBOLS["USD"];
  let displayAmount: string;

  if (Math.abs(amount) >= 1000000) {
    displayAmount = (amount / 1000000).toFixed(1) + "M";
  } else if (Math.abs(amount) >= 1000) {
    displayAmount = (amount / 1000).toFixed(1) + "K";
  } else {
    displayAmount = amount.toFixed(0);
  }

  if (currency.position === "before") {
    return `${currency.symbol}${displayAmount}`;
  } else {
    return `${displayAmount} ${currency.symbol}`;
  }
}
