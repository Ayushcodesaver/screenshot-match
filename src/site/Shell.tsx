import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCart } from "./cart";
import { ITEMS, money, type Item } from "./data";
import { ItemImage } from "./Crop";

const tabs = [
  { to: "/", label: "Runway" },
  { to: "/maison", label: "The Maison" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/shop", label: "Shop" },
] as const;
const depts = [
  { to: "/collections", label: "Collections" },
  { to: "/clothing", label: "Clothing" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/beauty", label: "Beauty" },
  { to: "/accessories", label: "Accessories" },
  { to: "/our-world", label: "Our World" },
] as const;

// Runway home runs a standalone script, so links into it do a full page load.
const Nav = ({ to, children, className }: { to: string; children: ReactNode; className?: string | undefined }) =>
  to === "/" ? <a href="/" className={className}>{children}</a> : (
    <Link to={to} className={className} activeProps={{ className: "text-foreground" }}>{children}</Link>
  );

export function Shell({ children }: { children: ReactNode }) {
  const { items } = useCart();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background px-4 pb-3 pt-4 md:px-12 md:pt-5">
        <div className="grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <a href="/" className="wide text-sm tracking-[.2em]">Maison Vell</a>
          <nav className="wide hidden gap-12 text-sm tracking-[.14em] text-dim md:flex">
            {tabs.map((t) => <Nav key={t.label} to={t.to} className="transition-colors hover:text-foreground">{t.label}</Nav>)}
          </nav>
          <div className="wide flex items-center justify-end gap-5 text-[10px] tracking-[.12em]">
            <Link to="/login" className="hidden md:inline">Login</Link>
            <Link to="/cart">Cart ({items.length})</Link>
          </div>
        </div>
        <nav className="wide mt-4 hidden justify-center gap-14 text-[10px] tracking-[.14em] md:flex">
          {depts.map((d) => <Nav key={d.label} to={d.to} className="text-foreground/80 transition-colors hover:text-mid">{d.label}</Nav>)}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-24 bg-rail px-4 py-12 md:px-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="wide text-sm tracking-[.2em]">Maison Vell</div>
          {[tabs, depts.slice(0, 3), depts.slice(3)].map((g, i) => (
            <ul key={i} className="wide space-y-3 text-[10px] tracking-[.14em] text-mid">
              {g.map((l) => <li key={l.label}><Nav to={l.to} className="hover:text-foreground">{l.label}</Nav></li>)}
            </ul>
          ))}
        </div>
        <p className="mt-10 text-xs text-dim">© 2026 Maison Vell. Spring Summer 2027.</p>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="px-4 pb-12 pt-16 md:px-12 md:pt-24">
      <p className="wide text-[10px] tracking-[.18em] text-mid">{eyebrow}</p>
      <h1 className="wide mt-4 text-2xl tracking-[.14em] md:text-4xl">{title}</h1>
      {children && <p className="mt-6 max-w-xl leading-relaxed text-mid">{children}</p>}
    </section>
  );
}

export function ProductCard({ item }: { item: Item }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col bg-rail p-6 odd:bg-card">
      <div className="h-80 overflow-hidden p-4"><ItemImage item={item} className="h-full w-full" /></div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="wide text-[10px] tracking-[.14em]">{item.name}</h3>
          <p className="mt-1.5 text-sm text-mid">{money(item.price)} · Look {item.look}</p>
        </div>
        <button onClick={() => add(item.id)} aria-label={`Add ${item.name} to cart`} className="wide border border-foreground px-3 py-2 text-[9px] tracking-[.14em] transition-colors hover:bg-foreground hover:text-background">Add</button>
      </div>
    </article>
  );
}

export function ProductGrid({ items = ITEMS }: { items?: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-px px-4 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
      {items.map((i) => <ProductCard key={i.id} item={i} />)}
    </div>
  );
}

export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Maison Vell` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Maison Vell` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
