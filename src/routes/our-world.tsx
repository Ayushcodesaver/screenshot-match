import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell, pageHead } from "@/site/Shell";

export const Route = createFileRoute("/our-world")({
  head: () => pageHead("Our World", "Boutiques, journal and commitments from Maison Vell."),
  component: OurWorld,
});

const stores = [
  ["Paris", "14 Rue du Faubourg Saint-Honoré"],
  ["London", "22 Mount Street, Mayfair"],
  ["New York", "880 Madison Avenue"],
  ["Tokyo", "5-2 Minami-Aoyama, Minato"],
];
const journal = [
  ["Behind the pleat", "How 400 metres of chiffon become one gown."],
  ["The palest blue", "Notes on the colour of Spring Summer 2027."],
  ["Feathers, responsibly", "Where our materials come from, and why it matters."],
];

function OurWorld() {
  return (
    <Shell>
      <PageIntro eyebrow="Maison Vell" title="Our World">Boutiques, stories and the people who make each piece.</PageIntro>
      <section className="px-4 md:px-12">
        <h2 className="wide text-sm tracking-[.16em]">Journal</h2>
        <div className="mt-8 grid gap-px md:grid-cols-3">
          {journal.map(([t, d]) => (
            <article key={t} className="bg-rail p-8">
              <h3 className="wide text-xs tracking-[.14em]">{t}</h3>
              <p className="mt-4 text-mid">{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-20 px-4 md:px-12">
        <h2 className="wide text-sm tracking-[.16em]">Boutiques</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-4">
          {stores.map(([c, a]) => (
            <li key={c}><p className="wide text-xs tracking-[.14em]">{c}</p><p className="mt-2 text-sm text-mid">{a}</p></li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
