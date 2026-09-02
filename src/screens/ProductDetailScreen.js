import React, { useState } from 'react';
import {
View,
Text,
ScrollView,
TouchableOpacity,
StyleSheet,
Dimensions,
Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { COLORS, VERDICTS } from '../theme';
import { addToWishlist } from '../api';
import { Card, Section, TopBar } from '../components/ui';
import TruthDial from '../components/TruthDial';
import PriceChart from '../components/PriceChart';

const { width: SCREEN_W } = Dimensions.get('window');

function fmt(n) {
return typeof n === 'number' ? `€${n}` : '—';
}

export default function ProductDetailScreen({
product,
onBack,
onOpenChat,
onSaved,
}) {
const { t } = useTranslation();

const periods = product.priceHistory
? Object.keys(product.priceHistory)
: [];

const [period, setPeriod] = useState(
periods[0] || null
);

const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(false);

const v =
VERDICTS[product.verdict] || VERDICTS.wait;

const handleSave = async () => {
if (saved || saving) return;


setSaving(true);

try {
  await addToWishlist(product);
  setSaved(true);
  onSaved && onSaved();
} catch (err) {
  Alert.alert(
    t('common.error'),
    err?.message || t('common.tryAgain')
  );
} finally {
  setSaving(false);
}


};

return (
<View style={{ flex: 1 }}>
<ScrollView
style={{ flex: 1 }}
contentContainerStyle={{
paddingBottom: 110,
}}
>
<TopBar
onBack={onBack}
title={product.name}
right={ <TouchableOpacity
           onPress={handleSave}
           disabled={saving}
         >
<Feather
name="heart"
size={20}
color={
saved
? COLORS.red
: COLORS.textMuted
}
/> </TouchableOpacity>
}
/>


    <View style={{ paddingHorizontal: 18 }}>
      <Text style={styles.meta}>
        {[
          product.brand,
          product.category,
        ]
          .filter(Boolean)
          .join(' · ')}
      </Text>

      <View
        style={{
          alignItems: 'center',
          marginTop: 18,
        }}
      >
        <TruthDial
          score={product.score}
          color={v.color}
          size={190}
        />

        <View
          style={[
            styles.verdictPill,
            {
              backgroundColor: v.soft,
            },
          ]}
        >
          <Feather
            name={v.icon}
            size={15}
            color={v.color}
          />

          <Text
            style={[
              styles.verdictLabel,
              { color: v.color },
            ]}
          >
            {t(
              `verdict.${product.verdict || 'wait'}`
            )}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>
            {t('result.currentPrice')}
          </Text>

          <Text style={styles.statValue}>
            {fmt(product.currentPrice)}
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>
            {t('result.fairPrice')}
          </Text>

          <Text
            style={[
              styles.statValue,
              { color: COLORS.green },
            ]}
          >
            {product.fairMin != null &&
            product.fairMax != null
              ? `€${product.fairMin}–€${product.fairMax}`
              : '—'}
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>
            {t('result.savings')}
          </Text>

          <Text style={styles.statValue}>
            {product.savings != null
              ? `${t('result.upTo')} €${product.savings}`
              : '—'}
          </Text>
        </Card>
      </View>

      <Section title={t('result.why')}>
        <Card>
          <Text style={styles.bodyText}>
            {product.reasoning}
          </Text>
        </Card>
      </Section>

      <Section
        title={t('result.priceTrend')}
        right={
          periods.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
              }}
            >
              {periods.map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={[
                    styles.periodBtn,
                    period === p && {
                      backgroundColor:
                        COLORS.brand,
                      borderColor:
                        COLORS.brand,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.periodText,
                      period === p && {
                        color: COLORS.bg,
                      },
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null
        }
      >
        {periods.length > 0 ? (
          <Card
            style={{
              paddingHorizontal: 8,
              alignItems: 'center',
            }}
          >
            <PriceChart
              data={product.priceHistory[period]}
              width={SCREEN_W - 68}
              height={130}
            />
          </Card>
        ) : (
          <Card>
            <Text style={styles.mutedText}>
              {t('result.noPriceHistory')}
            </Text>
          </Card>
        )}
      </Section>

      {product.alternatives?.length > 0 && (
        <Section
          title={t('result.alternatives')}
        >
          <View style={{ gap: 8 }}>
            {product.alternatives.map((a) => (
              <Card key={a.name}>
                <View style={styles.altRow}>
                  <Text style={styles.altName}>
                    {a.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={styles.altPrice}
                    >
                      {fmt(a.price)}
                    </Text>

                    {a.score != null && (
                      <Text
                        style={styles.altScore}
                      >
                        {a.score}
                      </Text>
                    )}
                  </View>
                </View>

                {a.note ? (
                  <Text style={styles.altNote}>
                    {a.note}
                  </Text>
                ) : null}
              </Card>
            ))}
          </View>
        </Section>
      )}

      {(product.reviews?.positive?.length > 0 ||
        product.reviews?.issues?.length > 0) && (
        <Section
          title={t('result.userReviews')}
        >
          <Card>
            {product.reviews.positive.map((p) => (
              <View
                key={p}
                style={styles.reviewRow}
              >
                <Feather
                  name="check-circle"
                  size={14}
                  color={COLORS.green}
                />

                <Text
                  style={styles.reviewText}
                >
                  {p}
                </Text>
              </View>
            ))}

            {product.reviews.positive.length > 0 &&
              product.reviews.issues.length > 0 && (
                <View style={styles.divider} />
              )}

            {product.reviews.issues.map((p) => (
              <View
                key={p}
                style={styles.reviewRow}
              >
                <Feather
                  name="alert-triangle"
                  size={14}
                  color={COLORS.yellow}
                />

                <Text
                  style={styles.reviewText}
                >
                  {p}
                </Text>
              </View>
            ))}

            {product.reviews.insight ? (
              <View style={styles.insightBox}>
                <Feather
                  name="zap"
                  size={14}
                  color={COLORS.brand}
                  style={{ marginTop: 2 }}
                />

                <Text
                  style={styles.insightText}
                >
                  <Text
                    style={{
                      fontWeight: '700',
                    }}
                  >
                    TRUTH INSIGHT{'\n'}
                  </Text>

                  {product.reviews.insight}
                </Text>
              </View>
            ) : null}
          </Card>
        </Section>
      )}

      {product.truthCheck?.length > 0 && (
        <Section
          title={t('result.truthCheck')}
        >
          <Card style={{ gap: 10 }}>
            {product.truthCheck.map((item, i) => (
              <View
                key={i}
                style={styles.checkRow}
              >
                <Feather
                  name={
                    item.ok
                      ? 'check-circle'
                      : 'alert-triangle'
                  }
                  size={14}
                  color={
                    item.ok
                      ? COLORS.green
                      : COLORS.yellow
                  }
                  style={{ marginTop: 2 }}
                />

                <Text
                  style={styles.checkText}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </Card>
        </Section>
      )}

      {product.offers?.length > 0 && (
        <Section
          title={t('result.bestOffers')}
        >
          <View style={{ gap: 8 }}>
            {product.offers.map((o, i) => (
              <Card
                key={`${o.store}-${i}`}
                style={styles.offerRow}
              >
                <View>
                  <Text
                    style={styles.offerStore}
                  >
                    {o.store}
                  </Text>

                  {o.shipping ? (
                    <Text
                      style={
                        styles.offerShipping
                      }
                    >
                      {t('result.shipping')}: {o.shipping}
                    </Text>
                  ) : null}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text
                    style={styles.offerTotal}
                  >
                    {fmt(
                      o.total ?? o.price
                    )}
                  </Text>

                  <TouchableOpacity
                    style={styles.offerBtn}
                  >
                    <Feather
                      name="shopping-cart"
                      size={12}
                      color={COLORS.bg}
                    />

                    <Text
                      style={
                        styles.offerBtnText
                      }
                    >
                      {t('result.go')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        </Section>
      )}

      {product.fairMax != null && (
        <Section
          title={t('result.priceAlert')}
        >
          <Card style={styles.alertRow}>
            <View style={styles.alertIcon}>
              <Feather
                name="bell"
                size={16}
                color={COLORS.brand}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={styles.alertTitle}
              >
                {t('result.alertMeAt', {
                  price: product.fairMax,
                })}
              </Text>

              <Text
                style={styles.alertSub}
              >
                {t('result.alertDescription')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.alertBtn}
            >
              <Text
                style={styles.alertBtnText}
              >
                {t('result.activate')}
              </Text>
            </TouchableOpacity>
          </Card>
        </Section>
      )}
    </View>
  </ScrollView>

  <TouchableOpacity
    onPress={onOpenChat}
    style={styles.chatFab}
  >
    <Feather
      name="message-circle"
      size={15}
      color={COLORS.bg}
    />

    <Text style={styles.chatFabText}>
      {t('result.askTruth')}
    </Text>
  </TouchableOpacity>
</View>


);
}

const styles = StyleSheet.create({
meta: {
color: COLORS.textMuted,
fontSize: 12,
marginTop: 4,
},

verdictPill: {
flexDirection: 'row',
alignItems: 'center',
gap: 6,
paddingHorizontal: 16,
paddingVertical: 7,
borderRadius: 999,
marginTop: 14,
},

verdictLabel: {
fontWeight: '700',
fontSize: 13,
letterSpacing: 0.5,
},

statsRow: {
flexDirection: 'row',
gap: 8,
marginTop: 22,
},

statCard: {
flex: 1,
alignItems: 'center',
paddingVertical: 12,
paddingHorizontal: 4,
},

statLabel: {
fontSize: 9.5,
color: COLORS.textMuted,
},

statValue: {
fontWeight: '700',
fontSize: 16,
color: COLORS.textPrimary,
marginTop: 4,
},

bodyText: {
fontSize: 13.5,
lineHeight: 20,
color: COLORS.textPrimary,
},

mutedText: {
fontSize: 12.5,
color: COLORS.textMuted,
lineHeight: 18,
},

periodBtn: {
paddingHorizontal: 8,
paddingVertical: 4,
borderRadius: 8,
borderWidth: 1,
borderColor: COLORS.border,
},

periodText: {
fontSize: 10.5,
fontWeight: '600',
color: COLORS.textMuted,
},

altRow: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'flex-start',
},

altName: {
fontWeight: '600',
fontSize: 13.5,
color: COLORS.textPrimary,
flex: 1,
marginRight: 8,
},

altPrice: {
fontSize: 13,
color: COLORS.textPrimary,
},

altScore: {
fontSize: 11,
color: COLORS.brand,
fontWeight: '700',
},

altNote: {
fontSize: 12,
color: COLORS.textSecondary,
marginTop: 6,
lineHeight: 17,
},

reviewRow: {
flexDirection: 'row',
alignItems: 'center',
gap: 8,
marginBottom: 6,
},

reviewText: {
fontSize: 13,
color: COLORS.textPrimary,
},

divider: {
height: 1,
backgroundColor: COLORS.border,
marginVertical: 8,
},

insightBox: {
flexDirection: 'row',
gap: 8,
backgroundColor: COLORS.brandSoft,
borderRadius: 10,
padding: 10,
marginTop: 6,
},

insightText: {
fontSize: 12,
color: COLORS.textPrimary,
lineHeight: 17,
flex: 1,
},

checkRow: {
flexDirection: 'row',
gap: 8,
},

checkText: {
fontSize: 12.5,
color: COLORS.textSecondary,
lineHeight: 17,
flex: 1,
},

offerRow: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
},

offerStore: {
fontWeight: '600',
fontSize: 13.5,
color: COLORS.textPrimary,
},

offerShipping: {
fontSize: 11,
color: COLORS.textMuted,
marginTop: 2,
},

offerTotal: {
fontWeight: '700',
fontSize: 14,
color: COLORS.textPrimary,
},

offerBtn: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
backgroundColor: COLORS.brand,
borderRadius: 9,
paddingHorizontal: 12,
paddingVertical: 7,
},

offerBtnText: {
color: COLORS.bg,
fontSize: 11.5,
fontWeight: '700',
},

alertRow: {
flexDirection: 'row',
alignItems: 'center',
gap: 12,
},

alertIcon: {
width: 34,
height: 34,
borderRadius: 9,
backgroundColor: COLORS.brandSoft,
alignItems: 'center',
justifyContent: 'center',
},

alertTitle: {
fontSize: 12.5,
color: COLORS.textPrimary,
fontWeight: '600',
},

alertSub: {
fontSize: 11,
color: COLORS.textMuted,
marginTop: 2,
},

alertBtn: {
borderWidth: 1,
borderColor: COLORS.border,
borderRadius: 9,
paddingHorizontal: 10,
paddingVertical: 7,
},

alertBtnText: {
color: COLORS.textPrimary,
fontSize: 11.5,
fontWeight: '600',
},

chatFab: {
position: 'absolute',
bottom: 20,
right: 18,
backgroundColor: COLORS.brand,
borderRadius: 999,
paddingHorizontal: 16,
paddingVertical: 11,
flexDirection: 'row',
alignItems: 'center',
gap: 7,
shadowColor: COLORS.brand,
shadowOpacity: 0.35,
shadowRadius: 12,
shadowOffset: {
width: 0,
height: 6,
},
elevation: 6,
},

chatFabText: {
color: COLORS.bg,
fontWeight: '700',
fontSize: 12.5,
},
});
