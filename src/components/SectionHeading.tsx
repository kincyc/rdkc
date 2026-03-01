import { ReactNode } from 'react';

const TRIANGLE_SRC = '/images/branding/blue-triangle-lower.svg';

export interface TriangleUnderlineProps {
  /** Number of triangle shapes in the row. */
  numberOfTriangles: number;
  /** Gap between triangles in pixels. */
  triangleSpacing: number;
  /** Height of each triangle in pixels (width follows SVG aspect ratio). */
  triangleHeight?: number;
}

export function TriangleUnderline({
  numberOfTriangles,
  triangleSpacing,
  triangleHeight = 8,
}: TriangleUnderlineProps) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ gap: triangleSpacing, marginTop: 6 }}
      aria-hidden
    >
      {Array.from({ length: numberOfTriangles }, (_, i) => (
        <img
          key={i}
          src={TRIANGLE_SRC}
          alt=""
          role="presentation"
          style={{ height: triangleHeight, width: 'auto' }}
        />
      ))}
    </div>
  );
}

export interface SectionHeadingProps {
  as?: 'h1' | 'h2';
  /** Paragraphs of intro text below the heading (optional). */
  children: ReactNode;
  /** Number of triangles in the underline. */
  numberOfTriangles?: number;
  /** Spacing between triangles in pixels. */
  triangleSpacing?: number;
  /** Height of each triangle in pixels. */
  triangleHeight?: number;
  /**
   * Color of the horizontal line in the same row as the heading (e.g. '#e5e5e5' or 'var(--border)').
   */
  lineColor?: string;
  /** Thickness of the horizontal line in pixels. */
  lineThickness?: number;
  className?: string;
}

/**
 * Section heading with an optional underline made of repeated triangle shapes.
 * Use for page section titles (e.g. "Shows & Talks", "About").
 */
export default function SectionHeading({
  as: Tag = 'h2',
  children,
  numberOfTriangles = 10,
  triangleSpacing = 6,
  triangleHeight = 8,
  lineColor = '#bbbbbb', //'#e5e5e5',
  lineThickness = 2,
  className = 'text-xl md:text-2xl',
}: SectionHeadingProps) {
  return (
    <header className="mb-8 md:mb-10">
      <div className="flex w-full items-center gap-4">
        <Tag className={`flex-shrink-0 ${className}`} style={{ fontFamily: 'var(--font-display)' }}>
          {children}
        </Tag>
        <div
          aria-hidden
          className="min-w-0 flex-1"
          style={{
            height: lineThickness,
            backgroundColor: lineColor,
          }}
        />
      </div>
      <TriangleUnderline
        numberOfTriangles={numberOfTriangles}
        triangleSpacing={triangleSpacing}
        triangleHeight={triangleHeight}
      />
    </header>
  );
}
