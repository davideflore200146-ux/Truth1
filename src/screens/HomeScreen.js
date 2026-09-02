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
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const OPTIONS = [
    { key: 'scan', icon: 'camera', label: t('home.scan'), sub: t('home.scanSub') },
    { key: 'screenshot', icon: 'image', label: t('home.screenshot'), sub: t('home.screenshotSub') },
    { key: 'link', icon: 'link', label: t('home.link'), sub: t('home.linkSub') },
    { key: 'search', icon: 'search', label: t('home.search'), sub: t('home.searchSub') },
  ];

  const submit = (value = query) => {
    if (!value.trim()) {
      Alert.alert(
        t('home.emptyTitle'),
        t('home.emptyMessage')
      );
      return;
    }

    onAnalyze(value.trim());
  };

  const handleLink = () => {
    Alert.prompt(
      t('home.linkPromptTitle'),
      t('home.linkPromptMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('home.linkAnalyze'),
          onPress: (text) => {
            if (text && text.trim()) {
              setQuery(text.trim());
              onAnalyze(text.trim());
            }
          },
        },
      ],
      'plain-text',
      query
    );
  };

  const handleScreenshot = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        t('home.photoPermissionTitle'),
        t('home.photoPermissionMessage')
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const imageUri = result.assets[0].uri;

      Alert.alert(
        t('home.screenshotSelectedTitle'),
        t('home.screenshotSelectedMessage')
      );

      console.log('[TRUTH] Screenshot:', imageUri);
    }
  };

  const handleScan = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();

      if (!permission.granted) {
        Alert.alert(
          t('home.cameraPermissionTitle'),
          t('home.cameraPermissionMessage')
        );
        return;
      }
    }

    setShowCamera(true);
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

            if (data) {
              setQuery(data);
              onAnalyze(data);
            }
          }}
        />

        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraTitle}>
            {t('home.cameraTitle')}
          </Text>

          <View style={styles.scanBox} />

          <TouchableOpacity
            style={styles.closeCamera}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.closeCameraText}>{t('common.close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>{t('app.name')}</Text>
        <Text style={styles.tagline}>{t('app.tagline')}</Text>
      </View>

      <Text style={styles.question}>{t('home.title')}</Text>

      <View style={styles.grid}>
        {OPTIONS.map((o) => (
          <Card
            key={o.key}
            onPress={() => handleOptionPress(o)}
            style={styles.optionCard}
          >
            <View style={styles.optionIcon}>
              <Feather
                name={o.icon}
                size={18}
                color={COLORS.brand}
              />
            </View>

            <Text style={styles.optionLabel}>{o.label}</Text>
            <Text style={styles.optionSub}>{o.sub}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => submit()}
          placeholder={t('home.searchPlaceholder')}
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          returnKeyType="search"
        />

        <TouchableOpacity
          onPress={() => submit()}
          style={styles.searchBtn}
        >
          <Feather
            name="search"
            size={15}
            color={COLORS.bg}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>
        {t('home.footerNote')}
      </Text>
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

  tagline: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
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

  optionSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
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

  footerNote: {
    marginTop: 'auto',
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 11,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
