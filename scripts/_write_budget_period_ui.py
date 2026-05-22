import os

base = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator"

controls = r'''"use client";

import { cn } from "@/lib/utils";
import type { SpendPeriod } from "@/lib/spend-period";
import { SPEND_PERIOD_ADJECTIVE } from "@/lib/spend-period";

const PERIODS: SpendPeriod[] = ["day", "month", "year"];

export function BudgetPeriodControls({
  period,
  onPeriodChange,
  label = "Budget period",
}: {
  period: SpendPeriod;
  onPeriodChange: (p: SpendPeriod) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Opening Stripe…" : "Continue"}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.
          </p>
        </div>
  );
}
'''

controls = controls.replace(
    '''      <motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Opening Stripe…" : "Continue"}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.
          </p>
        </div>''',
    '''      <div
        className="inline-flex rounded-md border border-input bg-secondary/40 p-0.5"
        role="group"
        aria-label={label}
      >
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPeriodChange(p)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",
              period === p
                ? "font-semibold text-[#0047FF]"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={period === p}
          >
            {SPEND_PERIOD_ADJECTIVE[p]}
          </button>
        ))}
      </div>
    </motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Opening Stripe…" : "Continue"}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.
          </p>
        </div>''',
).replace(
    '''    </motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Opening Stripe…" : "Continue"}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.
          </p>
        </div>''',
    "    </div>",
)

note = r'''"use client";

export function PeriodScaleNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-xs leading-snug text-[#0047FF]">{message}</p>
  );
}
'''

equiv = r'''"use client";

import { formatCurrency } from "@/lib/format";
import { normalizeSpend, type SpendPeriod } from "@/lib/spend-period";

export function PeriodBudgetEquivalents({
  amount,
  period,
  currency = "EUR",
  label = "Budget equivalents",
}: {
  amount: number;
  period: SpendPeriod;
  currency?: string;
  label?: string;
}) {
  if (amount <= 0) return null;
  const norm = normalizeSpend(amount, period);
  const periodWord = period === "day" ? "daily" : period === "year" ? "yearly" : "monthly";
  return (
    <p className="text-xs text-muted-foreground">
      {label}: {formatCurrency(norm.perDay, undefined, currency)}/day ·{" "}
      {formatCurrency(norm.perMonth, undefined, currency)}/month ·{" "}
      {formatCurrency(norm.perYear, undefined, currency)}/year
      <span className="text-muted-foreground/80"> (from your {periodWord} inputs)</span>
    </p>
  );
}
'''

open(os.path.join(base, "budget-period-controls.tsx"), "w", encoding="utf-8").write(controls)
open(os.path.join(base, "period-scale-note.tsx"), "w", encoding="utf-8").write(note)
open(os.path.join(base, "period-budget-equivalents.tsx"), "w", encoding="utf-8").write(equiv)
print("ok")
