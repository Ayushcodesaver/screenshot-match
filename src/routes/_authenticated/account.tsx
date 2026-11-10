import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shell, pageHead } from "@/site/Shell";
import { ITEMS, money } from "@/site/data";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { OrderTracking } from "@/site/OrderTracking";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => pageHead("My account", "Your Maison Vell account details, order history and delivery tracking."),
  component: Account,
});

const FIELDS = [
  ["full_name", "Full name"], ["phone", "Phone"], ["address", "Address"],
  ["city", "City"], ["postal_code", "Postal code"], ["country", "Country"],
] as const;
type Key = (typeof FIELDS)[number][0];

function Account() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["account"],
    refetchInterval: 30_000,
    queryFn: async () => {
      const { data: u, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!u.user) throw new Error("Please sign in to view your orders.");
      const uid = u.user.id;
      const [p, o] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
        supabase.from("orders").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      ]);
      if (p.error) throw p.error;
      if (o.error) throw o.error;
      return { uid, email: u.user.email ?? "", profile: p.data, orders: o.data ?? [] };
    },
  });
  const [form, setForm] = useState<Record<Key, string>>({ full_name: "", phone: "", address: "", city: "", postal_code: "", country: "" });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (data?.profile) setForm(Object.fromEntries(FIELDS.map(([k]) => [k, data.profile?.[k] ?? ""])) as Record<Key, string>);
  }, [data?.profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    const { error } = await supabase.from("profiles").upsert({ id: data.uid, ...form, updated_at: new Date().toISOString() });
    setSaved(!error);
  }
  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  const field = "mt-2 w-full border-b border-foreground/30 bg-transparent py-2 font-sans normal-case outline-none focus:border-foreground";
  return (
    <Shell>
      <section className="px-4 pt-16 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="wide text-[10px] tracking-[.18em] text-mid">{data?.email}</p>
            <h1 className="wide mt-3 text-2xl tracking-[.14em] md:text-4xl">My account</h1>
          </div>
          <button onClick={signOut} className="wide border-b border-foreground pb-1 text-[10px] tracking-[.14em]">Sign out</button>
        </div>
        <div className="mt-14 grid gap-16 md:grid-cols-2">
          <form onSubmit={save} className="space-y-6">
            <h2 className="wide text-sm tracking-[.16em]">Details</h2>
            {FIELDS.map(([k, label]) => (
              <label key={k} className="wide block text-[10px] tracking-[.14em]">{label}
                <input value={form[k]} onChange={(e) => { setSaved(false); setForm({ ...form, [k]: e.target.value }); }} className={field} />
              </label>
            ))}
            <div className="flex items-center gap-6">
              <button className="wide bg-foreground px-8 py-4 text-[10px] tracking-[.16em] text-background">Save details</button>
              {saved && <span className="text-sm text-mid">Saved</span>}
            </div>
          </form>
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="wide text-sm tracking-[.16em]">Order history</h2>
              <Button variant="ghost" size="icon" onClick={() => void refetch()} disabled={isFetching} aria-label="Refresh order status" title="Refresh order status"><RefreshCw className={isFetching ? "animate-spin motion-reduce:animate-none" : ""} /></Button>
            </div>
            {isPending && <p className="mt-6 text-sm text-mid" role="status">Loading orders…</p>}
            {error && <p className="mt-6 text-sm text-destructive" role="alert">Orders couldn't be loaded. Please try refreshing.</p>}
            {data && data.orders.length === 0 && <p className="mt-6 text-mid">No orders yet.</p>}
            <ul className="mt-6 space-y-px">
              {data?.orders.map((o) => {
                const ids = (o.items as number[]) ?? [];
                return (
                  <li key={o.id} className="bg-rail p-6">
                    <div className="flex flex-wrap justify-between gap-3">
                      <span className="wide text-[10px] tracking-[.14em]">Order {o.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-sm">{money(o.total)}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-mid">{new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                    <p className="mt-3 text-sm">{ids.map((i) => ITEMS[i]?.name).filter(Boolean).join(", ")}</p>
                    <OrderTracking order={o} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </Shell>
  );
}
