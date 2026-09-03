import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import { Card, TopBar } from '../components/ui';
import i18n from '../i18n';

const LANGUAGES = [
{ code: 'it', label: '🇮🇹 Italiano' },
{ code: 'en', label: '🇬🇧 English' },
{ code: 'sc', label: '🏝️ Sardu (LSC)' },
{ code: 'es', label: '🇪🇸 Español' },
{ code: 'fr', label: '🇫🇷 Français' },
{ code: 'de', label: '🇩🇪 Deutsch' },
{ code: 'pt', label: '🇵🇹 Português' },
];

export default function AccountScreen() {
const { t } = useTranslation();

const [plusActive, setPlusActive] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState(
i18n.language || 'it'
);

const translate = (key, fallback) => {
const value = t(key);


if (!value || value === key) {
  return fallback;
}

return value;


};

const handlePurchase = () => {
Alert.alert(
translate('account.purchaseTitle', 'TRUTH Plus'),
translate(
'account.purchaseMessage',
'La funzione di acquisto sarà disponibile prossimamente.'
)
);
};

const changeLanguage = (language) => {
i18n.changeLanguage(language);
setSelectedLanguage(language);
};

return (
<View style={{ flex: 1 }}>
<TopBar title={translate('account.title', 'Account')} />


  <View style={{ paddingHorizontal: 18, paddingTop: 6 }}>
    <Card style={styles.languageCard}>
      <Text style={styles.sectionTitle}>
        {translate('account.language', 'Lingua')}
      </Text>

      <Text style={styles.sectionDescription}>
        {translate(
          'account.languageDescription',
          'Scegli la lingua dell’app.'
        )}
      </Text>

      <View style={styles.languageList}>
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              selectedLanguage === language.code &&
                styles.languageButtonActive,
            ]}
            onPress={() => changeLanguage(language.code)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language.code &&
                  styles.languageTextActive,
              ]}
            >
              {language.label}
            </Text>

            {selectedLanguage === language.code && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>

    <Card style={styles.plusCard}>
      <View style={styles.plusHeader}>
        <Text style={styles.plusTitle}>
          {translate('account.purchaseTitle', 'TRUTH Plus')}
        </Text>

        {plusActive ? (
          <Text style={styles.activeText}>
            {translate('account.active', 'Attivo')}
          </Text>
        ) : (
          <Text style={styles.plusPrice}>
            {translate('premium.monthly', 'Mensile')}
          </Text>
        )}
      </View>

      <Text style={styles.plusDesc}>
        {translate(
          'account.description',
          'Ottieni più analisi e funzioni esclusive con TRUTH Plus.'
        )}
      </Text>

      {plusActive ? (
        <View style={styles.activeBox}>
          <Text style={styles.activeBoxText}>
            {translate(
              'account.activeMessage',
              'TRUTH Plus è attivo.'
            )}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.plusBtn}
          onPress={handlePurchase}
        >
          <Text style={styles.plusBtnText}>
            {translate('account.upgrade', 'Passa a Plus')}
          </Text>
        </TouchableOpacity>
      )}
    </Card>
  </View>
</View>


);
}

const styles = StyleSheet.create({
languageCard: {
marginBottom: 12,
},

sectionTitle: {
fontWeight: '700',
fontSize: 15,
color: COLORS.textPrimary,
},

sectionDescription: {
fontSize: 12,
color: COLORS.textSecondary,
marginTop: 5,
marginBottom: 10,
},

languageList: {
gap: 7,
},

languageButton: {
minHeight: 42,
borderRadius: 10,
paddingHorizontal: 12,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
borderWidth: 1,
borderColor: COLORS.border,
},

languageButtonActive: {
borderColor: COLORS.brand,
},

languageText: {
fontSize: 13,
color: COLORS.textPrimary,
},

languageTextActive: {
color: COLORS.brand,
fontWeight: '700',
},

checkmark: {
color: COLORS.brand,
fontSize: 16,
fontWeight: '700',
},

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
