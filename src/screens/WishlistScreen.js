import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import {
  getWishlist,
  removeFromWishlist,
} from '../api';
import { Card, TopBar } from '../components/ui';

export default function WishlistScreen({
  refreshKey,
  onOpen,
}) {
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);

    getWishlist()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [refreshKey]);

  const handleRemove = async (id) => {
    try {
      const updated = await removeFromWishlist(id);
      setItems(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Wishlist" />

      <View
        style={{
          paddingHorizontal: 18,
          paddingTop: 6,
          flex: 1,
        }}
      >
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 40 }}
            color={COLORS.brand}
          />
        )}

        {!loading && error && (
          <Text style={styles.empty}>
            {error}
          </Text>
        )}

        {!loading &&
          !error &&
          items.map((p) => (
            <Card
              key={p.id}
              onPress={() => onOpen(p)}
              style={styles.row}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {p.name}
                </Text>

                <Text style={styles.sub}>
                  {p.fairMax != null
                    ? t('wishlist.monitoredTarget', {
                        price: p.fairMax,
                      })
                    : t('wishlist.monitored')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemove(p.id)}
                hitSlop={8}
              >
                <Feather
                  name="trash-2"
                  size={16}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </Card>
          ))}
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
  },

  sub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
