import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';

const TABS = [
{ id: 'home', icon: 'home', labelKey: 'app.home' },
{ id: 'wishlist', icon: 'heart', labelKey: 'app.saved' },
{ id: 'history', icon: 'clock', labelKey: 'app.history' },
{ id: 'account', icon: 'user', labelKey: 'app.account' },
];

export default function BottomNav({ tab, setTab }) {
const { t } = useTranslation();

return ( <View style={styles.nav}>
{TABS.map((item) => {
const active = tab === item.id;

```
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => setTab(item.id)}
        style={styles.tabBtn}
      >
        <Feather
          name={item.icon}
          size={19}
          color={active ? COLORS.brand : COLORS.textMuted}
        />

        <Text
          style={[
            styles.tabLabel,
            {
              color: active
                ? COLORS.brand
                : COLORS.textMuted,
            },
          ]}
        >
          {t(item.labelKey)}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
```

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

tabBtn: {
flex: 1,
alignItems: 'center',
},

tabLabel: {
fontSize: 10,
marginTop: 3,
},
});
