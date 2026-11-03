import { MODELS, PIECES, type Item, type Look } from "./data";

function Crop({ href, x, y, w, h, sw, sh, className }: { href: string; x: number; y: number; w: number; h: number; sw: number; sh: number; className?: string | undefined }) {
  const vb = `${x} ${y} ${w} ${h}`;
  return (
    <svg viewBox={vb} className={className} aria-hidden="true">
      <svg x={x} y={y} width={w} height={h} viewBox={vb}>
        <image href={href} width={sw} height={sh} />
      </svg>
    </svg>
  );
}

export const ItemImage = ({ item, className }: { item: Item; className?: string | undefined }) => {
  const [a, b, c, d] = item.box;
  return <Crop href={PIECES} x={a} y={c} w={b - a} h={d - c} sw={960} sh={720} className={className} />;
};

export const LookImage = ({ look, className }: { look: Look; className?: string | undefined }) => (
  <Crop href={MODELS} x={look.x0} y={48} w={look.x1 - look.x0} h={448} sw={960} sh={540} className={className} />
);
