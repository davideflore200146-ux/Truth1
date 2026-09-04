import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_API_KEY_IOS =
process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS ||
process.env.REVENUECAT_IOS_KEY ||
'';

const REVENUECAT_API_KEY_ANDROID =
process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID ||
process.env.REVENUECAT_ANDROID_KEY ||
'';

const ENTITLEMENT_ID = 'truth_plus';

let initialized = false;

function getApiKey() {
if (Platform.OS === 'ios') {
return REVENUECAT_API_KEY_IOS;
}

if (Platform.OS === 'android') {
return REVENUECAT_API_KEY_ANDROID;
}

return '';
}

export async function initializeSubscriptions() {
if (initialized) {
return true;
}

const apiKey = getApiKey();

if (!apiKey) {
console.warn(
'[subscriptionService] Chiave RevenueCat non configurata per questa piattaforma.'
);
return false;
}

try {
Purchases.setLogLevel(Purchases.LOG_LEVEL.INFO);


Purchases.configure({
  apiKey,
});

initialized = true;

console.log(
  '[subscriptionService] RevenueCat inizializzato correttamente.'
);

return true;


} catch (error) {
console.error(
'[subscriptionService] Errore inizializzazione RevenueCat:',
error
);


return false;


}
}

async function ensureInitialized() {
if (initialized) {
return true;
}

return initializeSubscriptions();
}

export async function isPlusActive() {
const ready = await ensureInitialized();

if (!ready) {
return false;
}

try {
const customerInfo = await Purchases.getCustomerInfo();


return Boolean(
  customerInfo?.entitlements?.active?.[ENTITLEMENT_ID]
);


} catch (error) {
console.error(
'[subscriptionService] Errore controllo stato abbonamento:',
error
);


return false;


}
}

export async function getPlusOfferings() {
const ready = await ensureInitialized();

if (!ready) {
return null;
}

try {
const offerings = await Purchases.getOfferings();


const currentOffering =
  offerings?.current ??
  offerings?.all?.default ??
  null;

if (!currentOffering) {
  console.warn(
    '[subscriptionService] Nessun offering RevenueCat disponibile.'
  );
  return null;
}

return currentOffering;


} catch (error) {
console.error(
'[subscriptionService] Errore recupero offerte:',
error
);


return null;


}
}

export async function purchasePlus(packageToPurchase) {
const ready = await ensureInitialized();

if (!ready) {
throw new Error(
'RevenueCat non è configurato per questa build.'
);
}

try {
let pkg = packageToPurchase;


if (!pkg) {
  const offering = await getPlusOfferings();

  pkg =
    offering?.monthly ??
    offering?.availablePackages?.[0] ??
    null;
}

if (!pkg) {
  throw new Error(
    'Nessun pacchetto TRUTH PLUS disponibile al momento.'
  );
}

const result = await Purchases.purchasePackage(pkg);

const customerInfo = result?.customerInfo;

return Boolean(
  customerInfo?.entitlements?.active?.[ENTITLEMENT_ID]
);


} catch (error) {
if (error?.userCancelled) {
return false;
}


console.error(
  '[subscriptionService] Errore durante l’acquisto:',
  error
);

throw error;


}
}

export async function restorePurchases() {
const ready = await ensureInitialized();

if (!ready) {
return false;
}

try {
const customerInfo = await Purchases.restorePurchases();


return Boolean(
  customerInfo?.entitlements?.active?.[ENTITLEMENT_ID]
);


} catch (error) {
console.error(
'[subscriptionService] Errore ripristino acquisti:',
error
);


return false;


}
}
