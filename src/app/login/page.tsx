import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24">
      <h1 className="text-2xl font-semibold text-neutral-900">Login</h1>
      <p className="mt-2 text-neutral-600">
        Authentication is not configured yet. Replace this page when accounts are ready.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-medium text-[#0047FF] hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
