import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "@lovable.dev/cloud-auth-js/styles.css";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Shell, pageHead } from "@/site/Shell";
import { useUser } from "@/site/session";

export const Route = createFileRoute("/auth")({
  head: () => pageHead("Sign in", "Sign in or create your Maison Vell account."),
  component: Auth,
});

const G = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.270H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

function Auth() {
  const nav = useNavigate();
  const { user } = useUser();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav({ to: "/account" }); }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: window.location.origin + "/account", data: { full_name: name } },
      });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg("Check your email to confirm your account, then sign in.");
    }
    setBusy(false);
  }

  async function social(p: "google" | "lovable") {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) setMsg(r.error.message);
  }

  const field = "mt-2 w-full border-b border-foreground/30 bg-transparent py-2 font-sans normal-case outline-none focus:border-foreground";
  return (
    <Shell>
      <section className="mx-auto max-w-sm px-4 pt-20">
        <div className="wide flex gap-8 text-sm tracking-[.14em]">
          {(["in", "up"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setMsg(null); }} className={mode === m ? "border-b border-foreground pb-1" : "pb-1 text-dim"}>
              {m === "in" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
        <div className="mt-10 space-y-3">
          <button type="button" onClick={() => social("google")} className="flex w-full items-center justify-center gap-2.5 border border-[#747775] bg-[#FFFFFF] px-3 py-2.5 text-sm font-medium text-[#1F1F1F]">
            <G /> Continue with Google
          </button>
          <button type="button" className="lovable-auth-button w-full" onClick={() => social("lovable")}>Continue with Lovable</button>
        </div>
        <p className="wide my-8 text-center text-[9px] tracking-[.16em] text-dim">or with email</p>
        <form className="space-y-6" onSubmit={submit}>
          {mode === "up" && <label className="wide block text-[10px] tracking-[.14em]">Full name<input value={name} onChange={(e) => setName(e.target.value)} required className={field} /></label>}
          <label className="wide block text-[10px] tracking-[.14em]">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={field} /></label>
          <label className="wide block text-[10px] tracking-[.14em]">Password<input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required className={field} /></label>
          {msg && <p className="text-sm text-mid">{msg}</p>}
          <button disabled={busy} className="wide w-full bg-foreground py-4 text-[10px] tracking-[.16em] text-background disabled:opacity-50">
            {mode === "in" ? "Sign in" : "Create account"}
          </button>
        </form>
      </section>
    </Shell>
  );
}
