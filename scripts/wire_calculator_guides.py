"""Add getCalculatorGuide import and guide prop to calculator components."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1] / "src" / "components" / "calculators"

MAP = {
    "roi.tsx": "investing/roi",
    "roas.tsx": "paid-growth/roas",
    "email-campaign.tsx": "paid-growth/email-campaign",
    "seo-roi.tsx": "organic-growth/seo-roi",
    "product-profit.tsx": "ecommerce/product-profit",
    "contribution-margin.tsx": "ecommerce/contribution-margin",
    "discount-impact.tsx": "ecommerce/discount-impact",
    "bundle-uplift.tsx": "ecommerce/bundle-uplift",
    "break-even.tsx": "startup/break-even",
    "saas-mrr.tsx": "saas/mrr",
    "cac.tsx": "saas/cac",
    "ltv-cac.tsx": "saas/ltv-cac",
    "nrr.tsx": "saas/nrr",
    "rule-of-40.tsx": "saas/rule-of-40",
    "affiliate-revenue.tsx": "influencers/affiliate-revenue",
    "sales-conversion.tsx": "sales/lead-to-revenue",
    "consulting-rate.tsx": "sales/consulting-rate",
    "sdr-pipeline.tsx": "sales/sdr-pipeline",
}

IMPORT_LINE = 'import { getCalculatorGuide } from "@/lib/calculator-guides";\n'
def guide_prop(key: str) -> str:
    return f'guide={{getCalculatorGuide("{key}")}}'

SKIP = {
    "paid-ads.tsx",
    "influencer-pricing.tsx",
    "marketplace-fees.tsx",
    "processor-compare.tsx",
}


def wire_file(path: Path, key: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "getCalculatorGuide" in text:
        return False
    if IMPORT_LINE.strip() not in text:
        # insert after last import from @/lib
        m = list(re.finditer(r'^import .+;\n', text, re.M))
        if not m:
            return False
        insert_at = m[-1].end()
        text = text[:insert_at] + IMPORT_LINE + text[insert_at:]
    prop = guide_prop(key)
    if prop in text:
        return False
    # add guide prop after description= line in CalculatorShell
    text, n = re.subn(
        r'(description="[^"]*"\n)(\s*>)',
        rf'\1      {prop}\n\2',
        text,
        count=1,
    )
    if n == 0:
        return False
    path.write_text(text, encoding="utf-8")
    return True


def main():
    changed = []
    for name, key in MAP.items():
        if name in SKIP:
            continue
        p = ROOT / name
        if p.exists() and wire_file(p, key):
            changed.append(name)
    print("Updated:", ", ".join(changed) or "(none)")


if __name__ == "__main__":
    main()
