import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, pageHead } from "@/site/Shell";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Login", "Sign in to your Maison Vell account."),
  component: Login,
});

function Login() {
  const [sent, setSent] = useState(false);
  const field = "mt-2 w-full border-b border-foreground/30 bg-transparent py-2 outline-none focus:border-foreground";
  return (
    <Shell>
      <section className="mx-auto max-w-sm px-4 pt-20">
        <h1 className="wide text-2xl tracking-[.14em]">Login</h1>
        {sent ? (
          <p className="mt-8 text-mid">Accounts are opening soon. We'll be in touch.</p>
        ) : (
          <form className="mt-10 space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label className="wide block text-[10px] tracking-[.14em]">Email<input type="email" required className={field} /></label>
            <label className="wide block text-[10px] tracking-[.14em]">Password<input type="password" required className={field} /></label>
            <button className="wide w-full bg-foreground py-4 text-[10px] tracking-[.16em] text-background">Sign in</button>
          </form>
        )}
      </section>
    </Shell>
  );
}
