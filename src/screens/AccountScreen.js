import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import { Card, TopBar } from '../components/ui';

export default function AccountScreen() {
const { t } = useTranslation();

const [plusActive, setPlusActive] = useState(false);

const handlePurchase = () => {
setPlusActive(true);

```
Alert.alert(
  t('premium.title'),
  t('account.purchaseMessage')
);
```

};

return (
<View style={{ flex: 1 }}>
<TopBar title={t('account.title')} />

```
  <View style={{ paddingHorizontal: 18, paddingTop: 6 }}>
    <Card style={styles.plusCard}>
      <View style={styles.plusHeader}>
        <Text style={styles.plusTitle}>
          {t('premium.title')}
        </Text>

        {plusActive ? (
          <Text style={styles.activeText}>
            {t('account.active')}
          </Text>
        ) : (
          <Text style={styles.plusPrice}>
            €5,99/{t('premium.monthly')}
          </Text>
        )}
      </View>

      <Text style={styles.plusDesc}>
        {t('premium.description')}
      </Text>

      {plusActive ? (
        <View style={styles.activeBox}>
          <Text style={styles.activeBoxText}>
            ✓ {t('account.activeMessage')}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.plusBtn}
          onPress={handlePurchase}
        >
          <Text style={styles.plusBtnText}>
            {t('premium.upgrade')}
          </Text>
        </TouchableOpacity>
      )}
    </Card>
  </View>
</View>
```

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
