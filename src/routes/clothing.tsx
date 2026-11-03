import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductGrid, Shell, pageHead } from "@/site/Shell";
import { ITEMS } from "@/site/data";

export const Route = createFileRoute("/clothing")({
  head: () => pageHead("Clothing", "Gowns, coats, blouses and trousers from the Maison Vell Spring Summer 2027 collection."),
  component: () => (
    <Shell>
      <PageIntro eyebrow="Ready to wear" title="Clothing">Feather, satin and pleat — soft fabrics cut with quiet strength.</PageIntro>
      <ProductGrid items={ITEMS.filter((i) => i.category === "clothing")} />
    </Shell>
  ),
});
