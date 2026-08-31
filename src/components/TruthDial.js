import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { COLORS } from '../theme';

export default function TruthDial({ score, color, size = 180 }) {
  const r = size * 0.4;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;

  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 2 * Math.PI - Math.PI / 2;
    const major = i % 6 === 0;
    const rOuter = r + size * 0.075;
    const rInner = major ? r + size * 0.03 : r + size * 0.048;
    return {
      x1: cx + Math.cos(angle) * rOuter,
      y1: cy + Math.sin(angle) * rOuter,
      x2: cx + Math.cos(angle) * rInner,
      y2: cy + Math.sin(angle) * rInner,
      major,
    };
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cy} r={r} stroke={COLORS.border} strokeWidth={size * 0.048} fill="none" />
        <G rotation="-90" origin={`${cx}, ${cy}`}>
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={color}
            strokeWidth={size * 0.048}
            fill="none"
            strokeDasharray={`${filled}, ${circumference}`}
            strokeLinecap="round"
          />
        </G>
        {ticks.map((t, i) => (
          <Line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? COLORS.textMuted : '#33363F'}
            strokeWidth={t.major ? 2 : 1}
          />
        ))}
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={[styles.score, { fontSize: size * 0.23 }]}>{score}</Text>
        <Text style={styles.label}>/100 TRUTH SCORE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: { fontWeight: '700', color: COLORS.textPrimary },
  label: { fontSize: 10, color: COLORS.textMuted, marginTop: 2, letterSpacing: 1 },
});
