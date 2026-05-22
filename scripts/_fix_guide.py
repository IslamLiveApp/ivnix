path = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator\calculator-guide.tsx"

header = (
    '"use client";\n\n'
    'import * as React from "react";\n'
    'import { cn } from "@/lib/utils";\n\n'
    "type GuideStep = { heading: string; body: string };\n\n"
    "type CalculatorGuideProps = {\n"
    "  label?: string;\n"
    "  steps: GuideStep[];\n"
    "  example?: { heading: string; lines: string[] };\n"
    "  className?: string;\n"
    "};\n\n"
    "/** Toggleable guidance panel (blue link beside calculator description). */\n"
    "export function CalculatorGuide({\n"
    '  label = "Simple rule of thumb",\n'
    "  steps,\n"
    "  example,\n"
    "  className,\n"
    "}: CalculatorGuideProps) {\n"
    "  const [open, setOpen] = React.useState(false);\n"
    "  const rootRef = React.useRef<HTMLDivElement>(null);\n\n"
    "  React.useEffect(() => {\n"
    "    if (!open) return;\n"
    "    const onPointerDown = (e: PointerEvent) => {\n"
    "      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {\n"
    "        setOpen(false);\n"
    "      }\n"
    "    };\n"
    "    const onKeyDown = (e: KeyboardEvent) => {\n"
    '      if (e.key === "Escape") setOpen(false);\n'
    "    };\n"
    '    document.addEventListener("pointerdown", onPointerDown);\n'
    '    document.addEventListener("keydown", onKeyDown);\n'
    "    return () => {\n"
    '      document.removeEventListener("pointerdown", onPointerDown);\n'
    '      document.removeEventListener("keydown", onKeyDown);\n'
    "    };\n"
    "  }, [open]);\n\n"
    "  return (\n"
)

footer = (
    '    <div ref={rootRef} className={cn("w-full", className)}>\n'
    "      <button\n"
    '        type="button"\n'
    "        onClick={() => setOpen((v) => !v)}\n"
    '        className="text-sm font-medium text-[#0047FF] underline-offset-2 transition-colors hover:text-[#0036c7] hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF] focus-visible:outline-offset-2"\n'
    "        aria-expanded={open}\n"
    "      >\n"
    '        {open ? "Hide guide" : label}\n'
    "      </button>\n"
    "      {open ? (\n"
    "        <div\n"
    '          className="mt-3 space-y-3 rounded-lg border border-[#0047FF]/25 bg-[#0047FF]/[0.06] px-4 py-3.5 text-sm leading-relaxed text-neutral-800"\n'
    '          role="region"\n'
    "          aria-label={label}\n"
    "        >\n"
    '          <ol className="list-decimal space-y-2.5 pl-4">\n'
    "            {steps.map((step) => (\n"
    "              <li key={step.heading}>\n"
    '                <span className="font-medium text-neutral-900">{step.heading}</span>\n'
    '                <p className="mt-0.5 text-neutral-700">{step.body}</p>\n'
    "              </li>\n"
    "            ))}\n"
    "          </ol>\n"
    "          {example ? (\n"
    '            <div className="rounded-md border border-[#0047FF]/15 bg-white/80 px-3 py-2.5">\n'
    '              <p className="font-medium text-neutral-900">{example.heading}</p>\n'
    '              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-neutral-700">\n'
    "                {example.lines.map((line) => (\n"
    "                  <li key={line}>{line}</li>\n"
    "                ))}\n"
    "              </ul>\n"
    "            </div>\n"
    "          ) : null}\n"
    "        </div>\n"
    "      ) : null}\n"
    "    </div>\n"
    "  );\n"
    "}\n"
)

open(path, "w", encoding="utf-8").write(header + footer)
print("ok")
