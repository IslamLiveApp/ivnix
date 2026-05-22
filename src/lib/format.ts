/** Reasonable default locale per ISO 4217 code for Intl formatting */
export function localeForCurrency(currency: string): string {
  switch (currency) {
    case "USD":
      return "en-US";
    case "GBP":
      return "en-GB";
    case "CHF":
      return "de-CH";
    case "JPY":
      return "ja-JP";
    default:
      return "nl-BE";
  }
}

export function formatCurrency(
  n: number,
  locale?: string,
  currency: string = "EUR",
) {
  const loc = locale ?? localeForCurrency(currency);
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPercent(n: number, digits = 1) {
  return `${n.toFixed(digits)}%`;
}

export function formatNumber(n: number, locale = "nl-BE") {
  return Math.round(n).toLocaleString(locale);
}

export function parseNumber(value: string): number {
  const v = parseFloat(value.replace(",", "."));
  return Number.isFinite(v) ? v : 0;
}
