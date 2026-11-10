import { describe, expect, it } from "vitest";
import { ORDER_STAGES, orderStageIndex } from "@/site/order-tracking";

describe("Order tracking", () => {
  it("follows confirmation through delivery in order", () => {
    expect(ORDER_STAGES).toEqual(["Confirmed", "Processing", "Shipped", "Delivered"]);
    expect(ORDER_STAGES.map(orderStageIndex)).toEqual([0, 1, 2, 3]);
  });
  it("treats existing placed purchases as confirmed", () => {
    expect(orderStageIndex("Placed")).toBe(0);
  });
  it("does not mark unknown statuses as confirmed or delivered", () => {
    expect(orderStageIndex("Cancelled")).toBe(-1);
  });
});