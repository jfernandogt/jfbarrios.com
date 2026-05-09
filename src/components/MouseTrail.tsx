import { useEffect, useRef } from "react";

/**
 * Cursor glow effect.
 *
 * Performance notes:
 * - We use `transform: translate(x, y)` instead of mutating `left`/`top` on
 *   every mousemove. Setting `left`/`top` triggers a *layout* (reflow) on
 *   every frame; `transform` runs entirely on the GPU compositor thread and
 *   never touches layout.
 * - `will-change: transform` promotes the element to its own GPU layer so the
 *   browser doesn't have to re-composite the whole page on every mouse move.
 * - The listener is registered with `{ passive: true }` so it never blocks
 *   scroll.
 */
export function MouseTrail() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let revealed = false;

    const handleMouseMove = (e: MouseEvent) => {
      const el = glowRef.current;
      if (!el) return;

      // translate() keeps the element in the compositor layer — no reflow.
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;

      // Reveal on first move so it never flashes at (0,0) on load.
      if (!revealed) {
        el.style.opacity = "1";
        revealed = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        // Start off-screen; position is driven entirely by transform above.
        top: 0,
        left: 0,
        width: 320,
        height: 320,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, oklch(0.82 0.16 190 / 0.20) 0%, oklch(0.65 0.22 265 / 0.12) 45%, transparent 70%)",
        pointerEvents: "none",
        // Start hidden so the glow doesn't flash at (0,0) before first mousemove.
        opacity: 0,
        // willChange tells the browser to keep this on its own compositor layer.
        willChange: "transform",
        zIndex: 9998,
        // Transition opacity once for the initial reveal; transform has no
        // transition so it tracks the cursor without lag.
        transition: "opacity 0.3s ease",
      }}
      // Reveal on first render via a tiny inline hack-free approach:
      // the CSS class below fades it in after mount so it never flashes.
      onMouseEnter={undefined}
    />
  );
}
