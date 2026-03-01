import React from "react";

type Orientation = "up" | "down";

function trianglePoints(baseWidth: number, altitude: number, orientation: Orientation) {
  const half = baseWidth / 2;

  // We build points around x=0, then translate with a group transform.
  // Up: apex at (0,0), base at y=altitude
  // Down: apex at (0,altitude), base at y=0
  if (orientation === "up") {
    return `0,0 ${-half},${altitude} ${half},${altitude}`;
  }
  return `${-half},0 ${half},0 0,${altitude}`;
}

function TriangleSVG({
  baseWidth,
  altitude,
  fill,
  orientation,
}: {
  baseWidth: number;
  altitude: number;
  fill: string;
  orientation: Orientation;
}) {
  return (
    <svg
      width={baseWidth}
      height={altitude}
      viewBox={`${-baseWidth / 2} 0 ${baseWidth} ${altitude}`}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <polygon points={trianglePoints(baseWidth, altitude, orientation)} fill={fill} />
    </svg>
  );
}

function LetterInTriangles({
  letter,
  fontFamily = "var(--font-display)",
  colorLetter = "currentColor",
//   colorTop = "hsl(var(--brand))",
//   colorBottom = "hsl(var(--brand))",
  colorTop = "#D97706",     // warm amber / orange
  colorBottom = "#B91C1C",  // strong deep red
  triBase = 26,
  triAlt = 7,
  topPad = 0,
  bottomPad = 0,
  letterSize = 32,
  letterWeight = 600,
  squashY = 0.8,
}: {
  letter: string;
  fontFamily?: string;
  colorLetter?: string;
  colorTop?: string;
  colorBottom?: string;
  triBase?: number;
  triAlt?: number;
  topPad?: number;
  bottomPad?: number;
  letterSize?: number;
  letterWeight?: number;
  squashY?: number;
}) {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <div style={{ marginBottom: topPad }}>
        <TriangleSVG baseWidth={triBase} altitude={triAlt} fill={colorTop} orientation="up" />
      </div>

      <div
        style={{
          fontFamily,
          fontSize: letterSize,
          fontWeight: letterWeight,
          color: colorLetter,
          transform: `scaleY(${squashY})`,
          transformOrigin: "center",
          lineHeight: 1,
        }}
      >
        {letter}
      </div>

      <div style={{ marginTop: bottomPad }}>
        <TriangleSVG baseWidth={triBase} altitude={triAlt} fill={colorBottom} orientation="down" />
      </div>
    </div>
  );
}

export default function BrandLogo({
  letters = ["R", "D", "K", "C"],
  spacingX = 10,
}: {
  letters?: string[];
  spacingX?: number;
}) {
  return (
    <div className="flex items-center" style={{ gap: spacingX }}>
      {letters.map((ch) => (
        <LetterInTriangles
          key={ch}
          letter={ch}
        />
      ))}
    </div>
  );
}