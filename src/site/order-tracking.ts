export const ORDER_STAGES = ["Confirmed", "Processing", "Shipped", "Delivered"] as const;

export function orderStageIndex(status: string) {
  if (status === "Placed") return 0;
  return ORDER_STAGES.findIndex((stage) => stage === status);
}