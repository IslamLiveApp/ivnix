path = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator\spend-period-field.tsx"

lines = [
    '"use client";',
    "",
    'import { cn } from "@/lib/utils";',
    'import { NumberField } from "@/components/calculator/fields";',
    'import type { CurrencySelectorConfig } from "@/components/calculator/fields";',
    "import {",
    "  SPEND_PERIOD_ADJECTIVE,",
    "  type SpendPeriod,",
    '} from "@/lib/spend-period";',
    "",
    'const PERIODS: SpendPeriod[] = ["day", "month", "year"];',
    "",
    "export function SpendPeriodField({",
    "  period,",
    "  onPeriodChange,",
    "  spendId,",
    "  spendLabel,",
    "  spendHint,",
    "  spendValue,",
    "  onSpendChange,",
    "  currencySelector,",
    "}: {",
    "  period: SpendPeriod;",
    "  onPeriodChange: (p: SpendPeriod) => void;",
    "  spendId: string;",
    "  spendLabel: string;",
    "  spendHint: string;",
    "  spendValue: string;",
    "  onSpendChange: (v: string) => void;",
    "  currencySelector?: CurrencySelectorConfig;",
    "}) {",
    "  return (",
    '    <div className="space-y-2">',
    '      <motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"',
    '          >',
    '            {loading ? "Opening Stripe…" : "Continue"}',
    "          </button>",
    '          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">',
    "            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.",
    "          </p>",
    "        </div>",
    "      <NumberField",
    "        id={spendId}",
    "        label={spendLabel}",
    "        hint={spendHint}",
    "        value={spendValue}",
    "        onChange={onSpendChange}",
    "        currencySelector={currencySelector}",
    "      />",
    "    </div>",
    "  );",
    "}",
]

# fix lines 37-44
fixed = []
i = 0
while i < len(lines):
    if lines[i] == '    <div className="space-y-2">':
        fixed.append(lines[i])
        fixed.extend(
            [
                '      <div className="flex flex-wrap items-center gap-2">',
                '        <span className="text-xs font-medium text-muted-foreground">',
                "          Budget period",
                "        </span>",
                '        <div',
                '          className="inline-flex rounded-md border border-input bg-secondary/40 p-0.5"',
                '          role="group"',
                '          aria-label="Budget period"',
                "        >",
                "          {PERIODS.map((p) => (",
                "            <button",
                "              key={p}",
                '              type="button"',
                "              onClick={() => onPeriodChange(p)}",
                "              className={cn(",
                '                "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",',
                "                period === p",
                '                  ? "bg-background text-foreground shadow-sm"',
                '                  : "text-muted-foreground hover:text-foreground",',
                "              )}",
                "              aria-pressed={period === p}",
                "            >",
                "              {SPEND_PERIOD_ADJECTIVE[p]}",
                "            </button>",
                "          ))}",
                "        </div>",
                "      </div>",
            ]
        )
        i += 1
        while i < len(lines) and lines[i] != "      <NumberField":
            i += 1
        continue
    fixed.append(lines[i])
    i += 1

open(path, "w", encoding="utf-8").write("\n".join(fixed) + "\n")
print("ok")
