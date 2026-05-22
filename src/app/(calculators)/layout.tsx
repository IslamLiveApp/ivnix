import { WorkspaceShell } from "@/components/layout/workspace-shell";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceShell>
      <main className="min-h-0 flex-1">
        {/* Same horizontal rhythm as before — calculator UI unchanged */}
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-xl">{children}</div>
        </div>
      </main>
    </WorkspaceShell>
  );
}
