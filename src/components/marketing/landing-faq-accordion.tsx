import { ChevronDown } from "lucide-react";

export type LandingFaqAccordionItem = {
  question: string;
  answer: string;
};

/**
 * Apple-style FAQ using native `<details>` — reliable open/close without React state.
 * Shared `name` → exclusive accordion in supporting browsers (Chrome 120+, Safari 17.2+).
 */
export function LandingFaqAccordion({ items }: { items: readonly LandingFaqAccordionItem[] }) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center font-semibold tracking-tight text-neutral-900 text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.08]">
        FAQ
      </h2>

      <div className="mt-14 border-t border-neutral-200 md:mt-16">
        {items.map((item, index) => (
          <details
            key={item.question}
            name="landing-faq"
            className="landing-faq-item border-b border-neutral-200"
            {...(index === 0 ? { open: true } : {})}
          >
            <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 py-5 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:py-6">
              <span className="text-2xl font-semibold leading-snug text-neutral-900">{item.question}</span>
              <ChevronDown
                className="landing-faq-chevron mt-1 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 motion-reduce:transition-none"
                aria-hidden
                strokeWidth={2}
              />
            </summary>
            <div className="pb-6 md:pb-8">
              <p className="max-w-none text-[17px] font-normal leading-[1.47] text-neutral-700">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
