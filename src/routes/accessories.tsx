import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductGrid, Shell, pageHead } from "@/site/Shell";
import { ITEMS } from "@/site/data";

export const Route = createFileRoute("/accessories")({
  head: () => pageHead("Accessories", "Bags and belts that finish each Maison Vell look."),
  component: () => (
    <Shell>
      <PageIntro eyebrow="Finishing touches" title="Accessories">Gold at the waist, a bag in the hand. Small pieces that complete a look.</PageIntro>
      <ProductGrid items={ITEMS.filter((i) => i.category === "accessories")} />
    </Shell>
  ),
});
