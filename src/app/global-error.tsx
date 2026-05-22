"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--site-canvas)] px-4 py-16 text-neutral-900 antialiased">
        <div className="mx-auto max-w-md space-y-3 text-center">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
