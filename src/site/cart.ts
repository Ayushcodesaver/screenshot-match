import { useEffect, useState } from "react";

const KEY = "mv-cart";
const read = (): number[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const write = (v: number[]) => {
  localStorage.setItem(KEY, JSON.stringify(v));
  window.dispatchEvent(new Event(KEY));
};

export function useCart() {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(KEY, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(KEY, sync); window.removeEventListener("storage", sync); };
  }, []);
  return {
    items,
    add: (id: number) => write([...read(), id]),
    removeAt: (idx: number) => write(read().filter((_, i) => i !== idx)),
    clear: () => write([]),
  };
}
