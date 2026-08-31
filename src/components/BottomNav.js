import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme';

const TABS = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'wishlist', icon: 'heart', label: 'Salvati' },
  { id: 'history', icon: 'clock', label: 'Storia' },
  { id: 'account', icon: 'user', label: 'Account' },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <View style={styles.nav}>
      {TABS.map((t) => {
        const active = tab === t.id;
        return (
          <TouchableOpacity key={t.id} onPress={() => setTab(t.id)} style={styles.tabBtn}>
            <Feather name={t.icon} size={19} color={active ? COLORS.brand : COLORS.textMuted} />
            <Text style={[styles.tabLabel, { color: active ? COLORS.brand : COLORS.textMuted }]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 6,
  },
  tabBtn: { flex: 1, alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 3 },
});
