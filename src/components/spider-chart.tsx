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
  const radius = size / 2 - 30; // More padding for labels

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

  const gridLevels = 5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
       <defs>
        <radialGradient id="spider-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsla(var(--primary) / 0.5)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsla(var(--primary) / 0.1)', stopOpacity: 1 }} />
        </radialGradient>
      </defs>

      {/* Grid Lines */}
      {Array.from({ length: gridLevels }).map((_, levelIndex) => {
        const gridRadius = radius * ((levelIndex + 1) / gridLevels);
        const gridPoints = angles.map(angle => {
          const x = centerX + gridRadius * Math.sin(angle);
          const y = centerY - gridRadius * Math.cos(angle);
          return `${x},${y}`;
        }).join(' ');
        return (
          <polygon
            key={`grid-${levelIndex}`}
            points={gridPoints}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
        );
      })}
      
      {angles.map((angle, i) => {
        const point = getPoint(angle, maxScore);
        return (
          <line
            key={`spoke-${i}`}
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
        fill="url(#spider-gradient)"
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
            r="4"
            fill="hsl(var(--primary))"
            className="transition-transform duration-200 ease-in-out hover:scale-150"
          />
        );
      })}

      {/* Labels */}
      {angles.map((angle, i) => {
        const label = validDataKeys[i].replace(/([A-Z])/g, ' $1').trim(); // Add spaces before caps
        const textPoint = getPoint(angle, maxScore + 15);
        
        const words = label.split(' ');
        
        return (
          <text
            key={`label-${i}`}
            x={textPoint.x}
            y={textPoint.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="10"
            className="fill-muted-foreground font-medium"
          >
            {words.map((word, wordIndex) => (
              <tspan key={wordIndex} x={textPoint.x} dy={wordIndex === 0 ? 0 : '1.2em'}>{word}</tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
};
