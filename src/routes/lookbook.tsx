import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductCard, Shell, pageHead } from "@/site/Shell";
import { LookImage } from "@/site/Crop";
import { ITEMS, LOOKS } from "@/site/data";

export const Route = createFileRoute("/lookbook")({
  head: () => pageHead("Lookbook", "All six Spring Summer 2027 looks from Maison Vell, with the pieces that make each one."),
  component: Lookbook,
});

function Lookbook() {
  return (
    <Shell>
      <PageIntro eyebrow="Spring Summer 2027" title="Lookbook">Six looks, shown one by one with every piece you can shop.</PageIntro>
      <div className="space-y-px">
        {LOOKS.map((l, idx) => (
          <section key={l.no} className="grid items-center gap-8 bg-rail px-4 py-12 md:grid-cols-[1fr_1.4fr] md:px-12 odd:bg-background">
            <div className={`flex h-[70vh] justify-center ${idx % 2 ? "md:order-2" : ""}`}>
              <LookImage look={l} className="h-full" />
            </div>
            <div>
              <p className="wide text-4xl tracking-[.14em] md:text-6xl">Look {l.no}</p>
              <h2 className="wide mt-4 text-sm tracking-[.16em]">{l.name}</h2>
              <p className="mt-3 text-mid">{l.note}</p>
              <div className="mt-8 grid grid-cols-2 gap-px">
                {ITEMS.filter((i) => i.look === l.no).map((i) => <ProductCard key={i.id} item={i} />)}
              </div>
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}
