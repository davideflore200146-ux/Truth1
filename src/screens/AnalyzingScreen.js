import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

const MESSAGES = [
  'Sto analizzando il prodotto…',
  'Cerco il prezzo attuale sul web…',
  'Confronto i prezzi tra i negozi…',
  'Leggo le recensioni…',
  'Verifico eventuali anomalie…',
];

// onReady viene chiamato una sola volta al montaggio: avvia la vera chiamata
// al backend. Questo schermo resta visibile finché il componente padre non
// cambia "view" dopo aver ricevuto la risposta (o un errore).
export default function AnalyzingScreen({ onReady }) {
  const [step, setStep] = useState(0);
  const spin = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 900, easing: Easing.linear, useNativeDriver: true })
    ).start();
    const interval = setInterval(() => setStep((s) => Math.min(s + 1, MESSAGES.length - 1)), 1600);

    if (!started.current) {
      started.current = true;
      onReady();
    }

    return () => clearInterval(interval);
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
      <Text style={styles.message}>{MESSAGES[step]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  spinner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderTopColor: COLORS.brand,
  },
  message: { color: COLORS.textSecondary, fontSize: 13.5, textAlign: 'center', paddingHorizontal: 40, marginTop: 22 },
});
