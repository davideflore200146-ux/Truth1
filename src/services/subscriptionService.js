import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

// Quando avremo creato RevenueCat inseriremo qui le chiavi.
// Per ora NON inserire nessuna chiave.
const REVENUECAT_IOS_KEY = 'test_nWSQcTcdINOSkxTHtZzIqqCZGhI';
const REVENUECAT_ANDROID_KEY = 'test_nWSQcTcdINOSkxTHtZzIqqCZGhInpx expo sar';

let initialized = false;

/**
 * Inizializza RevenueCat.
 * Per ora, se le chiavi sono vuote, non fa nulla.
 * Questo permette a TRUTH di continuare a funzionare anche
 * prima della configurazione di Apple/Google.
 */
export async function initializeSubscriptions() {
  if (initialized) return;

  const key = Platform.select({
    ios: REVENUECAT_IOS_KEY,
    android: REVENUECAT_ANDROID_KEY,
  });

  if (!key) {
    console.log('[PLUS] RevenueCat non ancora configurato.');
    return;
  }

  try {
    Purchases.setLogLevel(LOG_LEVEL.WARN);
    await Purchases.configure({ apiKey: key });
    initialized = true;

    console.log('[PLUS] RevenueCat inizializzato.');
  } catch (error) {
    console.error('[PLUS] Errore inizializzazione:', error);
  }
}

/**
 * Controlla se l'utente ha PLUS attivo.
 */
export async function isPlusActive() {
  if (!initialized) return false;

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log(
    '[PLUS] ENTITLEMENTS:',
     customerInfo.entitlements.active
);

    return Boolean(
      customerInfo.entitlements.active?.truth_plus
    );
  } catch (error) {
    console.error('[PLUS] Errore controllo abbonamento:', error);
    return false;
  }
}

/**
 * Recupera le offerte PLUS disponibili.
 */
export async function getPlusOfferings() {
  if (!initialized) return null;

  try {
    const offerings = await Purchases.getOfferings();

    return offerings.current || null;
  } catch (error) {
    console.error('[PLUS] Errore recupero offerte:', error);
    return null;
  }
}

/**
 * Avvia l'acquisto dell'abbonamento PLUS.
 */
export async function purchasePlus() {
  if (!initialized) {
    throw new Error('TRUTH PLUS non è ancora configurato.');
  }

  const offerings = await Purchases.getOfferings();
  const current = offerings.current;

  if (!current || !current.availablePackages?.length) {
    throw new Error('Abbonamento PLUS non disponibile.');
  }

  // Cerchiamo prima un pacchetto mensile.
  const monthly =
    current.monthly ||
    current.availablePackages.find(
      (pkg) => pkg.packageType === 'MONTHLY'
    );

  const packageToBuy = monthly || current.availablePackages[0];

  const result = await Purchases.purchasePackage(packageToBuy);

  return Boolean(
    result.customerInfo.entitlements.active?.truth_plus
  );
}

/**
 * Ripristina eventuali acquisti precedenti.
 */
export async function restorePurchases() {
  if (!initialized) return false;

  try {
    const customerInfo = await Purchases.restorePurchases();

    return Boolean(
      customerInfo.entitlements.active?.truth_plus
    );
  } catch (error) {
    console.error('[PLUS] Errore ripristino acquisti:', error);
    throw error;
  }
}