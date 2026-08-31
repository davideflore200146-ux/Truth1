export const COLORS = {
  bg: '#0A0B0F',
  surface: '#15171D',
  surfaceRaised: '#1C1F27',
  border: '#262933',
  textPrimary: '#F2F3F5',
  textSecondary: '#8D93A1',
  textMuted: '#565B68',
  brand: '#4C7DFF',
  brandSoft: 'rgba(76,125,255,0.14)',
  green: '#34D399',
  greenSoft: 'rgba(52,211,153,0.14)',
  yellow: '#FBBF24',
  yellowSoft: 'rgba(251,191,36,0.14)',
  red: '#F87171',
  redSoft: 'rgba(248,113,113,0.14)',
};

export const VERDICTS = {
  buy: { label: 'COMPRA', color: COLORS.green, soft: COLORS.greenSoft, icon: 'check-circle' },
  wait: { label: 'ASPETTA', color: COLORS.yellow, soft: COLORS.yellowSoft, icon: 'clock' },
  avoid: { label: 'NON CONVIENE', color: COLORS.red, soft: COLORS.redSoft, icon: 'alert-triangle' },
};
