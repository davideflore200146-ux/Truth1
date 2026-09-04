import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';

const TABS = [
{ id: 'home', icon: 'home', label: 'Home' },
{ id: 'wishlist', icon: 'heart', label: 'Preferiti' },
{ id: 'history', icon: 'clock', label: 'Cronologia' },
{ id: 'account', icon: 'user', label: 'Account' },
];

export default function BottomNav({ tab, setTab }) {
const { t } = useTranslation();

return ( <View style={styles.nav}>
{TABS.map((item) => {
const active = tab === item.id;


    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => setTab(item.id)}
        style={styles.tabBtn}
        activeOpacity={0.7}
      >
        <Feather
          name={item.icon}
          size={22}
          color={active ? COLORS.brand : COLORS.textMuted}
        />

        <Text
          style={[
            styles.tabLabel,
            {
              color: active ? COLORS.brand : COLORS.textMuted,
            },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>


);
}

const styles = StyleSheet.create({
nav: {
position: 'absolute',
bottom: 0,
left: 0,
right: 0,
zIndex: 100,
elevation: 10,
flexDirection: 'row',
borderTopWidth: 1,
borderTopColor: COLORS.border,
backgroundColor: COLORS.surface,
paddingTop: 10,
paddingBottom: 18,
paddingHorizontal: 6,
},

tabBtn: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingVertical: 4,
},

tabLabel: {
fontSize: 10,
marginTop: 3,
fontWeight: '500',
},
});
