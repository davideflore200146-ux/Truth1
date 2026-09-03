import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../theme';

export default function AnalyzingScreen({ onReady }) {
  const { t } = useTranslation();

  const getMessage = (key, fallback) =>
    t(key, {
      defaultValue: fallback,
    });

  const MESSAGES = [
    getMessage(
      'analyzing.message1',
      'Analisi del prodotto in corso...'
    ),
    getMessage(
      'analyzing.message2',
      'Controllo del prezzo attuale...'
    ),
    getMessage(
      'analyzing.message3',
      'Confronto con i prezzi precedenti...'
    ),
    getMessage(
      'analyzing.message4',
      'Valutazione del prezzo reale...'
    ),
    getMessage(
      'analyzing.message5',
      'Preparazione del risultato...'
    ),
  ];

  const [step, setStep] = useState(0);

  const spin = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    const interval = setInterval(() => {
      setStep((currentStep) =>
        Math.min(currentStep + 1, MESSAGES.length - 1)
      );
    }, 1600);

    if (!started.current) {
      started.current = true;

      if (typeof onReady === 'function') {
        onReady();
      }
    }

    return () => {
      clearInterval(interval);
      animation.stop();
    };
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate }],
          },
        ]}
      />

      <Text style={styles.message}>
        {MESSAGES[step]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  spinner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderTopColor: COLORS.brand,
  },

  message: {
    color: COLORS.textSecondary,
    fontSize: 13.5,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 22,
  },
});