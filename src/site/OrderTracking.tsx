import { Check, PackageCheck, Package, Truck, CircleCheck } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { ORDER_STAGES, orderStageIndex } from "./order-tracking";

const icons = [CircleCheck, Package, Truck, PackageCheck];
const date = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function OrderTracking({ order }: { order: Tables<"orders"> }) {
  const current = orderStageIndex(order.status);
  const dates = [order.confirmed_at ?? order.created_at, order.processing_at, order.shipped_at, order.delivered_at];
  return (
    <div className="mt-5 border-t border-border pt-5">
      <p className="wide text-[10px] leading-relaxed tracking-[.12em]">
        {current < 0 ? order.status : ORDER_STAGES[current]}
        {order.status_updated_at && <span className="ml-3 font-sans normal-case tracking-normal text-mid">Updated {date(order.status_updated_at)}</span>}
      </p>
      <ol aria-label="Order progress" className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
        {ORDER_STAGES.map((stage, index) => {
          const Icon = icons[index];
          const reached = current >= index;
          const timestamp = dates[index];
          return (
            <li key={stage} aria-current={current === index ? "step" : undefined} className={reached ? "text-foreground" : "text-mid"}>
              <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full border ${reached ? "border-foreground bg-foreground text-background" : "border-border"}`}>
                {index < current ? <Check className="size-4" aria-hidden="true" /> : Icon && <Icon className="size-4" aria-hidden="true" />}
              </div>
              <p className="text-xs font-medium">{stage}</p>
              <p className="mt-1 text-xs text-mid">{timestamp ? date(timestamp) : reached ? "Completed" : "Pending"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}