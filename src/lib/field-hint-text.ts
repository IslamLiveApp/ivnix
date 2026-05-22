import { SPEND_PERIOD_LABEL, type SpendPeriod } from "@/lib/spend-period";

/** Shared period note for field hints. */
export function periodNote(period: SpendPeriod): string {
  return `Use numbers for the same ${SPEND_PERIOD_LABEL[period]} as selected above (totals scale when you switch period).`;
}

/** Build multi-line hint copy for input FieldHint tooltips. */
export function buildFieldHint(parts: {
  what: string;
  where?: string;
  formula?: string;
  periodNote?: string;
}): string {
  const lines = [`What to enter: ${parts.what}`];
  if (parts.periodNote) lines.push(parts.periodNote);
  if (parts.where) lines.push(`Where to find: ${parts.where}`);
  if (parts.formula) lines.push(`Formula: ${parts.formula}`);
  return lines.join("\n\n");
}

/** Build multi-line hint copy for calculated result rows. */
export function buildResultHint(parts: {
  meaning: string;
  formula?: string;
}): string {
  const lines = [`What this means: ${parts.meaning}`];
  if (parts.formula) lines.push(`Formula: ${parts.formula}`);
  return lines.join("\n\n");
}

/** Turn legacy one-line hints into structured input tooltip copy when possible. */
export function formatHintForDisplay(hint: string): string {
  if (!hint || hint.includes("\n\n") || hint.startsWith("What to enter:")) {
    return hint;
  }

  const formulaIdx = hint.search(/\bFormula:/i);
  const usedIdx = hint.search(/\bUsed in:/i);
  const splitIdx = formulaIdx >= 0 ? formulaIdx : usedIdx;

  if (splitIdx < 0) {
    return buildFieldHint({ what: hint });
  }

  const what = hint.slice(0, splitIdx).trim().replace(/\.\s*$/, "");
  const formula = hint
    .slice(splitIdx + (formulaIdx >= 0 ? "Formula:".length : "Used in:".length))
    .trim();

  return buildFieldHint({
    what: what || "Use the fields above.",
    formula,
  });
}

const PERIOD_NOTE_RE =
  /^Use numbers for the same (day|month|year) as selected above.*$/;

/** Format hints on calculated result rows (never "What to enter"). */
export function formatResultHintForDisplay(hint: string): string {
  if (!hint) return hint;
  if (hint.startsWith("What this means:")) return hint;

  if (hint.startsWith("What to enter:")) {
    return hint
      .replace(/^What to enter:/, "What this means:")
      .split("\n\n")
      .filter(
        (line) =>
          !line.startsWith("Where to find:") && !PERIOD_NOTE_RE.test(line),
      )
      .join("\n\n");
  }

  const formulaIdx = hint.search(/\bFormula:/i);
  if (formulaIdx >= 0) {
    const formula = hint.slice(formulaIdx + "Formula:".length).trim();
    const meaning = hint.slice(0, formulaIdx).trim().replace(/\.\s*$/, "");
    return buildResultHint({
      meaning: meaning || "Calculated from your inputs above.",
      formula,
    });
  }

  return buildResultHint({ meaning: hint });
}
