import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, pageHead } from "@/site/Shell";
import { ItemImage } from "@/site/Crop";
import { useCart } from "@/site/cart";
import { ITEMS, money } from "@/site/data";

export const Route = createFileRoute("/cart")({
  head: () => pageHead("Cart", "Your Maison Vell shopping cart."),
  component: Cart,
});

function Cart() {
  const { items, removeAt } = useCart();
  const lines = items.map((id) => ITEMS[id]).filter(Boolean);
  const total = lines.reduce((s, i) => s + i.price, 0);
  return (
    <Shell>
      <section className="mx-auto max-w-3xl px-4 pt-16">
        <h1 className="wide text-2xl tracking-[.14em]">Cart ({lines.length})</h1>
        {lines.length === 0 ? (
          <p className="mt-8 text-mid">Your cart is empty. <Link to="/shop" className="border-b border-foreground text-foreground">Visit the shop</Link></p>
        ) : (
          <>
            <ul className="mt-10">
              {lines.map((i, idx) => (
                <li key={idx} className="flex items-center gap-6 border-b border-border py-5">
                  <div className="h-24 w-20 bg-rail p-2"><ItemImage item={i} className="h-full w-full" /></div>
                  <div className="flex-1">
                    <p className="wide text-[10px] tracking-[.14em]">{i.name}</p>
                    <p className="mt-1.5 text-sm text-mid">Look {i.look}</p>
                  </div>
                  <span className="text-sm">{money(i.price)}</span>
                  <button onClick={() => removeAt(idx)} className="wide text-[9px] tracking-[.14em] text-dim hover:text-foreground">Remove</button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <span className="wide text-xs tracking-[.14em]">Total</span>
              <span className="text-lg">{money(total)}</span>
            </div>
            <button className="wide mt-8 w-full bg-foreground py-4 text-[10px] tracking-[.16em] text-background">Checkout</button>
          </>
        )}
      </section>
    </Shell>
  );
}
