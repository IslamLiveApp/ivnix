"use client";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--site-canvas)] px-4 py-16 text-neutral-900">
      <div className="mx-auto max-w-lg w-full text-center">
        <h2 className="text-lg font-semibold">This page failed to load</h2>
        <p className="mt-2 text-sm text-neutral-600">{error.message}</p>
        <button
          type="button"
          className="mt-8 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
          onClick={() => reset()}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
