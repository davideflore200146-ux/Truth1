```js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS, VERDICTS } from '../theme';
import { getHistory } from '../api';
import { Card, TopBar } from '../components/ui';

export default function HistoryScreen({ onOpen }) {
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHistory()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={t('history.title')} />

      <View style={{ paddingHorizontal: 18, paddingTop: 6 }}>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 40 }}
            color={COLORS.brand}
          />
        )}

        {!loading && error && (
          <Text style={styles.empty}>{error}</Text>
        )}

        {!loading && !error && items.length === 0 && (
          <Text style={styles.empty}>
            {t('history.empty')}
          </Text>
        )}

        {!loading &&
          !error &&
          items.map((h) => {
            const v = VERDICTS[h.verdict] || VERDICTS.wait;

            return (
              <Card
                key={h.id}
                onPress={() => onOpen(h)}
                style={styles.row}
              >
                <Text style={styles.name} numberOfLines={1}>
                  {h.name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <View
                    style={[
                      styles.pill,
                      { backgroundColor: v.soft },
                    ]}
                  >
                    <Feather
                      name={v.icon}
                      size={12}
                      color={v.color}
                    />

                    <Text
                      style={[
                        styles.pillText,
                        { color: v.color },
                      ]}
                    >
                      {v.label}
                    </Text>
                  </View>

                  {h.currentPrice != null && (
                    <Text style={styles.price}>
                      €{h.currentPrice}
                    </Text>
                  )}
                </View>
              </Card>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 60,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 10,
  },

  name: {
    fontWeight: '600',
    fontSize: 13.5,
    color: COLORS.textPrimary,
    flex: 1,
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },

  pillText: {
    fontSize: 10.5,
    fontWeight: '700',
  },

  price: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
  },
});
```
