import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell, pageHead } from "@/site/Shell";
import atelier from "@/assets/atelier.jpg";

export const Route = createFileRoute("/maison")({
  head: () => pageHead("The Maison", "The story, atelier and craft behind Maison Vell."),
  component: Maison,
});

const values = [
  ["Atelier", "Every piece is cut and finished by hand in our Paris atelier."],
  ["Material", "Silk satin, plissé chiffon and responsibly sourced feathers."],
  ["Time", "Small runs, made to last many seasons rather than one."],
];

function Maison() {
  return (
    <Shell>
      <PageIntro eyebrow="Since 2009" title="The Maison">
        Maison Vell began as a single room in Paris and one idea: that softness can be a kind of strength.
      </PageIntro>
      <img src={atelier} alt="The Maison Vell atelier" width={1600} height={912} className="h-[60vh] w-full object-cover" />
      <div className="grid gap-12 px-4 py-20 md:grid-cols-3 md:px-12">
        {values.map(([t, d]) => (
          <div key={t}>
            <h2 className="wide text-sm tracking-[.16em]">{t}</h2>
            <p className="mt-4 leading-relaxed text-mid">{d}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}
