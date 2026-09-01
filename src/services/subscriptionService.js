import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

// Chiavi RevenueCat (da .env). Se vuote, TRUTH continua a funzionare
// senza abbonamenti (utile in build di test / prima della configurazione
// di Apple/Google in App Store Connect e Play Console).
const REVENUECAT_API_KEY_IOS = process.env.REVENUECAT_API_KEY_IOS || '';
const REVENUECAT_API_KEY_ANDROID = process.env.REVENUECAT_API_KEY_ANDROID || '';

// ID dell'entitlement configurato su RevenueCat per TRUTH PLUS
const ENTITLEMENT_ID = 'truth_plus';

let initialized = false;
let subscriptionsAvailable = false;

/**
 * Inizializza RevenueCat.
 * Per ora, se le chiavi sono vuote, non fa nulla.
 * Questo permette a TRUTH di continuare a funzionare anche
 * prima della configurazione di Apple/Google.
 */
export async function initializeSubscriptions() {
  initialized = true;
  subscriptionsAvailable = false;

  console.log(
    '[subscriptionService] RevenueCat disabilitato nella build di test.'
  );
}

/**
 * Verifica se l'utente ha TRUTH PLUS attivo.
 */
export async function isPlusActive() {
  if (!subscriptionsAvailable) return false;

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined';
  } catch (error) {
    console.error('[subscriptionService] Errore controllo stato abbonamento:', error);
    return false;
  }
}

/**
 * Recupera le offerte disponibili per TRUTH PLUS (piani mensile/annuale).
 */
export async function getPlusOfferings() {
  if (!subscriptionsAvailable) return null;

  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current ?? null;
  } catch (error) {
    console.error('[subscriptionService] Errore recupero offerte:', error);
    return null;
  }
}

/**
 * Avvia l'acquisto di TRUTH PLUS.
 * @param {object} [packageToPurchase] - Il pacchetto scelto (da getPlusOfferings()).
 *   Se omesso, usa il pacchetto disponibile nell'offering corrente.
 */
export async function purchasePlus(packageToPurchase) {
  if (!subscriptionsAvailable) {
    throw new Error('TRUTH PLUS non disponibile nella build di test.');
  }

  try {
    let pkg = packageToPurchase;

    if (!pkg) {
      const offering = await getPlusOfferings();
      pkg = offering?.availablePackages?.[0];
    }

    if (!pkg) {
      throw new Error('Nessun pacchetto TRUTH PLUS disponibile al momento.');
    }

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined';
  } catch (error) {
    if (error.userCancelled) {
      return false;
    }
    console.error('[subscriptionService] Errore durante l\'acquisto:', error);
    throw error;
  }
}

/**
 * Ripristina acquisti precedenti (es. cambio dispositivo, reinstallazione app).
 */
export async function restorePurchases() {
  if (!subscriptionsAvailable) return false;

  try {
    const customerInfo = await Purchases.restorePurchases();
    return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined';
  } catch (error) {
    console.error('[subscriptionService] Errore ripristino acquisti:', error);
    return false;
  }
}