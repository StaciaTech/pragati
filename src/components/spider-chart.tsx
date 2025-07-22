
'use client';

import * as React from 'react';

const labelMap: { [key: string]: string } = {
  "Core Idea & Innovation": "Idea & Innovation",
  "Market & Commercial Opportunity": "Market Opportunity",
  "Execution & Operations": "Execution & Ops",
  "Business Model & Strategy": "Business Model",
  "Team & Organizational Health": "Team",
  "External Environment & Compliance": "Compliance",
  "Risk & Future Outlook": "Risk & Outlook",
};

// Helper function to wrap text into multiple tspans
const wrapText = (text: string, maxWordsPerLine: number) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().split(' ').length > maxWordsPerLine) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    });
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    return lines;
};


export function SpiderChart({ data, maxScore = 100, size = 400 }: SpiderChartProps) {
  const padding = 60; // Increased padding to ensure labels fit
  const chartSize = size - padding * 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = chartSize / 2;

  const validDataKeys = Object.keys(data).filter(key => typeof data[key] === 'number');

  if (validDataKeys.length === 0) return null;

  const angles = validDataKeys.map((_, i) => (i * 2 * Math.PI) / validDataKeys.length - Math.PI / 2);

  const getPoint = (angle: number, value: number) => {
    const r = (value / maxScore) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const points = angles.map((angle, i) => {
    const value = data[validDataKeys[i]];
    const point = getPoint(angle, value);
    return `${point.x},${point.y}`;
  }).join(' ');
  
  const gridLevels = 4; // For 25, 50, 75, 100

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
      {/* Grid Lines */}
      {Array.from({ length: gridLevels }).map((_, levelIndex) => {
        const gridRadius = radius * ((levelIndex + 1) / gridLevels);
        const gridPoints = angles.map(angle => {
          const x = centerX + gridRadius * Math.cos(angle);
          const y = centerY + gridRadius * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ');
        return (
          <polygon
            key={`grid-${levelIndex}`}
            points={gridPoints}
            fill="none"
            stroke="hsl(var(--border) / 0.8)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Spokes and Axis Labels */}
      {angles.map((angle, i) => {
        const point = getPoint(angle, maxScore);
        const isFirstSpoke = i === 0;
        return (
          <g key={`spoke-group-${i}`}>
            <line
              key={`spoke-${i}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border) / 0.8)"
              strokeWidth="0.5"
            />
            {isFirstSpoke && Array.from({ length: gridLevels }).map((_, levelIndex) => {
                const value = (maxScore / gridLevels) * (levelIndex + 1);
                // Only show labels for 25, 50, 75, 100
                if (value % 25 !== 0 && value !== 100) return null;

                const labelPoint = getPoint(angle, value);
                return (
                  <text
                    key={`axis-label-${levelIndex}`}
                    x={labelPoint.x + 5}
                    y={labelPoint.y}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fontSize="10"
                    className="fill-muted-foreground"
                  >
                    {value}
                  </text>
                );
            })}
          </g>
        );
      })}
      
      {/* Labels */}
      {angles.map((angle, i) => {
        const value = data[validDataKeys[i]];
        const originalLabelText = validDataKeys[i];
        
        const labelRadius = radius + 35; 
        let textPointX = centerX + labelRadius * Math.cos(angle);
        let textPointY = centerY + labelRadius * Math.sin(angle);

        let textAnchor = "middle";
        if (angle > -Math.PI / 2 && angle < Math.PI / 2) { // Right side
            textAnchor = "start";
        } else if (angle > Math.PI / 2 || angle < -Math.PI / 2) { // Left side
            textAnchor = "end";
        }
        
        // Adjust vertical position for top/bottom labels to prevent them from sitting on the line
        if (Math.abs(angle - (-Math.PI/2)) < 0.1) { // Top
            textPointY -= 10;
        } else if (Math.abs(angle - (Math.PI/2)) < 0.1) { // Bottom
            textPointY += 10;
        }
        
        const wrappedLines = wrapText(originalLabelText, 2);
        const verticalOffset = (wrappedLines.length - 1) * 12 / 2; // half of total height of text block

        return (
            <g key={`label-group-${i}`}>
                <text
                    x={textPointX}
                    y={textPointY - 12} 
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                    className="font-bold text-lg fill-foreground"
                >
                    {value}%
                </text>
                 <text
                    x={textPointX}
                    y={textPointY + 8}
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                    className="text-xs fill-muted-foreground"
                >
                    {wrappedLines.map((line, lineIndex) => (
                        <tspan key={lineIndex} x={textPointX} dy={lineIndex === 0 ? 0 : 12}>
                            {line}
                        </tspan>
                    ))}
                </text>
            </g>
        );
      })}

      {/* Data Polygon */}
      <polygon
        points={points}
        fill="hsl(var(--primary) / 0.1)"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />

      {/* Data Points */}
      {angles.map((angle, i) => {
        const value = data[validDataKeys[i]];
        const point = getPoint(angle, value);
        const size = 4;
        return (
          <polygon 
            key={`point-${i}`}
            points={`${point.x},${point.y - size} ${point.x + size},${point.y} ${point.x},${point.y + size} ${point.x - size},${point.y}`}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--card))"
            strokeWidth={1.5}
            className="transition-transform duration-200 ease-in-out hover:scale-150"
          />
        );
      })}
    </svg>
  );
};
