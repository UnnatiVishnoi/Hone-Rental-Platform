import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export interface PerfStats {
  fps: number;
  avgFps: number;
  minFps: number;
  frameMs: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  programs: number;
  jsHeapMb: number | null;
}

/** Lives inside <Canvas>. Samples r3f + WebGL + memory every frame. */
export function PerfSampler({ onSample }: { onSample: (s: PerfStats) => void }) {
  const { gl } = useThree();
  const last = useRef(performance.now());
  const frames = useRef(0);
  const acc = useRef(0);
  const fpsHistory = useRef<number[]>([]);

  useFrame(() => {
    const now = performance.now();
    const delta = now - last.current;
    last.current = now;
    frames.current += 1;
    acc.current += delta;

    if (acc.current >= 500) {
      const fps = (frames.current * 1000) / acc.current;
      fpsHistory.current.push(fps);
      if (fpsHistory.current.length > 60) fpsHistory.current.shift();

      const avg =
        fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
      const min = Math.min(...fpsHistory.current);

      const info = gl.info;
      const mem = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;

      onSample({
        fps: Math.round(fps),
        avgFps: Math.round(avg),
        minFps: Math.round(min),
        frameMs: Number((acc.current / frames.current).toFixed(2)),
        drawCalls: info.render.calls,
        triangles: info.render.triangles,
        geometries: info.memory.geometries,
        textures: info.memory.textures,
        programs: info.programs?.length ?? 0,
        jsHeapMb: mem ? Math.round(mem.usedJSHeapSize / 1048576) : null,
      });

      frames.current = 0;
      acc.current = 0;
    }
  });

  return null;
}

/** Floating overlay outside the canvas. Toggle with the `P` key. */
export function PerfOverlay({ stats }: { stats: PerfStats | null }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "p") setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible || !stats) return null;

  const fpsColor =
    stats.fps >= 55 ? "#7dd3a8" : stats.fps >= 30 ? "#d4b265" : "#e8806a";

  return (
    <div
      className="pointer-events-none absolute right-3 top-3 z-50 rounded-md border border-border/60 bg-background/80 px-3 py-2 font-mono text-[10px] leading-relaxed backdrop-blur-md"
      style={{ minWidth: 168 }}
    >
      <div className="mb-1 flex items-center justify-between gap-3">
        <span className="uppercase tracking-widest text-muted-foreground">3D Perf</span>
        <span style={{ color: fpsColor, fontWeight: 600 }}>{stats.fps} fps</span>
      </div>
      <Row label="avg / min" value={`${stats.avgFps} / ${stats.minFps}`} />
      <Row label="frame" value={`${stats.frameMs} ms`} />
      <Row label="draws" value={String(stats.drawCalls)} />
      <Row label="tris" value={stats.triangles.toLocaleString()} />
      <Row label="geom / tex" value={`${stats.geometries} / ${stats.textures}`} />
      <Row label="programs" value={String(stats.programs)} />
      {stats.jsHeapMb !== null && <Row label="heap" value={`${stats.jsHeapMb} MB`} />}
      <div className="mt-1 text-[9px] text-muted-foreground">press P to toggle</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-foreground/80">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
