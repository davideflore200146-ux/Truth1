import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import { Card } from '../components/ui';

export default function HomeScreen({ onAnalyze }) {
  const { t, ready } = useTranslation();

  const [query, setQuery] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  // Evita che una chiave i18n come "home.title" venga mostrata
  // durante il breve periodo di inizializzazione delle traduzioni.
  const tr = (key, fallback) => {
    if (!ready) {
      return fallback;
    }

    const translated = t(key);

    if (!translated || translated === key) {
      return fallback;
    }

    return translated;
  };

  const OPTIONS = [
    {
      key: 'scan',
      icon: 'camera',
      label: tr('home.scan', 'Scansiona'),
    },
    {
      key: 'screenshot',
      icon: 'image',
      label: tr('home.screenshot', 'Screenshot'),
    },
    {
      key: 'link',
      icon: 'link',
      label: tr('home.link', 'Link'),
    },
    {
      key: 'search',
      icon: 'search',
      label: tr('home.search', 'Cerca'),
    },
  ];

  const submit = (value = query) => {
    const cleanValue = typeof value === 'string'
      ? value.trim()
      : '';

    if (!cleanValue) {
      Alert.alert(
        tr('home.emptyTitle', 'Cosa vuoi verificare?'),
        tr(
          'home.emptyMessage',
          'Scrivi il nome di un prodotto o incolla un link qui sotto, poi premi cerca.'
        )
      );
      return;
    }

    onAnalyze(cleanValue);
  };

  const handleLink = () => {
    if (typeof Alert.prompt !== 'function') {
      Alert.alert(
        tr('home.linkPromptTitle', 'Inserisci il link'),
        tr(
          'home.linkPromptMessage',
          'Incolla qui il link del prodotto che vuoi verificare.'
        )
      );
      return;
    }

    Alert.prompt(
      tr('home.linkPromptTitle', 'Inserisci il link'),
      tr(
        'home.linkPromptMessage',
        'Incolla qui il link del prodotto che vuoi verificare.'
      ),
      [
        {
          text: tr('common.cancel', 'Annulla'),
          style: 'cancel',
        },
        {
          text: tr('home.linkAnalyze', 'Analizza'),
          onPress: (text) => {
            if (text && text.trim()) {
              const cleanLink = text.trim();

              setQuery(cleanLink);
              onAnalyze(cleanLink);
            }
          },
        },
      ],
      'plain-text',
      query
    );
  };

  const handleScreenshot = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          tr('home.photoPermissionTitle', 'Permesso necessario'),
          tr(
            'home.photoPermissionMessage',
            'Per caricare uno screenshot devi consentire a TRUTH di accedere alle tue foto.'
          )
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: false,
          quality: 1,
        });

      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
      ) {
        const imageUri = result.assets[0].uri;

        Alert.alert(
          tr(
            'home.screenshotSelectedTitle',
            'Screenshot selezionato'
          ),
          tr(
            'home.screenshotSelectedMessage',
            "Lo screenshot è stato caricato."
          )
        );

        console.log('[TRUTH] Screenshot:', imageUri);
      }
    } catch (error) {
      console.error(
        '[TRUTH] Errore selezione screenshot:',
        error
      );

      Alert.alert(
        tr('common.error', 'Si è verificato un errore'),
        tr(
          'home.photoPermissionMessage',
          'Non è stato possibile selezionare lo screenshot.'
        )
      );
    }
  };

  const handleScan = async () => {
    try {
      if (!cameraPermission?.granted) {
        const permission =
          await requestCameraPermission();

        if (!permission?.granted) {
          Alert.alert(
            tr(
              'home.cameraPermissionTitle',
              'Fotocamera necessaria'
            ),
            tr(
              'home.cameraPermissionMessage',
              'Per usare Scansiona devi consentire a TRUTH di usare la fotocamera.'
            )
          );

          return;
        }
      }

      setShowCamera(true);
    } catch (error) {
      console.error(
        '[TRUTH] Errore permesso fotocamera:',
        error
      );

      Alert.alert(
        tr('common.error', 'Si è verificato un errore'),
        tr(
          'home.cameraPermissionMessage',
          'Non è stato possibile attivare la fotocamera.'
        )
      );
    }
  };

  const handleOptionPress = (option) => {
    if (option.key === 'scan') {
      handleScan();
      return;
    }

    if (option.key === 'screenshot') {
      handleScreenshot();
      return;
    }

    if (option.key === 'link') {
      handleLink();
      return;
    }

    if (option.key === 'search') {
      submit();
    }
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={({ data }) => {
            setShowCamera(false);

            if (data && typeof data === 'string') {
              const cleanData = data.trim();

              if (cleanData) {
                setQuery(cleanData);
                onAnalyze(cleanData);
              }
            }
          }}
        />

        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraTitle}>
            {tr(
              'home.cameraTitle',
              'Inquadra il QR code del prodotto'
            )}
          </Text>

          <View style={styles.scanBox} />

          <TouchableOpacity
            style={styles.closeCamera}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.closeCameraText}>
              {tr('common.close', 'Chiudi')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          TRUTH
        </Text>
      </View>

      <Text style={styles.question}>
        {tr(
          'home.title',
          'Cosa vuoi verificare?'
        )}
      </Text>

      <View style={styles.grid}>
        {OPTIONS.map((option) => (
          <Card
            key={option.key}
            onPress={() => handleOptionPress(option)}
            style={styles.optionCard}
          >
            <View style={styles.optionIcon}>
              <Feather
                name={option.icon}
                size={18}
                color={COLORS.brand}
              />
            </View>

            <Text style={styles.optionLabel}>
              {option.label}
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => submit()}
          placeholder={tr(
            'home.searchPlaceholder',
            'Es. Sony WH-1000XM6, o incolla un link…'
          )}
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={() => submit()}
          style={styles.searchBtn}
          activeOpacity={0.8}
        >
          <Feather
            name="search"
            size={15}
            color={COLORS.bg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 36,
  },

  header: {
    alignItems: 'center',
    marginBottom: 36,
  },

  logo: {
    fontWeight: '700',
    fontSize: 32,
    letterSpacing: -1,
    color: COLORS.textPrimary,
  },

  question: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  optionCard: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'flex-start',
  },

  optionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  optionLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  searchWrap: {
    marginTop: 12,
    position: 'relative',
    justifyContent: 'center',
  },

  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 13,
    paddingLeft: 14,
    paddingRight: 44,
    color: COLORS.textPrimary,
    fontSize: 13,
  },

  searchBtn: {
    position: 'absolute',
    right: 6,
    backgroundColor: COLORS.brand,
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  cameraOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  cameraTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },

  closeCamera: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
  },

  closeCameraText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
});
