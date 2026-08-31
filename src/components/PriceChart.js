import React from 'react';
import Svg, { Polyline, Line } from 'react-native-svg';
import { COLORS } from '../theme';

export default function PriceChart({ data, width = 300, height = 130, color = COLORS.brand }) {
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pad = 10;

  const points = data
    .map((d, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2);
      const y = height - pad - ((d.price - min) / (max - min || 1)) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Svg width={width} height={height}>
      {[0.25, 0.5, 0.75].map((f, i) => (
        <Line key={i} x1={0} x2={width} y1={height * f} y2={height * f} stroke={COLORS.border} strokeDasharray="3,4" />
      ))}
      <Polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
