path = r"g:\. Digital Organization\Cursor\Rio\src\components\calculator\shell.tsx"
content = open(path, encoding="utf-8").read()
old = """export function CalculatorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="space-y-3">{children}</div>
    </div>
  );
}"""
new = """export function CalculatorShell({
  title,
  description,
  headerExtra,
  children,
}: {
  title: string;
  description: string;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        {headerExtra}
      </header>
      <div className="space-y-3">{children}</div>
    </div>
  );
}"""
if old not in content:
    raise SystemExit("shell pattern not found")
open(path, "w", encoding="utf-8").write(content.replace(old, new))
print("ok")
