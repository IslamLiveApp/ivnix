path = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator\shell.tsx"
content = open(path, encoding="utf-8").read()
old = """      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        {headerExtra}
      </header>"""
new = """      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          <p className="text-sm text-muted-foreground">{description}</p>
          {headerExtra}
        </div>
      </header>"""
if old not in content:
    raise SystemExit("pattern missing")
open(path, "w", encoding="utf-8").write(content.replace(old, new))

guide_path = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator\calculator-guide.tsx"
g = open(guide_path, encoding="utf-8").read()
g_old = '    <motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50"\n          >\n            {loading ? "Opening Stripe…" : "Continue"}\n          </button>'
# only patch if corruption exists
if "motion-reduce:transition-none disabled" in g:
    raise SystemExit("guide corrupted")

g = g.replace(
    '  className?: string;\n};',
    '  className?: string;\n  /** When true, link sits beside description; panel spans full width below. */\n  inline?: boolean;\n};',
)
g = g.replace(
    "  className,\n}: CalculatorGuideProps)",
    "  className,\n  inline = false,\n}: CalculatorGuideProps)",
)
g = g.replace(
    '    <div ref={rootRef} className={cn("w-full", className)}>\n      <button',
    '    <div ref={rootRef} className={cn(inline ? "contents" : "w-full", className)}>\n      <button',
)
g = g.replace(
    '      {open ? (\n        <div\n          className="mt-3 space-y-3 rounded-lg border',
    '      {open ? (\n        <div\n          className={cn(\n            "mt-3 space-y-3 rounded-lg border',
)
g = g.replace(
    '          aria-label={label}\n        >',
    '          aria-label={label}\n            inline && "w-full basis-full",\n          )}\n        >',
)
open(guide_path, "w", encoding="utf-8").write(g)
print("ok")
