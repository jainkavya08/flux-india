// Isometric projection math and geometric path helpers for the Flux India 5-Bay Industrial Switchboard
import { iso, type Flat, type Point3, type Projection } from "./iso-kit";

export const PROJECTION: Projection = {
  origin: [750, 620],
  scale: 0.92,
  azimuth: 42,
  elevation: 28,
};

// Convert 3D world coordinate to 2D SVG screen coordinate
export function toScreen(p: Point3, offset: Point3 = [0, 0, 0]): Flat {
  const worldPoint: Point3 = [p[0] + offset[0], p[1] + offset[1], p[2] + offset[2]];
  return iso(worldPoint, PROJECTION);
}

// Generate an isometric box (slab) path with top face, front face, and side face
export interface IsoBoxPaths {
  top: string;
  front: string;
  side: string;
  outline: string;
}

export function makeIsoBox(
  origin: Point3,
  width: number,
  depth: number,
  height: number,
  offset: Point3 = [0, 0, 0]
): IsoBoxPaths {
  const [ox, oy, oz] = [origin[0] + offset[0], origin[1] + offset[1], origin[2] + offset[2]];

  // 8 vertices of the box
  const p000 = toScreen([ox, oy, oz]);
  const p100 = toScreen([ox + width, oy, oz]);
  const p110 = toScreen([ox + width, oy + depth, oz]);
  const p010 = toScreen([ox, oy + depth, oz]);

  const p001 = toScreen([ox, oy, oz + height]);
  const p101 = toScreen([ox + width, oy, oz + height]);
  const p111 = toScreen([ox + width, oy + depth, oz + height]);
  const p011 = toScreen([ox, oy + depth, oz + height]);

  // Top face: p001 -> p101 -> p111 -> p011
  const top = `M${p001[0].toFixed(1)} ${p001[1].toFixed(1)} L${p101[0].toFixed(1)} ${p101[1].toFixed(1)} L${p111[0].toFixed(1)} ${p111[1].toFixed(1)} L${p011[0].toFixed(1)} ${p011[1].toFixed(1)} Z`;

  // Front face (facing toward camera/front): p000 -> p100 -> p101 -> p001
  const front = `M${p000[0].toFixed(1)} ${p000[1].toFixed(1)} L${p100[0].toFixed(1)} ${p100[1].toFixed(1)} L${p101[0].toFixed(1)} ${p101[1].toFixed(1)} L${p001[0].toFixed(1)} ${p001[1].toFixed(1)} Z`;

  // Side face (facing right): p100 -> p110 -> p111 -> p101
  const side = `M${p100[0].toFixed(1)} ${p100[1].toFixed(1)} L${p110[0].toFixed(1)} ${p110[1].toFixed(1)} L${p111[0].toFixed(1)} ${p111[1].toFixed(1)} L${p101[0].toFixed(1)} ${p101[1].toFixed(1)} Z`;

  // Combined outline
  const outline = `M${p000[0].toFixed(1)} ${p000[1].toFixed(1)} L${p100[0].toFixed(1)} ${p100[1].toFixed(1)} L${p110[0].toFixed(1)} ${p110[1].toFixed(1)} L${p111[0].toFixed(1)} ${p111[1].toFixed(1)} L${p011[0].toFixed(1)} ${p011[1].toFixed(1)} L${p001[0].toFixed(1)} ${p001[1].toFixed(1)} Z`;

  return { top, front, side, outline };
}

// Generate cylinder representation along Z axis
export function makeIsoCylinder(
  center: Point3,
  radius: number,
  height: number,
  offset: Point3 = [0, 0, 0]
): { top: string; body: string; outline: string } {
  const steps = 16;
  const [cx, cy, cz] = [center[0] + offset[0], center[1] + offset[1], center[2] + offset[2]];

  const topPts: Flat[] = [];
  const botPts: Flat[] = [];

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const px = cx + radius * Math.cos(angle);
    const py = cy + radius * Math.sin(angle);
    topPts.push(toScreen([px, py, cz + height]));
    botPts.push(toScreen([px, py, cz]));
  }

  const top = "M" + topPts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L") + " Z";
  
  // Find silhouette points
  let minIdx = 0;
  let maxIdx = 0;
  let minX = Infinity;
  let maxX = -Infinity;

  topPts.forEach((p, idx) => {
    if (p[0] < minX) {
      minX = p[0];
      minIdx = idx;
    }
    if (p[0] > maxX) {
      maxX = p[0];
      maxIdx = idx;
    }
  });

  const pTopL = topPts[minIdx];
  const pTopR = topPts[maxIdx];
  const pBotL = botPts[minIdx];
  const pBotR = botPts[maxIdx];

  const body = `M${pTopL[0].toFixed(1)} ${pTopL[1].toFixed(1)} L${pTopR[0].toFixed(1)} ${pTopR[1].toFixed(1)} L${pBotR[0].toFixed(1)} ${pBotR[1].toFixed(1)} L${pBotL[0].toFixed(1)} ${pBotL[1].toFixed(1)} Z`;
  const outline = `${body} ${top}`;

  return { top, body, outline };
}
