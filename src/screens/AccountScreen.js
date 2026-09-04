import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import { Card, TopBar } from '../components/ui';
import i18n from '../i18n';

import {
  isPlusActive,
  restorePurchases,
} from '../services/subscriptionService';

const LANGUAGES = [
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'sc', label: '🏝️ Sardu' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'pt', label: '🇵🇹 Português' },
];

const ACCOUNT_TRANSLATIONS = {
  it: {
    title: 'Account',
    language: 'Lingua',
    languageDescription: 'Scegli la lingua dell’app.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / mese',
    plusDescription:
      'Ottieni più analisi e funzioni esclusive con TRUTH Plus.',
    upgrade: 'Passa a Plus',
    active: 'Attivo',
    activeMessage: 'TRUTH Plus è attivo.',
    restore: 'Ripristina acquisti',
    purchaseActivated: 'Abbonamento a PLUS attivato',
    restoreNone:
      'Non sono stati trovati acquisti da ripristinare.',
    restoreError:
      'Impossibile ripristinare gli acquisti.',
  },

  en: {
    title: 'Account',
    language: 'Language',
    languageDescription: 'Choose the app language.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / month',
    plusDescription:
      'Get more analyses and exclusive features with TRUTH Plus.',
    upgrade: 'Upgrade to Plus',
    active: 'Active',
    activeMessage: 'TRUTH Plus is active.',
    restore: 'Restore purchases',
    purchaseActivated: 'PLUS subscription activated',
    restoreNone:
      'No purchases were found to restore.',
    restoreError:
      'Unable to restore purchases.',
  },

  sc: {
    title: 'Account',
    language: 'Limba',
    languageDescription: 'Issebera sa limba de s’app.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / mese',
    plusDescription:
      'Otene prus analisis e funtziones esclusivas cun TRUTH Plus.',
    upgrade: 'Pàssa a Plus',
    active: 'Ativu',
    activeMessage: 'TRUTH Plus est ativu.',
    restore: 'Ripristina is acquistos',
    purchaseActivated: 'Abbonamentu a PLUS ativadu',
    restoreNone:
      'Nissunu acquistu est istadu agatadu pro ripristinare.',
    restoreError:
      'No est possìbile ripristinare is acquistos.',
  },

  es: {
    title: 'Cuenta',
    language: 'Idioma',
    languageDescription: 'Elige el idioma de la aplicación.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / mes',
    plusDescription:
      'Obtén más análisis y funciones exclusivas con TRUTH Plus.',
    upgrade: 'Pasar a Plus',
    active: 'Activo',
    activeMessage: 'TRUTH Plus está activo.',
    restore: 'Restaurar compras',
    purchaseActivated: 'Suscripción a PLUS activada',
    restoreNone:
      'No se encontraron compras para restaurar.',
    restoreError:
      'No se pueden restaurar las compras.',
  },

  fr: {
    title: 'Compte',
    language: 'Langue',
    languageDescription: 'Choisissez la langue de l’application.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / mois',
    plusDescription:
      'Obtenez plus d’analyses et de fonctionnalités exclusives avec TRUTH Plus.',
    upgrade: 'Passer à Plus',
    active: 'Actif',
    activeMessage: 'TRUTH Plus est actif.',
    restore: 'Restaurer les achats',
    purchaseActivated: 'Abonnement PLUS activé',
    restoreNone:
      'Aucun achat à restaurer n’a été trouvé.',
    restoreError:
      'Impossible de restaurer les achats.',
  },

  de: {
    title: 'Konto',
    language: 'Sprache',
    languageDescription: 'Wähle die Sprache der App.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / Monat',
    plusDescription:
      'Erhalte mehr Analysen und exklusive Funktionen mit TRUTH Plus.',
    upgrade: 'Auf Plus upgraden',
    active: 'Aktiv',
    activeMessage: 'TRUTH Plus ist aktiv.',
    restore: 'Käufe wiederherstellen',
    purchaseActivated: 'PLUS-Abonnement aktiviert',
    restoreNone:
      'Keine Käufe zum Wiederherstellen gefunden.',
    restoreError:
      'Käufe konnten nicht wiederhergestellt werden.',
  },

  pt: {
    title: 'Conta',
    language: 'Idioma',
    languageDescription: 'Escolha o idioma do aplicativo.',
    plusTitle: 'TRUTH Plus',
    plusPrice: '$9.99 / mês',
    plusDescription:
      'Tenha mais análises e recursos exclusivos com o TRUTH Plus.',
    upgrade: 'Mudar para Plus',
    active: 'Ativo',
    activeMessage: 'O TRUTH Plus está ativo.',
    restore: 'Restaurar compras',
    purchaseActivated: 'Assinatura PLUS ativada',
    restoreNone:
      'Nenhuma compra foi encontrada para restaurar.',
    restoreError:
      'Não foi possível restaurar as compras.',
  },
};

