import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell, pageHead } from "@/site/Shell";
import beauty from "@/assets/beauty.jpg";

export const Route = createFileRoute("/beauty")({
  head: () => pageHead("Beauty", "Maison Vell fragrance and colour, inspired by the Spring Summer 2027 runway."),
  component: Beauty,
});

const products = [
  ["Eau de Vell", "Fragrance, 75 ml", "$240"],
  ["Rouge Blush", "Satin lipstick", "$58"],
  ["Champagne Glow", "Pressed highlighter", "$72"],
];

function Beauty() {
  return (
    <Shell>
      <PageIntro eyebrow="Coming spring 2027" title="Beauty">The runway palette, translated into scent and colour.</PageIntro>
      <div className="grid gap-12 px-4 md:grid-cols-2 md:px-12">
        <img src={beauty} alt="Maison Vell fragrance, lipstick and highlighter" width={1280} height={960} className="w-full object-cover" />
        <ul className="self-center">
          {products.map(([n, d, p]) => (
            <li key={n} className="flex items-end justify-between border-b border-border py-6">
              <div>
                <h2 className="wide text-xs tracking-[.14em]">{n}</h2>
                <p className="mt-1.5 text-sm text-mid">{d}</p>
              </div>
              <span className="text-sm">{p}</span>
            </li>
          ))}
          <p className="wide mt-6 text-[10px] tracking-[.14em] text-dim">Available in boutiques from March</p>
        </ul>
      </div>
    </Shell>
  );
}
