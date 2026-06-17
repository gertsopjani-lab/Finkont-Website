/**
 * Fixed, full-viewport atmospheric layer rendered beneath all content.
 *
 * Combines slow-drifting radial "mesh" blobs (brand purple + midnight indigo)
 * with an ultra-thin crosshair grid overlay for a deep, premium glow. Purely
 * decorative and non-interactive.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Drifting mesh blobs */}
      <div
        className="fk-mesh-blob -left-[10%] -top-[15%] h-[55vmax] w-[55vmax] bg-primary/20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="fk-mesh-blob -right-[15%] top-[10%] h-[50vmax] w-[50vmax] bg-indigo/20"
        style={{ animationDelay: "-7s", animationDuration: "26s" }}
      />
      <div
        className="fk-mesh-blob bottom-[-20%] left-[20%] h-[45vmax] w-[45vmax] bg-indigo-deep/30"
        style={{ animationDelay: "-13s", animationDuration: "30s" }}
      />

      {/* Crosshair grid overlay */}
      <div className="fk-grid-overlay absolute inset-0" />

      {/* Vignette to keep edges deep */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
