import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, ProductGrid, Shell, pageHead } from "@/site/Shell";
import { ITEMS } from "@/site/data";

export const Route = createFileRoute("/shop")({
  head: () => pageHead("Shop", "Shop every piece from the Maison Vell Spring Summer 2027 runway."),
  component: Shop,
});

const filters = ["All", "Clothing", "Accessories"] as const;

function Shop() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const items = f === "All" ? ITEMS : ITEMS.filter((i) => i.category === f.toLowerCase());
  return (
    <Shell>
      <PageIntro eyebrow="Spring Summer 2027" title="Shop">Twelve pieces, six looks, straight from the runway.</PageIntro>
      <div className="wide mb-8 flex gap-8 px-4 text-[10px] tracking-[.14em] md:px-12">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className={x === f ? "border-b border-foreground pb-1" : "pb-1 text-dim hover:text-foreground"}>{x}</button>
        ))}
      </div>
      <ProductGrid items={items} />
    </Shell>
  );
}
