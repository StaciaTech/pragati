
'use client';

import * as React from 'react';

interface SpiderChartProps {
  data: { [key: string]: number };
  maxScore?: number;
  size?: number;
}

// Helper to wrap text
function wrapText(text: string, maxWordsPerLine: number) {
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
}


export function SpiderChart({ data, maxScore = 100, size = 400 }: SpiderChartProps) {
  const padding = 50;
  const chartSize = size - padding * 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = chartSize / 2.5;

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
              if (value === 0) return null;
              
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
        const rawLabelText = validDataKeys[i].replace(/([A-Z&])/g, ' $1').trim();
        const wrappedText = wrapText(rawLabelText, 2);
        
        const labelRadius = radius + 30; // Move labels further out
        const textPointX = centerX + labelRadius * Math.cos(angle);
        const textPointY = centerY + labelRadius * Math.sin(angle);

        let textAnchor = "middle";
        if (textPointX > centerX + 10) {
            textAnchor = "start";
        } else if (textPointX < centerX - 10) {
            textAnchor = "end";
        }
        
        let yOffset = 0;
        if(textPointY < centerY) yOffset = -20;
        if(textPointY > centerY) yOffset = 20;

        return (
          <g key={`label-group-${i}`} transform={`translate(${textPointX}, ${textPointY + yOffset})`}>
            <text
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="font-bold text-lg fill-foreground"
            >
              {value}%
            </text>
            <text
              y={18}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="text-xs fill-muted-foreground"
            >
              {wrappedText.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={0} dy={lineIndex > 0 ? "1.2em" : 0}>{line}</tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* Data Polygon */}
      <polygon
        points={points}
        fill="none"
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
