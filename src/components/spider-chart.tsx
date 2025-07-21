'use client';

import * as React from 'react';

interface SpiderChartProps {
  data: { [key: string]: number };
  maxScore?: number;
  size?: number;
}

export function SpiderChart({ data, maxScore = 100, size = 200 }: SpiderChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 25; // Padding for labels

  const validDataKeys = Object.keys(data).filter(key => typeof data[key] === 'number');

  if (validDataKeys.length === 0) return null;

  const angles = validDataKeys.map((_, i) => (i * 2 * Math.PI) / validDataKeys.length);

  const getPoint = (angle: number, value: number) => {
    const r = (value / maxScore) * radius;
    const x = centerX + r * Math.sin(angle);
    const y = centerY - r * Math.cos(angle);
    return { x, y };
  };

  const points = angles.map((angle, i) => {
    const value = data[validDataKeys[i]];
    const point = getPoint(angle, value);
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
      {/* Grid Lines */}
      {angles.map((angle, i) => {
        const point = getPoint(angle, maxScore);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data Polygon */}
      <polygon
        points={points}
        fill="hsla(var(--primary) / 0.6)"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />

      {/* Data Points */}
      {angles.map((angle, i) => {
        const value = data[validDataKeys[i]];
        const point = getPoint(angle, value);
        return (
          <circle
            key={`dot-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="hsl(var(--primary))"
          />
        );
      })}

      {/* Labels */}
      {angles.map((angle, i) => {
        const label = validDataKeys[i];
        const textPoint = getPoint(angle, maxScore + 12);
        return (
          <text
            key={`label-${i}`}
            x={textPoint.x}
            y={textPoint.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="10"
            className="fill-muted-foreground"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};
