/**
 * TRUTH — Configurazione internazionalizzazione (i18n)
 * -----------------------------------------------------
 * Libreria: i18next + react-i18next (React Native)
 *
 * Lingue incluse: it, en, es, fr, de, pt, sc
 * Sardo: Limba Sarda Comuna (LSC)
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  it: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: 'Non trovare solo il prezzo. Trova la verità.',
      },

      home: {
        title: 'Cosa vuoi verificare?',
        scan: 'Scansiona',
        scanSub: 'Usa la fotocamera',
        screenshot: 'Screenshot',
        screenshotSub: "Carica un'immagine",
        link: 'Link',
        linkSub: 'Incolla un URL',
        search: 'Cerca',
        searchSub: 'Scrivi il nome',
        searchPlaceholder: 'Es. Sony WH-1000XM6, o incolla un link…',
        footerNote: "L'analisi usa ricerca web reale: può richiedere qualche secondo.",
        emptyTitle: 'Cosa vuoi verificare?',
        emptyMessage: 'Scrivi il nome di un prodotto o incolla un link qui sotto, poi premi cerca.',
        linkPromptTitle: 'Inserisci il link',
        linkPromptMessage: 'Incolla qui il link del prodotto che vuoi verificare.',
        linkAnalyze: 'Analizza',
        photoPermissionTitle: 'Permesso necessario',
        photoPermissionMessage: 'Per caricare uno screenshot devi consentire a TRUTH di accedere alle tue foto.',
        screenshotSelectedTitle: 'Screenshot selezionato',
        screenshotSelectedMessage: "Lo screenshot è stato caricato. L'analisi delle immagini verrà collegata al motore TRUTH.",
        cameraPermissionTitle: 'Fotocamera necessaria',
        cameraPermissionMessage: 'Per usare Scansiona devi consentire a TRUTH di usare la fotocamera.',
        cameraTitle: 'Inquadra il QR code del prodotto',
      },

      analyzing: {
        message1: 'Analisi del prodotto in corso...',
        message2: 'Controllo del prezzo attuale...',
        message3: 'Confronto con i prezzi precedenti...',
        message4: 'Valutazione del prezzo reale...',
        message5: 'Preparazione del risultato...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prezzo attuale',
        fairPrice: 'Prezzo giusto',
        potentialSaving: 'Risparmio potenziale',
        savings: 'Risparmio',
        upTo: 'Fino a',
        explanation: 'Spiegazione',
        why: 'Perché',
        priceTrend: 'Andamento prezzo',
        noPriceHistory: 'Nessuno storico prezzo disponibile.',
        alternatives: 'Alternative',
        userReviews: 'Recensioni utenti',
        truthCheck: 'Truth Check',
        bestOffers: 'Migliori offerte',
        shipping: 'Spedizione',
        go: 'Vai',
        priceAlert: 'Avviso di prezzo',
        alertMeAt: 'Avvisami a €{{price}}',
        alertDescription: 'TRUTH ti avviserà quando il prezzo raggiunge questo livello.',
        activate: 'Attiva',
        askTruth: 'Chiedi a TRUTH',
      },

      verdict: {
        buy: 'Compra',
        wait: 'Aspetta',
        avoid: 'Non conviene',
      },

      sections: {
        fairPrice: 'Prezzo giusto',
        priceHistory: 'Storico prezzo',
        smartComparison: 'Confronto intelligente',
        reviewAnalysis: 'Analisi recensioni',
        truthCheck: 'Truth Check',
        bestDeals: 'Migliori offerte',
        alternatives: 'Alternative',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Prezzo gonfiato',
        differentVersion: 'Versione diversa',
        refurbished: 'Prodotto ricondizionato',
      },

      wishlist: {
        title: 'I miei prodotti',
        addAlert: 'Aggiungi avviso prezzo',
        targetPrice: 'Prezzo obiettivo',
      },

      history: {
        title: 'Le mie analisi',
      },

      chat: {
        title: 'Chiedi a TRUTH',
        placeholder: 'Fai una domanda su questo prodotto…',
      },

      forMe: {
        title: 'Per me',
        budget: 'Budget',
        priorities: 'Priorità',
        preferredBrand: 'Marca preferita',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '5,99 €/mese',
        yearly: '49,99 €/anno',
        unlimitedAnalyses: 'Analisi illimitate',
        fullHistory: 'Storico completo',
        priceAlerts: 'Avvisi di prezzo',
        personalizedAI: 'AI personalizzata',
      },

      account: {
        title: 'Account',
        login: 'Accedi',
        logout: 'Esci',
        settings: 'Impostazioni',
        language: 'Lingua',
        languageDescription: 'Scegli la lingua dell’app.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / mese',
        plusDescription: 'Ottieni più analisi e funzioni esclusive con TRUTH Plus.',
        upgrade: 'Passa a Plus',
        active: 'Attivo',
        activeMessage: 'TRUTH Plus è attivo.',
        restore: 'Ripristina acquisti',
        purchaseActivated: 'Abbonamento a PLUS attivato',
        restoreNone: 'Non sono stati trovati acquisti da ripristinare.',
        restoreError: 'Impossibile ripristinare gli acquisti.',
      },

      privacy: {
        title: 'Privacy',
        description: 'Qui puoi vedere cosa raccogliamo, cosa salviamo e cosa eliminiamo.',
      },

      common: {
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva',
        delete: 'Elimina',
        loading: 'Caricamento…',
        error: 'Si è verificato un errore',
        tryAgain: 'Riprova',
        close: 'Chiudi',
      },
    },
  },

  en: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: "Don't just find the price. Find the truth.",
      },

      home: {
        title: 'What do you want to analyze?',
        scan: 'Scan',
        scanSub: 'Use the camera',
        screenshot: 'Screenshot',
        screenshotSub: 'Upload an image',
        link: 'Link',
        linkSub: 'Paste a URL',
        search: 'Search',
        searchSub: 'Type the name',
        searchPlaceholder: 'E.g. Sony WH-1000XM6, or paste a link…',
        footerNote: 'Analysis uses real web search: it may take a few seconds.',
        emptyTitle: 'What do you want to check?',
        emptyMessage: 'Type a product name or paste a link below, then press search.',
        linkPromptTitle: 'Enter the link',
        linkPromptMessage: 'Paste the link of the product you want to check.',
        linkAnalyze: 'Analyze',
        photoPermissionTitle: 'Permission needed',
        photoPermissionMessage: 'To upload a screenshot, allow TRUTH to access your photos.',
        screenshotSelectedTitle: 'Screenshot selected',
        screenshotSelectedMessage: 'The screenshot has been uploaded. Image analysis will be connected to the TRUTH engine.',
        cameraPermissionTitle: 'Camera needed',
        cameraPermissionMessage: 'To use Scan, allow TRUTH to use the camera.',
        cameraTitle: 'Frame the product QR code',
      },

      analyzing: {
        message1: 'Analyzing the product...',
        message2: 'Checking the current price...',
        message3: 'Comparing with previous prices...',
        message4: 'Evaluating the real price...',
        message5: 'Preparing the result...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Current price',
        fairPrice: 'Fair price',
        potentialSaving: 'Potential saving',
        savings: 'Savings',
        upTo: 'Up to',
        explanation: 'Explanation',
        why: 'Why',
        priceTrend: 'Price trend',
        noPriceHistory: 'No price history available.',
        alternatives: 'Alternatives',
        userReviews: 'User reviews',
        truthCheck: 'Truth Check',
        bestOffers: 'Best offers',
        shipping: 'Shipping',
        go: 'Go',
        priceAlert: 'Price alert',
        alertMeAt: 'Alert me at €{{price}}',
        alertDescription: 'TRUTH will notify you when the price reaches this level.',
        activate: 'Activate',
        askTruth: 'Ask TRUTH',
      },

      verdict: {
        buy: 'Buy',
        wait: 'Wait',
        avoid: "Don't buy",
      },

      sections: {
        fairPrice: 'Fair price',
        priceHistory: 'Price history',
        smartComparison: 'Smart comparison',
        reviewAnalysis: 'Review analysis',
        truthCheck: 'Truth Check',
        bestDeals: 'Best deals',
        alternatives: 'Alternatives',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Inflated price',
        differentVersion: 'Different version',
        refurbished: 'Refurbished product',
      },

      wishlist: {
        title: 'My products',
        addAlert: 'Add price alert',
        targetPrice: 'Target price',
      },

      history: {
        title: 'My analyses',
      },

      chat: {
        title: 'Ask TRUTH',
        placeholder: 'Ask a question about this product…',
      },

      forMe: {
        title: 'For me',
        budget: 'Budget',
        priorities: 'Priorities',
        preferredBrand: 'Preferred brand',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '$5.99/month',
        yearly: '$49.99/year',
        unlimitedAnalyses: 'Unlimited analyses',
        fullHistory: 'Full history',
        priceAlerts: 'Price alerts',
        personalizedAI: 'Personalized AI',
      },

      account: {
        title: 'Account',
        login: 'Log in',
        logout: 'Log out',
        settings: 'Settings',
        language: 'Language',
        languageDescription: 'Choose the app language.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / month',
        plusDescription: 'Get more analyses and exclusive features with TRUTH Plus.',
        upgrade: 'Upgrade to Plus',
        active: 'Active',
        activeMessage: 'TRUTH Plus is active.',
        restore: 'Restore purchases',
        purchaseActivated: 'PLUS subscription activated',
        restoreNone: 'No purchases were found to restore.',
        restoreError: 'Unable to restore purchases.',
      },

      privacy: {
        title: 'Privacy',
        description: 'See what we collect, what we store, and what we delete.',
      },

      common: {
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        loading: 'Loading…',
        error: 'Something went wrong',
        tryAgain: 'Try again',
        close: 'Close',
      },
    },
  },

  sc: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Ischi prima de comporare.',
        subtagline: 'No agatare isceti su prètziu. Agata sa beridade.',
      },

      home: {
        title: 'Ite boles verificare?',
        scan: 'Iscansiona',
        scanSub: 'Imprea sa fotocàmera',
        screenshot: 'Iscreenshot',
        screenshotSub: 'Carriga un\'immàgine',
        link: 'Ligàmene',
        linkSub: 'Incolla un URL',
        search: 'Chirca',
        searchSub: 'Iscrie su nòmene',
        searchPlaceholder: 'Es. Sony WH-1000XM6, o incolla unu ligàmene…',
        footerNote: 'S\'analisi imprea chirca web reale: podet pedire cale segundu.',
        emptyTitle: 'Ite boles verificare?',
        emptyMessage: 'Iscrie su nòmene de unu prodùtu o incolla unu ligàmene inoghe suta, a pustis pigia chirca.',
        linkPromptTitle: 'Inserta su ligàmene',
        linkPromptMessage: 'Incolla inoghe su ligàmene de su prodùtu chi boles verificare.',
        linkAnalyze: 'Analizza',
        photoPermissionTitle: 'Permissu netzessàriu',
        photoPermissionMessage: 'Pro carrigare unu screenshot depes permìtere a TRUTH de intrare in is fotos tuas.',
        screenshotSelectedTitle: 'Screenshot seletzionadu',
        screenshotSelectedMessage: 'Su screenshot est istadu carrigadu. S\'analisi de is immàgines at a essere collegada a su motore TRUTH.',
        cameraPermissionTitle: 'Fotocàmera netzessària',
        cameraPermissionMessage: 'Pro impreare Iscansiona depes permìtere a TRUTH de impreare sa fotocàmera.',
        cameraTitle: 'Inquadra su QR code de su prodùtu',
      },

      analyzing: {
        message1: 'Analisi de su prodùtu in cursu...',
        message2: 'Controllu de su prètziu de oe...',
        message3: 'Cunfrontu cun is prètzios de prima...',
        message4: 'Valutatzione de su prètziu reale...',
        message5: 'Preparatzione de su resurtadu...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prètziu de oe',
        fairPrice: 'Prètziu giustu',
        potentialSaving: 'Sparàgniu possìbile',
        savings: 'Sparàgniu',
        upTo: 'Fintzas a',
        explanation: 'Ispiegatzione',
        why: 'Proite',
        priceTrend: 'Andamentu de su prètziu',
        noPriceHistory: 'Nissuna istòria de prètziu disponìbile.',
        alternatives: 'Alternativas',
        userReviews: 'Recensiones de is utentes',
        truthCheck: 'Truth Check',
        bestOffers: 'Is ofertas mègius',
        shipping: 'Ispeditzione',
        go: 'Bai',
        priceAlert: 'Alerta de prètziu',
        alertMeAt: 'Avisamì a €{{price}}',
        alertDescription: 'TRUTH at a avisare candu su prètziu lompet a custu livellu.',
        activate: 'Ativa',
        askTruth: 'Preguntai a TRUTH',
      },

      verdict: {
        buy: 'Còmpora',
        wait: 'Abbetta',
        avoid: 'No cumbenit',
      },

      sections: {
        fairPrice: 'Prètziu giustu',
        priceHistory: 'Istòria de su prètziu',
        smartComparison: 'Cunfrontu intelligente',
        reviewAnalysis: 'Analisi de is recensiones',
        truthCheck: 'Truth Check',
        bestDeals: 'Is ofertas mègius',
        alternatives: 'Alternativas',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Prètziu prus artu de su normale',
        differentVersion: 'Versione diferente',
        refurbished: 'Prodùtu riacontzadu',
      },

      wishlist: {
        title: 'Is prodùtos meos',
        addAlert: 'Agiunghe alerta de prètziu',
        targetPrice: 'Prètziu obietivu',
      },

      history: {
        title: 'Is analisis meas',
      },

      chat: {
        title: 'Preguntai a TRUTH',
        placeholder: 'Fai una pregunta subra de custu prodùtu…',
      },

      forMe: {
        title: 'Pro mene',
        budget: 'Budget',
        priorities: 'Prioridades',
        preferredBrand: 'Marca preferida',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '5,99 €/mese',
        yearly: '49,99 €/annu',
        unlimitedAnalyses: 'Analisis chena lìmite',
        fullHistory: 'Istòria intrea',
        priceAlerts: 'Alertas de prètziu',
        personalizedAI: 'AI personalizada',
      },

      account: {
        title: 'Account',
        login: 'Intra',
        logout: 'Essi',
        settings: 'Cunfiguratziones',
        language: 'Limba',
        languageDescription: 'Issebera sa limba de s’app.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / mese',
        plusDescription: 'Otene prus analisis e funtziones esclusivas cun TRUTH Plus.',
        upgrade: 'Pàssa a Plus',
        active: 'Ativu',
        activeMessage: 'TRUTH Plus est ativu.',
        restore: 'Ripristina is acquistos',
        purchaseActivated: 'Abbonamentu a PLUS ativadu',
        restoreNone: 'Nissunu acquistu est istadu agatadu pro ripristinare.',
        restoreError: 'No est possìbile ripristinare is acquistos.',
      },

      privacy: {
        title: 'Privatesa',
        description: 'Inoghe podes bìdere ite regollimus, ite sarvamus e ite cantzellamus.',
      },

      common: {
        cancel: 'Annulla',
        confirm: 'Cunfirma',
        save: 'Sarva',
        delete: 'Cantzella',
        loading: 'Carrighende…',
        error: "B'est istadu un'errore",
        tryAgain: 'Torra a proare',
        close: 'Serra',
      },
    },
  },

  es: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: 'No busques solo el precio. Encuentra la verdad.',
      },

      home: {
        title: '¿Qué quieres analizar?',
        scan: 'Escanear',
        scanSub: 'Usa la cámara',
        screenshot: 'Captura',
        screenshotSub: 'Sube una imagen',
        link: 'Enlace',
        linkSub: 'Pega una URL',
        search: 'Buscar',
        searchSub: 'Escribe el nombre',
        searchPlaceholder: 'Ej. Sony WH-1000XM6, o pega un enlace…',
        footerNote: 'El análisis usa búsqueda web real: puede tardar unos segundos.',
        emptyTitle: '¿Qué quieres verificar?',
        emptyMessage: 'Escribe el nombre de un producto o pega un enlace abajo, luego pulsa buscar.',
        linkPromptTitle: 'Introduce el enlace',
        linkPromptMessage: 'Pega aquí el enlace del producto que quieres verificar.',
        linkAnalyze: 'Analizar',
        photoPermissionTitle: 'Permiso necesario',
        photoPermissionMessage: 'Para subir una captura debes permitir que TRUTH acceda a tus fotos.',
        screenshotSelectedTitle: 'Captura seleccionada',
        screenshotSelectedMessage: 'La captura se ha subido. El análisis de imágenes se conectará al motor TRUTH.',
        cameraPermissionTitle: 'Cámara necesaria',
        cameraPermissionMessage: 'Para usar Escanear debes permitir que TRUTH use la cámara.',
        cameraTitle: 'Encuadra el código QR del producto',
      },

      analyzing: {
        message1: 'Analizando el producto...',
        message2: 'Comprobando el precio actual...',
        message3: 'Comparando con precios anteriores...',
        message4: 'Evaluando el precio real...',
        message5: 'Preparando el resultado...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Precio actual',
        fairPrice: 'Precio justo',
        potentialSaving: 'Ahorro potencial',
        savings: 'Ahorro',
        upTo: 'Hasta',
        explanation: 'Explicación',
        why: 'Por qué',
        priceTrend: 'Tendencia de precio',
        noPriceHistory: 'No hay historial de precio disponible.',
        alternatives: 'Alternativas',
        userReviews: 'Reseñas de usuarios',
        truthCheck: 'Truth Check',
        bestOffers: 'Mejores ofertas',
        shipping: 'Envío',
        go: 'Ir',
        priceAlert: 'Alerta de precio',
        alertMeAt: 'Avísame a €{{price}}',
        alertDescription: 'TRUTH te avisará cuando el precio alcance este nivel.',
        activate: 'Activar',
        askTruth: 'Pregunta a TRUTH',
      },

      verdict: {
        buy: 'Compra',
        wait: 'Espera',
        avoid: 'No conviene',
      },

      sections: {
        fairPrice: 'Precio justo',
        priceHistory: 'Historial de precio',
        smartComparison: 'Comparación inteligente',
        reviewAnalysis: 'Análisis de reseñas',
        truthCheck: 'Truth Check',
        bestDeals: 'Mejores ofertas',
        alternatives: 'Alternativas',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Precio inflado',
        differentVersion: 'Versión diferente',
        refurbished: 'Producto reacondicionado',
      },

      wishlist: {
        title: 'Mis productos',
        addAlert: 'Añadir alerta de precio',
        targetPrice: 'Precio objetivo',
      },

      history: {
        title: 'Mis análisis',
      },

      chat: {
        title: 'Pregunta a TRUTH',
        placeholder: 'Haz una pregunta sobre este producto…',
      },

      forMe: {
        title: 'Para mí',
        budget: 'Presupuesto',
        priorities: 'Prioridades',
        preferredBrand: 'Marca preferida',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '5,99 €/mes',
        yearly: '49,99 €/año',
        unlimitedAnalyses: 'Análisis ilimitados',
        fullHistory: 'Historial completo',
        priceAlerts: 'Alertas de precio',
        personalizedAI: 'IA personalizada',
      },

      account: {
        title: 'Cuenta',
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        settings: 'Ajustes',
        language: 'Idioma',
        languageDescription: 'Elige el idioma de la aplicación.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / mes',
        plusDescription: 'Obtén más análisis y funciones exclusivas con TRUTH Plus.',
        upgrade: 'Pasar a Plus',
        active: 'Activo',
        activeMessage: 'TRUTH Plus está activo.',
        restore: 'Restaurar compras',
        purchaseActivated: 'Suscripción a PLUS activada',
        restoreNone: 'No se encontraron compras para restaurar.',
        restoreError: 'No se pueden restaurar las compras.',
      },

      privacy: {
        title: 'Privacidad',
        description: 'Aquí puedes ver qué recopilamos, qué guardamos y qué eliminamos.',
      },

      common: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        delete: 'Eliminar',
        loading: 'Cargando…',
        error: 'Ha ocurrido un error',
        tryAgain: 'Reintentar',
        close: 'Cerrar',
      },
    },
  },

  fr: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: 'Ne trouvez pas seulement le prix. Trouvez la vérité.',
      },

      home: {
        title: 'Que voulez-vous analyser ?',
        scan: 'Scanner',
        scanSub: 'Utiliser la caméra',
        screenshot: 'Capture d\'écran',
        screenshotSub: 'Importer une image',
        link: 'Lien',
        linkSub: 'Coller une URL',
        search: 'Rechercher',
        searchSub: 'Écrivez le nom',
        searchPlaceholder: 'Ex. Sony WH-1000XM6, ou collez un lien…',
        footerNote: "L'analyse utilise une recherche web réelle : cela peut prendre quelques secondes.",
        emptyTitle: 'Que voulez-vous vérifier ?',
        emptyMessage: "Écrivez le nom d'un produit ou collez un lien ci-dessous, puis appuyez sur rechercher.",
        linkPromptTitle: 'Entrez le lien',
        linkPromptMessage: 'Collez ici le lien du produit que vous voulez vérifier.',
        linkAnalyze: 'Analyser',
        photoPermissionTitle: 'Autorisation requise',
        photoPermissionMessage: "Pour importer une capture d'écran, autorisez TRUTH à accéder à vos photos.",
        screenshotSelectedTitle: "Capture d'écran sélectionnée",
        screenshotSelectedMessage: "La capture d'écran a été importée. L'analyse d'image sera connectée au moteur TRUTH.",
        cameraPermissionTitle: 'Caméra requise',
        cameraPermissionMessage: 'Pour utiliser Scanner, autorisez TRUTH à utiliser la caméra.',
        cameraTitle: 'Cadrez le QR code du produit',
      },

      analyzing: {
        message1: 'Analyse du produit en cours...',
        message2: 'Vérification du prix actuel...',
        message3: 'Comparaison avec les prix précédents...',
        message4: 'Évaluation du prix réel...',
        message5: 'Préparation du résultat...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prix actuel',
        fairPrice: 'Prix juste',
        potentialSaving: 'Économie potentielle',
        savings: 'Économie',
        upTo: "Jusqu'à",
        explanation: 'Explication',
        why: 'Pourquoi',
        priceTrend: 'Tendance des prix',
        noPriceHistory: 'Aucun historique de prix disponible.',
        alternatives: 'Alternatives',
        userReviews: 'Avis des utilisateurs',
        truthCheck: 'Truth Check',
        bestOffers: 'Meilleures offres',
        shipping: 'Livraison',
        go: 'Aller',
        priceAlert: 'Alerte de prix',
        alertMeAt: 'Alertez-moi à €{{price}}',
        alertDescription: 'TRUTH vous préviendra lorsque le prix atteindra ce niveau.',
        activate: 'Activer',
        askTruth: 'Demander à TRUTH',
      },

      verdict: {
        buy: 'Achetez',
        wait: 'Attendez',
        avoid: "N'achetez pas",
      },

      sections: {
        fairPrice: 'Prix juste',
        priceHistory: 'Historique des prix',
        smartComparison: 'Comparaison intelligente',
        reviewAnalysis: 'Analyse des avis',
        truthCheck: 'Truth Check',
        bestDeals: 'Meilleures offres',
        alternatives: 'Alternatives',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Prix gonflé',
        differentVersion: 'Version différente',
        refurbished: 'Produit reconditionné',
      },

      wishlist: {
        title: 'Mes produits',
        addAlert: 'Ajouter une alerte de prix',
        targetPrice: 'Prix cible',
      },

      history: {
        title: 'Mes analyses',
      },

      chat: {
        title: 'Demander à TRUTH',
        placeholder: 'Posez une question sur ce produit…',
      },

      forMe: {
        title: 'Pour moi',
        budget: 'Budget',
        priorities: 'Priorités',
        preferredBrand: 'Marque préférée',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '5,99 €/mois',
        yearly: '49,99 €/an',
        unlimitedAnalyses: 'Analyses illimitées',
        fullHistory: 'Historique complet',
        priceAlerts: 'Alertes de prix',
        personalizedAI: 'IA personnalisée',
      },

      account: {
        title: 'Compte',
        login: 'Connexion',
        logout: 'Déconnexion',
        settings: 'Paramètres',
        language: 'Langue',
        languageDescription: 'Choisissez la langue de l’application.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / mois',
        plusDescription: 'Obtenez plus d’analyses et de fonctionnalités exclusives avec TRUTH Plus.',
        upgrade: 'Passer à Plus',
        active: 'Actif',
        activeMessage: 'TRUTH Plus est actif.',
        restore: 'Restaurer les achats',
        purchaseActivated: 'Abonnement PLUS activé',
        restoreNone: 'Aucun achat à restaurer n’a été trouvé.',
        restoreError: 'Impossible de restaurer les achats.',
      },

      privacy: {
        title: 'Confidentialité',
        description: 'Voyez ici ce que nous collectons, stockons et supprimons.',
      },

      common: {
        cancel: 'Annuler',
        confirm: 'Confirmer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        loading: 'Chargement…',
        error: "Une erreur s'est produite",
        tryAgain: 'Réessayer',
        close: 'Fermer',
      },
    },
  },

  de: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: 'Finde nicht nur den Preis. Finde die Wahrheit.',
      },

      home: {
        title: 'Was möchtest du analysieren?',
        scan: 'Scannen',
        scanSub: 'Kamera verwenden',
        screenshot: 'Screenshot',
        screenshotSub: 'Bild hochladen',
        link: 'Link',
        linkSub: 'URL einfügen',
        search: 'Suchen',
        searchSub: 'Namen eingeben',
        searchPlaceholder: 'Z.B. Sony WH-1000XM6, oder Link einfügen…',
        footerNote: 'Die Analyse nutzt echte Websuche: kann einige Sekunden dauern.',
        emptyTitle: 'Was möchtest du überprüfen?',
        emptyMessage: 'Gib den Namen eines Produkts ein oder füge unten einen Link ein, dann drücke Suchen.',
        linkPromptTitle: 'Link eingeben',
        linkPromptMessage: 'Füge hier den Link des Produkts ein, das du überprüfen möchtest.',
        linkAnalyze: 'Analysieren',
        photoPermissionTitle: 'Berechtigung erforderlich',
        photoPermissionMessage: 'Um einen Screenshot hochzuladen, erlaube TRUTH den Zugriff auf deine Fotos.',
        screenshotSelectedTitle: 'Screenshot ausgewählt',
        screenshotSelectedMessage: 'Der Screenshot wurde hochgeladen. Die Bildanalyse wird mit der TRUTH-Engine verbunden.',
        cameraPermissionTitle: 'Kamera erforderlich',
        cameraPermissionMessage: 'Um Scannen zu nutzen, erlaube TRUTH die Nutzung der Kamera.',
        cameraTitle: 'QR-Code des Produkts einrahmen',
      },

      analyzing: {
        message1: 'Produkt wird analysiert...',
        message2: 'Aktueller Preis wird geprüft...',
        message3: 'Vergleich mit früheren Preisen...',
        message4: 'Bewertung des realen Preises...',
        message5: 'Ergebnis wird vorbereitet...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Aktueller Preis',
        fairPrice: 'Fairer Preis',
        potentialSaving: 'Mögliche Ersparnis',
        savings: 'Ersparnis',
        upTo: 'Bis zu',
        explanation: 'Erklärung',
        why: 'Warum',
        priceTrend: 'Preisverlauf',
        noPriceHistory: 'Kein Preisverlauf verfügbar.',
        alternatives: 'Alternativen',
        userReviews: 'Nutzerbewertungen',
        truthCheck: 'Truth Check',
        bestOffers: 'Beste Angebote',
        shipping: 'Versand',
        go: 'Los',
        priceAlert: 'Preisalarm',
        alertMeAt: 'Benachrichtige mich bei €{{price}}',
        alertDescription: 'TRUTH benachrichtigt dich, wenn der Preis dieses Niveau erreicht.',
        activate: 'Aktivieren',
        askTruth: 'TRUTH fragen',
      },

      verdict: {
        buy: 'Kaufen',
        wait: 'Warten',
        avoid: 'Nicht kaufen',
      },

      sections: {
        fairPrice: 'Fairer Preis',
        priceHistory: 'Preisverlauf',
        smartComparison: 'Intelligenter Vergleich',
        reviewAnalysis: 'Bewertungsanalyse',
        truthCheck: 'Truth Check',
        bestDeals: 'Beste Angebote',
        alternatives: 'Alternativen',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Überhöhter Preis',
        differentVersion: 'Andere Version',
        refurbished: 'Generalüberholtes Produkt',
      },

      wishlist: {
        title: 'Meine Produkte',
        addAlert: 'Preisalarm hinzufügen',
        targetPrice: 'Zielpreis',
      },

      history: {
        title: 'Meine Analysen',
      },

      chat: {
        title: 'TRUTH fragen',
        placeholder: 'Stelle eine Frage zu diesem Produkt…',
      },

      forMe: {
        title: 'Für mich',
        budget: 'Budget',
        priorities: 'Prioritäten',
        preferredBrand: 'Bevorzugte Marke',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: '5,99 €/Monat',
        yearly: '49,99 €/Jahr',
        unlimitedAnalyses: 'Unbegrenzte Analysen',
        fullHistory: 'Vollständiger Verlauf',
        priceAlerts: 'Preisalarme',
        personalizedAI: 'Personalisierte KI',
      },

      account: {
        title: 'Konto',
        login: 'Anmelden',
        logout: 'Abmelden',
        settings: 'Einstellungen',
        language: 'Sprache',
        languageDescription: 'Wähle die Sprache der App.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / Monat',
        plusDescription: 'Erhalte mehr Analysen und exklusive Funktionen mit TRUTH Plus.',
        upgrade: 'Auf Plus upgraden',
        active: 'Aktiv',
        activeMessage: 'TRUTH Plus ist aktiv.',
        restore: 'Käufe wiederherstellen',
        purchaseActivated: 'PLUS-Abonnement aktiviert',
        restoreNone: 'Keine Käufe zum Wiederherstellen gefunden.',
        restoreError: 'Käufe konnten nicht wiederhergestellt werden.',
      },

      privacy: {
        title: 'Datenschutz',
        description: 'Hier siehst du, was wir sammeln, speichern und löschen.',
      },

      common: {
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        save: 'Speichern',
        delete: 'Löschen',
        loading: 'Wird geladen…',
        error: 'Ein Fehler ist aufgetreten',
        tryAgain: 'Erneut versuchen',
        close: 'Schließen',
      },
    },
  },

  pt: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline: 'Não procure só o preço. Encontre a verdade.',
      },

      home: {
        title: 'O que você quer analisar?',
        scan: 'Escanear',
        scanSub: 'Usar a câmera',
        screenshot: 'Captura de tela',
        screenshotSub: 'Enviar uma imagem',
        link: 'Link',
        linkSub: 'Colar uma URL',
        search: 'Pesquisar',
        searchSub: 'Digite o nome',
        searchPlaceholder: 'Ex. Sony WH-1000XM6, ou cole um link…',
        footerNote: 'A análise usa pesquisa web real: pode levar alguns segundos.',
        emptyTitle: 'O que você quer verificar?',
        emptyMessage: 'Digite o nome de um produto ou cole um link abaixo, depois pressione pesquisar.',
        linkPromptTitle: 'Insira o link',
        linkPromptMessage: 'Cole aqui o link do produto que deseja verificar.',
        linkAnalyze: 'Analisar',
        photoPermissionTitle: 'Permissão necessária',
        photoPermissionMessage: 'Para enviar uma captura de tela, permita que o TRUTH acesse suas fotos.',
        screenshotSelectedTitle: 'Captura de tela selecionada',
        screenshotSelectedMessage: 'A captura de tela foi enviada. A análise de imagem será conectada ao motor TRUTH.',
        cameraPermissionTitle: 'Câmera necessária',
        cameraPermissionMessage: 'Para usar Escanear, permita que o TRUTH use a câmera.',
        cameraTitle: 'Enquadre o código QR do produto',
      },

      analyzing: {
        message1: 'Analisando o produto...',
        message2: 'Verificando o preço atual...',
        message3: 'Comparando com preços anteriores...',
        message4: 'Avaliando o preço atual...',
        message5: 'Preparando o resultado...',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Preço atual',
        fairPrice: 'Preço justo',
        potentialSaving: 'Economia potencial',
        savings: 'Economia',
        upTo: 'Até',
        explanation: 'Explicação',
        why: 'Por quê',
        priceTrend: 'Tendência de preço',
        noPriceHistory: 'Nenhum histórico de preço disponível.',
        alternatives: 'Alternativas',
        userReviews: 'Avaliações de usuários',
        truthCheck: 'Truth Check',
        bestOffers: 'Melhores ofertas',
        shipping: 'Envio',
        go: 'Ir',
        priceAlert: 'Alerta de preço',
        alertMeAt: 'Avise-me em €{{price}}',
        alertDescription: 'O TRUTH vai avisar quando o preço atingir esse nível.',
        activate: 'Ativar',
        askTruth: 'Perguntar ao TRUTH',
      },

      verdict: {
        buy: 'Compre',
        wait: 'Espere',
        avoid: 'Não compre',
      },

      sections: {
        fairPrice: 'Preço justo',
        priceHistory: 'Histórico de preço',
        smartComparison: 'Comparação inteligente',
        reviewAnalysis: 'Análise de avaliações',
        truthCheck: 'Truth Check',
        bestDeals: 'Melhores ofertas',
        alternatives: 'Alternativas',
        insight: 'Truth Insight',
      },

      truthCheck: {
        inflatedPrice: 'Preço inflado',
        differentVersion: 'Versão diferente',
        refurbished: 'Produto recondicionado',
      },

      wishlist: {
        title: 'Meus produtos',
        addAlert: 'Adicionar alerta de preço',
        targetPrice: 'Preço-alvo',
      },

      history: {
        title: 'Minhas análises',
      },

      chat: {
        title: 'Perguntar ao TRUTH',
        placeholder: 'Faça uma pergunta sobre este produto…',
      },

      forMe: {
        title: 'Para mim',
        budget: 'Orçamento',
        priorities: 'Prioridades',
        preferredBrand: 'Marca preferida',
      },

      premium: {
        name: 'TRUTH PLUS',
        monthly: 'R$ 5,99/mês',
        yearly: 'R$ 49,99/ano',
        unlimitedAnalyses: 'Análises ilimitadas',
        fullHistory: 'Histórico completo',
        priceAlerts: 'Alertas de preço',
        personalizedAI: 'IA personalizada',
      },

      account: {
        title: 'Conta',
        login: 'Entrar',
        logout: 'Sair',
        settings: 'Configurações',
        language: 'Idioma',
        languageDescription: 'Escolha o idioma do aplicativo.',
        plusTitle: 'TRUTH Plus',
        plusPrice: '$9.99 / mês',
        plusDescription: 'Tenha mais análises e recursos exclusivos com o TRUTH Plus.',
        upgrade: 'Mudar para Plus',
        active: 'Ativo',
        activeMessage: 'O TRUTH Plus está ativo.',
        restore: 'Restaurar compras',
        purchaseActivated: 'Assinatura PLUS ativada',
        restoreNone: 'Nenhuma compra foi encontrada para restaurar.',
        restoreError: 'Não foi possível restaurar as compras.',
      },

      privacy: {
        title: 'Privacidade',
        description: 'Veja aqui o que coletamos, o que guardamos e o que excluímos.',
      },

      common: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Salvar',
        delete: 'Excluir',
        loading: 'Carregando…',
        error: 'Ocorreu um erro',
        tryAgain: 'Tentar novamente',
        close: 'Fechar',
      },
    },
  },
};

// Rileva la lingua del dispositivo e sceglie la migliore corrispondenza disponibile
const deviceLanguages = RNLocalize.getLocales().map(
  (locale) => locale.languageCode
);

const supportedLanguages = Object.keys(resources);

const bestLanguage =
  deviceLanguages.find((language) =>
    supportedLanguages.includes(language)
  ) || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: bestLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
