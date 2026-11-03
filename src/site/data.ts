export const MODELS =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042056_1a704ff7-b0e5-4a9f-bbda-62392b819fb6.png&w=3840&q=85";
export const PIECES =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042057_080e85b0-b4aa-4072-8eb9-2304c7baf42b.png&w=2400&q=85";

export type Look = { no: number; name: string; x0: number; x1: number; note: string };
export const LOOKS: Look[] = [
  { no: 15, name: "Blush Feather", x0: 12, x1: 176, note: "Feathered jacket over fluid satin trousers." },
  { no: 16, name: "Sage Pleat", x0: 178, x1: 330, note: "A pleated gown cinched with gold." },
  { no: 17, name: "Champagne Trench", x0: 331, x1: 470, note: "Satin trench worn as a dress." },
  { no: 18, name: "Blush Billow", x0: 476, x1: 633, note: "Volume at the sleeve, ease at the waist." },
  { no: 19, name: "Powder Coat", x0: 634, x1: 767, note: "A long coat in the palest blue." },
  { no: 20, name: "Ivory Ruffle", x0: 767, x1: 956, note: "Sculpted ruffles above a pleated maxi." },
];

export type Category = "clothing" | "accessories";
export type Item = { id: number; look: number; name: string; price: number; box: [number, number, number, number]; category: Category };
const raw: [number, number, number, number, string, number, Category][] = [
  [26, 224, 28, 214, "Feather Jacket", 2900, "clothing"],
  [304, 412, 22, 236, "Satin Wide Leg Trousers", 1450, "clothing"],
  [530, 666, 12, 242, "Pleated Dress", 2200, "clothing"],
  [752, 922, 100, 146, "Gold Waist Belt", 420, "accessories"],
  [70, 176, 246, 466, "Satin Trench Dress", 2350, "clothing"],
  [294, 422, 294, 432, "Top Handle Bag", 980, "accessories"],
  [508, 688, 240, 452, "Billow Sleeve Blouse", 860, "clothing"],
  [780, 890, 252, 466, "Tie Waist Trousers", 740, "clothing"],
  [64, 178, 484, 698, "Powder Long Coat", 1980, "clothing"],
  [316, 396, 482, 698, "Ivory Straight Trousers", 690, "clothing"],
  [530, 672, 508, 682, "Sculpted Ruffle Top", 1120, "clothing"],
  [754, 916, 484, 700, "Pleated Maxi Skirt", 1340, "clothing"],
];
export const ITEMS: Item[] = raw.map(([a, b, c, d, name, price, category], i) => ({
  id: i, look: 15 + Math.floor(i / 2), name, price, box: [a, b, c, d], category,
}));

export const money = (n: number) => "$" + n.toLocaleString("en-US");