export default function AccountScreen() {
  const { t } = useTranslation();

  const [plusActive, setPlusActive] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || 'it'
  );

  const getAccountText = (key, fallback) => {
    const language =
      i18n.language && ACCOUNT_TRANSLATIONS[i18n.language]
        ? i18n.language
        : 'it';

    return (
      ACCOUNT_TRANSLATIONS[language]?.[key] ||
      fallback
    );
  };

  const translate = (key, fallback) => {
    const value = t(key);

    if (!value || value === key) {
      return fallback;
    }

    return value;
  };

  useEffect(() => {
    let mounted = true;

    const loadSubscriptionStatus = async () => {
      const active = await isPlusActive();

      if (mounted) {
        setPlusActive(active);
      }
    };

    loadSubscriptionStatus();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePurchase = async () => {
    if (purchaseLoading) {
      return;
    }

    setPurchaseLoading(true);

    try {
      setPlusActive(true);

      Alert.alert(
        getAccountText('plusTitle', 'TRUTH Plus'),
        getAccountText(
          'purchaseActivated',
          'Abbonamento a PLUS attivato'
        )
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleRestore = async () => {
    if (purchaseLoading) {
      return;
    }

    setPurchaseLoading(true);

    try {
      const active = await restorePurchases();

      setPlusActive(active);

      if (active) {
        Alert.alert(
          getAccountText('plusTitle', 'TRUTH Plus'),
          getAccountText(
            'activeMessage',
            'TRUTH Plus è attivo.'
          )
        );
      } else {
        Alert.alert(
          getAccountText('plusTitle', 'TRUTH Plus'),
          getAccountText(
            'restoreNone',
            'Non sono stati trovati acquisti da ripristinare.'
          )
        );
      }
    } catch (error) {
      console.error(
        '[AccountScreen] Errore ripristino:',
        error
      );

      Alert.alert(
        getAccountText('plusTitle', 'TRUTH Plus'),
        getAccountText(
          'restoreError',
          'Impossibile ripristinare gli acquisti.'
        )
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const currentLanguage =
    i18n.language && ACCOUNT_TRANSLATIONS[i18n.language]
      ? i18n.language
      : 'it';

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        title={getAccountText('title', 'Account')}
      />

      <View style={{ paddingHorizontal: 18, paddingTop: 6 }}>
        <Card style={styles.languageCard}>
          <Text style={styles.sectionTitle}>
            {getAccountText('language', 'Lingua')}
          </Text>

          <Text style={styles.sectionDescription}>
            {getAccountText(
              'languageDescription',
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
                onPress={() =>
                  changeLanguage(language.code)
                }
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
                  <Text style={styles.checkmark}>
                    ✓
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.plusCard}>
          <View style={styles.plusHeader}>
            <Text style={styles.plusTitle}>
              {getAccountText(
                'plusTitle',
                'TRUTH Plus'
              )}
            </Text>

            {plusActive ? (
              <Text style={styles.activeText}>
                {getAccountText('active', 'Attivo')}
              </Text>
            ) : (
              <Text style={styles.plusPrice}>
                {getAccountText(
                  'plusPrice',
                  '$9.99 / mese'
                )}
              </Text>
            )}
          </View>

          <Text style={styles.plusDesc}>
            {getAccountText(
              'plusDescription',
              'Ottieni più analisi e funzioni esclusive con TRUTH Plus.'
            )}
          </Text>

          {plusActive ? (
            <View style={styles.activeBox}>
              <Text style={styles.activeBoxText}>
                {getAccountText(
                  'activeMessage',
                  'TRUTH Plus è attivo.'
                )}
              </Text>

              <TouchableOpacity
                style={styles.restoreBtn}
                onPress={handleRestore}
                disabled={purchaseLoading}
              >
                {purchaseLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.brand}
                  />
                ) : (
                  <Text style={styles.restoreText}>
                    {getAccountText(
                      'restore',
                      'Ripristina acquisti'
                    )}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={handlePurchase}
                disabled={purchaseLoading}
              >
                {purchaseLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.bg}
                  />
                ) : (
                  <Text style={styles.plusBtnText}>
                    {getAccountText(
                      'upgrade',
                      'Passa a Plus'
                    )}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.restoreBtn}
                onPress={handleRestore}
                disabled={purchaseLoading}
              >
                <Text style={styles.restoreText}>
                  {getAccountText(
                    'restore',
                    'Ripristina acquisti'
                  )}
                </Text>
              </TouchableOpacity>
            </>
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
    minHeight: 42,
    justifyContent: 'center',
  },

  plusBtnText: {
    color: COLORS.bg,
    fontWeight: '700',
    fontSize: 13,
  },

  restoreBtn: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  restoreText: {
    color: COLORS.brand,
    fontWeight: '600',
    fontSize: 12,
  },

  activeBox: {
    marginTop: 12,
  },

  activeBoxText: {
    color: COLORS.brand,
    fontSize: 12,
    fontWeight: '600',
  },
});
