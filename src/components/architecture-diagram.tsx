import type { DiagramEdge, DiagramNode } from "@/lib/content";

function getAnchorPoints(from: DiagramNode, to: DiagramNode) {
  const fw = from.w ?? 160;
  const fh = from.h ?? 64;
  const tw = to.w ?? 160;
  const th = to.h ?? 64;

  const fromCx = from.x + fw / 2;
  const fromCy = from.y + fh / 2;
  const toCx = to.x + tw / 2;
  const toCy = to.y + th / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  if (Math.abs(dx) >= Math.abs(dy)) {
    // Horizontal connection
    if (dx >= 0) {
      return { x1: from.x + fw, y1: fromCy, x2: to.x, y2: toCy };
    }
    return { x1: from.x, y1: fromCy, x2: to.x + tw, y2: toCy };
  }

  // Vertical connection
  if (dy >= 0) {
    return { x1: fromCx, y1: from.y + fh, x2: toCx, y2: to.y };
  }
  return { x1: fromCx, y1: from.y, x2: toCx, y2: to.y + th };
}

export function ArchitectureDiagram({
  nodes,
  edges,
  caption,
  title,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption: string;
  title: string;
}) {
  const maxX = Math.max(...nodes.map((n) => n.x + (n.w ?? 160))) + 24;
  const maxY = Math.max(...nodes.map((n) => n.y + (n.h ?? 64))) + 24;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <figure className="paper-card rounded-[16px] p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${maxX} ${maxY}`}
          role="img"
          aria-label={`System architecture diagram for ${title}`}
          className="h-auto w-full min-w-[540px] max-w-[740px]"
        >
          <defs>
            <marker
              id="arrow-muted"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--muted)" />
            </marker>
            <marker
              id="arrow-primary"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ink)" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodeMap.get(edge.from);
            const toNode = nodeMap.get(edge.to);
            if (!fromNode || !toNode) return null;

            const { x1, y1, x2, y2 } = getAnchorPoints(fromNode, toNode);
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const isPrimary = edge.kind === "primary";
            const isWireless = edge.kind === "wireless";

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isPrimary ? "var(--ink)" : "var(--muted)"}
                  strokeWidth={isPrimary ? 2.5 : 1.5}
                  strokeDasharray={isWireless ? "5 4" : undefined}
                  markerEnd={
                    isPrimary ? "url(#arrow-primary)" : "url(#arrow-muted)"
                  }
                />
                <rect
                  x={midX - edge.label.length * 3.4 - 6}
                  y={midY - 10}
                  width={edge.label.length * 6.8 + 12}
                  height={18}
                  fill="var(--surface)"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill={isPrimary ? "var(--ink)" : "var(--muted)"}
                  fontSize="11"
                  fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                  fontWeight={isPrimary ? "600" : "400"}
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const w = node.w ?? 160;
            const h = node.h ?? 64;
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={w}
                  height={h}
                  rx={4}
                  fill="var(--bg)"
                  stroke={node.accent ? "var(--ink)" : "var(--muted)"}
                  strokeWidth={node.accent ? 2 : 1.25}
                />
                <text
                  x={node.x + w / 2}
                  y={node.y + h / 2 - 4}
                  textAnchor="middle"
                  fill="var(--ink)"
                  fontSize="13.5"
                  fontWeight="600"
                  fontFamily="var(--font-schibsted), ui-sans-serif, sans-serif"
                >
                  {node.label}
                </text>
                <text
                  x={node.x + w / 2}
                  y={node.y + h / 2 + 14}
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize="11.5"
                  fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3 text-[12px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-[2.5px] w-6 bg-ink" aria-hidden="true" />
          Primary data path
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-[1.5px] w-6 bg-muted" aria-hidden="true" />
          Wired link
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block w-6 border-t-[1.5px] border-dashed border-muted"
            aria-hidden="true"
          />
          Wireless / LAN
        </span>
      </div>

      <figcaption className="mt-2 text-[13px] text-muted">{caption}</figcaption>
    </figure>
  );
}
