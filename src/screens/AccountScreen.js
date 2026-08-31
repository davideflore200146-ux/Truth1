import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../theme';
import { Card, TopBar } from '../components/ui';

export default function AccountScreen() {
  const [plusActive, setPlusActive] = useState(false);

  const handlePurchase = () => {
    setPlusActive(true);
    Alert.alert('TRUTH PLUS', 'TRUTH PLUS attivato!');
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Account" />

      <View style={{ paddingHorizontal: 18, paddingTop: 6 }}>
        <Card style={styles.plusCard}>
          <View style={styles.plusHeader}>
            <Text style={styles.plusTitle}>TRUTH PLUS</Text>

            {plusActive ? (
              <Text style={styles.activeText}>ATTIVO</Text>
            ) : (
              <Text style={styles.plusPrice}>€5,99/mese</Text>
            )}
          </View>

          <Text style={styles.plusDesc}>
            Analisi illimitate, storico completo, price alert,
            AI personalizzata e analisi recensioni avanzata.
          </Text>

          {plusActive ? (
            <View style={styles.activeBox}>
              <Text style={styles.activeBoxText}>
                ✓ TRUTH PLUS è attivo sul tuo account.
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={handlePurchase}
            >
              <Text style={styles.plusBtnText}>
                Passa a PLUS
              </Text>
            </TouchableOpacity>
          )}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  plusCard: {
    borderColor: COLORS.brand,
  },

  plusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  plusTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  plusPrice: {
    fontSize: 12,
    color: COLORS.brand,
    fontWeight: '700',
  },

  activeText: {
    fontSize: 12,
    color: COLORS.brand,
    fontWeight: '700',
  },

  plusDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 17,
  },

  plusBtn: {
    marginTop: 12,
    backgroundColor: COLORS.brand,
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: 'center',
  },

  plusBtnText: {
    color: COLORS.bg,
    fontWeight: '700',
    fontSize: 13,
  },

  activeBox: {
    marginTop: 12,
    paddingVertical: 10,
  },

  activeBoxText: {
    color: COLORS.brand,
    fontSize: 12,
    fontWeight: '600',
  },
});