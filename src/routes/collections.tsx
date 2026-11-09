import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell, pageHead } from "@/site/Shell";
import { LookImage } from "@/site/Crop";
import { LOOKS as ALL } from "@/site/data";
import type { Look } from "@/site/data";
const LOOKS = ALL as [Look, Look, Look, Look, Look, Look];

export const Route = createFileRoute("/collections")({
  head: () => pageHead("Collections", "Explore Maison Vell collections, led by Spring Summer 2027."),
  component: Collections,
});

const groups = [
  { title: "Spring Summer 2027", text: "Softness and strength, in blush, sage, champagne and powder blue.", looks: LOOKS.slice(0, 3), to: "/lookbook" as const },
  { title: "The Evening Edit", text: "Gowns and ruffles for the hours after dark.", looks: [LOOKS[1], LOOKS[5], LOOKS[2]], to: "/clothing" as const },
  { title: "Outerwear", text: "Trenches and long coats in the palest tones.", looks: [LOOKS[4], LOOKS[2], LOOKS[0]], to: "/shop" as const },
];

function Collections() {
  return (
    <Shell>
      <PageIntro eyebrow="Maison Vell" title="Collections" />
      <div className="space-y-20 px-4 md:px-12">
        {groups.map((g) => (
          <section key={g.title}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="wide text-lg tracking-[.14em]">{g.title}</h2>
                <p className="mt-2 text-mid">{g.text}</p>
              </div>
              <Link to={g.to} className="wide border-b border-foreground pb-1 text-[10px] tracking-[.14em]">Discover</Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-px">
              {g.looks.map((l) => (
                <div key={l.no} className="flex h-72 justify-center bg-rail py-6 md:h-[28rem]"><LookImage look={l} className="h-full" /></div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}
