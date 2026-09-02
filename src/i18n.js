/**
 * TRUTH — Configurazione internazionalizzazione (i18n)
 * -----------------------------------------------------
 * Libreria: i18next + react-i18next (React Native)
 *
 * Lingue supportate:
 *   it — Italiano
 *   en — English
 *   sc — Sardu (Limba Sarda Comuna)
 *   es — Español
 *   fr — Français
 *   de — Deutsch
 *   pt — Português
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
        title: 'Cosa vuoi analizzare?',
        scan: 'Scansiona',
        scanSub: 'Scansiona un prodotto',
        screenshot: 'Screenshot',
        screenshotSub: 'Carica una foto',
        link: 'Link',
        linkSub: 'Incolla un link',
        search: 'Cerca',
        searchSub: 'Cerca un prodotto',
        emptyTitle: 'Inserisci qualcosa',
        emptyMessage:
          'Inserisci un prodotto, un link o una ricerca da analizzare.',
        linkPromptTitle: 'Analizza un link',
        linkPromptMessage:
          'Inserisci il link del prodotto che vuoi analizzare.',
        linkAnalyze: 'Analizza',
        photoPermissionTitle: 'Permesso foto necessario',
        photoPermissionMessage:
          'Per scegliere uno screenshot è necessario consentire a TRUTH di accedere alle tue foto.',
        screenshotSelectedTitle: 'Screenshot selezionato',
        screenshotSelectedMessage: 'Lo screenshot è stato selezionato.',
        cameraPermissionTitle: 'Permesso fotocamera necessario',
        cameraPermissionMessage:
          'Per scansionare un prodotto è necessario consentire a TRUTH di usare la fotocamera.',
        cameraTitle: 'Inquadra il codice QR del prodotto',
        searchPlaceholder: 'Cerca un prodotto...',
        footerNote:
          'TRUTH ti aiuta a capire se un prezzo è davvero conveniente.',
      },

      analyzing: {
        message1: 'Sto analizzando il prodotto…',
        message2: 'Cerco il prezzo attuale sul web…',
        message3: 'Confronto i prezzi tra i negozi…',
        message4: 'Leggo le recensioni…',
        message5: 'Verifico eventuali anomalie…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prezzo attuale',
        fairPrice: 'Prezzo giusto',
        potentialSaving: 'Risparmio potenziale',
        explanation: 'Spiegazione',
        upTo: 'fino a',
        why: 'Perché?',
        priceTrend: 'Andamento prezzo',
        noPriceHistory: 'Dati storici non disponibili per questo prodotto.',
        alternatives: 'Potresti considerare anche…',
        userReviews: 'Cosa dicono gli utenti',
        truthCheck: 'C’è qualcosa che non torna?',
        bestOffers: 'Migliori offerte',
        shipping: 'Spedizione:',
        go: 'Vai',
        priceAlert: 'Price alert',
        alertMeAt: 'Avvisami a €{{price}}',
        alertDescription: 'Ti avviseremo quando il prezzo raggiungerà questo valore.',
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
        empty: 'Nessun prodotto salvato ancora.',
        monitored: 'Monitorato',
        monitoredTarget: 'Monitorato · target €{{price}}',
        addAlert: 'Aggiungi avviso prezzo',
        targetPrice: 'Prezzo obiettivo',
      },

      history: {
        title: 'Le mie analisi',
        empty: 'Nessuna analisi ancora. Torna alla Home per iniziare.',
      },

      chat: {
        title: 'Chiedi a TRUTH',
        placeholder: 'Scrivi una domanda…',
        suggestionWhy: 'Perché dici questo?',
        suggestionAlternative: 'Qual è l’alternativa migliore?',
        suggestionWait: 'Conviene aspettare ancora?',
        welcome:
          'Chiedimi qualsiasi cosa su questo prodotto: prezzo, alternative, tempistiche.',
        error: 'Non sono riuscito a rispondere: {{error}}',
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
        active: 'ATTIVO',
        price: '€5,99/mese',
        description:
          'Analisi illimitate, storico completo, price alert, AI personalizzata e analisi recensioni avanzata.',
        activeMessage: '✓ TRUTH PLUS è attivo sul tuo account.',
        upgrade: 'Passa a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS attivato!',
      },

      privacy: {
        title: 'Privacy',
        description:
          'Qui puoi vedere cosa raccogliamo, cosa salviamo e cosa eliminiamo.',
      },

      common: {
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva',
        delete: 'Elimina',
        loading: 'Caricamento…',
        error: 'Si è verificato un errore',
        close: 'Chiudi',
        analysisFailed: 'Analisi non riuscita',
        tryAgain: 'Riprova',
      },

      navigation: {
        home: 'Home',
        wishlist: 'Salvati',
        history: 'Storia',
        account: 'Account',
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
        scanSub: 'Scan a product',
        screenshot: 'Screenshot',
        screenshotSub: 'Upload a photo',
        link: 'Link',
        linkSub: 'Paste a link',
        search: 'Search',
        searchSub: 'Search for a product',
        emptyTitle: 'Enter something',
        emptyMessage: 'Enter a product, link, or search to analyze.',
        linkPromptTitle: 'Analyze a link',
        linkPromptMessage:
          'Enter the product link you want to analyze.',
        linkAnalyze: 'Analyze',
        photoPermissionTitle: 'Photo permission required',
        photoPermissionMessage:
          'TRUTH needs access to your photos to select a screenshot.',
        screenshotSelectedTitle: 'Screenshot selected',
        screenshotSelectedMessage:
          'The screenshot has been selected.',
        cameraPermissionTitle: 'Camera permission required',
        cameraPermissionMessage:
          'TRUTH needs camera access to scan a product.',
        cameraTitle: 'Point at the product QR code',
        searchPlaceholder: 'Search for a product...',
        footerNote:
          'TRUTH helps you understand whether a price is really worth it.',
      },

      analyzing: {
        message1: 'I’m analyzing the product…',
        message2: 'Checking the current price on the web…',
        message3: 'Comparing prices across stores…',
        message4: 'Reading reviews…',
        message5: 'Checking for anomalies…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Current price',
        fairPrice: 'Fair price',
        potentialSaving: 'Potential saving',
        explanation: 'Explanation',
        upTo: 'up to',
        why: 'Why?',
        priceTrend: 'Price trend',
        noPriceHistory: 'Historical data is not available for this product.',
        alternatives: 'You might also consider…',
        userReviews: 'What users say',
        truthCheck: 'Is something off?',
        bestOffers: 'Best offers',
        shipping: 'Shipping:',
        go: 'Go',
        priceAlert: 'Price alert',
        alertMeAt: 'Alert me at ${{price}}',
        alertDescription: 'We’ll notify you when the price reaches this value.',
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
        empty: 'No products saved yet.',
        monitored: 'Monitored',
        monitoredTarget: 'Monitored · target ${{price}}',
        addAlert: 'Add price alert',
        targetPrice: 'Target price',
      },

      history: {
        title: 'My analyses',
        empty: 'No analyses yet. Go back to Home to get started.',
      },

      chat: {
        title: 'Ask TRUTH',
        placeholder: 'Write a question…',
        suggestionWhy: 'Why do you say that?',
        suggestionAlternative: 'What is the best alternative?',
        suggestionWait: 'Should I wait a little longer?',
        welcome:
          'Ask me anything about this product: price, alternatives, timing.',
        error: 'I couldn’t answer: {{error}}',
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
        active: 'ACTIVE',
        price: '$5.99/month',
        description:
          'Unlimited analyses, full history, price alerts, personalized AI and advanced review analysis.',
        activeMessage: '✓ TRUTH PLUS is active on your account.',
        upgrade: 'Upgrade to PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS activated!',
      },

      privacy: {
        title: 'Privacy',
        description:
          'See what we collect, what we store, and what we delete.',
      },

      common: {
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        loading: 'Loading…',
        error: 'Something went wrong',
        close: 'Close',
        analysisFailed: 'Analysis failed',
        tryAgain: 'Try again',
      },

      navigation: {
        home: 'Home',
        wishlist: 'Saved',
        history: 'History',
        account: 'Account',
      },
    },
  },

  sc: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Ischi prima de comporare.',
        subtagline:
          'No agatare isceti su prètziu. Agata sa beridade.',
      },

      home: {
        title: 'Ite boles analizare?',
        scan: 'Iscansiona',
        scanSub: 'Iscansiona unu prodùtu',
        screenshot: 'Iscreenshot',
        screenshotSub: 'Càrriga una fotografia',
        link: 'Ligàmene',
        linkSub: 'Incolla unu ligàmene',
        search: 'Chirca',
        searchSub: 'Chirca unu prodùtu',
        emptyTitle: 'Inserta carchi cosa',
        emptyMessage:
          'Inserta unu prodùtu, unu ligàmene o una chirca de analisare.',
        linkPromptTitle: 'Analiza unu ligàmene',
        linkPromptMessage:
          'Inserta su ligàmene de su prodùtu chi boles analisare.',
        linkAnalyze: 'Analiza',
        photoPermissionTitle:
          'Permissu de fotografias netzessàriu',
        photoPermissionMessage:
          'TRUTH tenet bisòngiu de atzessu a is fotografias tuas pro seletzionare unu iscreenshot.',
        screenshotSelectedTitle: 'Iscreenshot seletzionadu',
        screenshotSelectedMessage:
          "S'iscreenshot est istadu seletzionadu.",
        cameraPermissionTitle:
          'Permissu de fotocàmera netzessàriu',
        cameraPermissionMessage:
          'TRUTH tenet bisòngiu de atzessu a sa fotocàmera pro iscansionare unu prodùtu.',
        cameraTitle:
          'Inquadra su còdighe QR de su prodùtu',
        searchPlaceholder: 'Chirca unu prodùtu...',
        footerNote:
          "TRUTH t'agiudat a cumprèndere si unu prètziu est beru cunveniente.",
      },

      analyzing: {
        message1: 'So analizende su prodùtu…',
        message2: 'So chirchende su prètziu atuale in sa web…',
        message3: 'So cunfrontende is prètzios tra is buteghas…',
        message4: 'So ligende is recensiones…',
        message5: 'So verificande eventuales anomalìas…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prètziu de oe',
        fairPrice: 'Prètziu giustu',
        potentialSaving: 'Sparàgniu possìbile',
        explanation: 'Ispiegatzione',
        upTo: 'finas a',
        why: 'Pro ite?',
        priceTrend: 'Andamentu de su prètziu',
        noPriceHistory:
          'Datus istòricos no disponìbiles pro custu prodùtu.',
        alternatives: 'Podias cunsiderare fintzas…',
        userReviews: 'Ite narant is utentes',
        truthCheck: 'B’est carchi cosa chi no torrat?',
        bestOffers: 'Is ofertas mègius',
        shipping: 'Speditzione:',
        go: 'Bae',
        priceAlert: 'Alerta de prètziu',
        alertMeAt: 'Avìsame a €{{price}}',
        alertDescription:
          'T’amos avisadu cando su prètziu at a arribare a custu valore.',
        activate: 'Ativa',
        askTruth: 'Pregunta a TRUTH',
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
        empty: 'Perunu prodùtu sarvadu ancora.',
        monitored: 'Monitoradu',
        monitoredTarget: 'Monitoradu · obietivu €{{price}}',
        addAlert: 'Agiunghe alerta de prètziu',
        targetPrice: 'Prètziu obietivu',
      },

      history: {
        title: 'Is analisis meas',
        empty:
          'Peruna analisi ancora. Torra a sa Home pro incumentzare.',
      },

      chat: {
        title: 'Preguntai a TRUTH',
        placeholder: 'Iscrie una pregunta…',
        suggestionWhy: 'Pro ite naras custu?',
        suggestionAlternative: 'Cale est s’alternativa mègius?',
        suggestionWait: 'Cunvenit abetare ancora?',
        welcome:
          'Preguntami calecunu cosa subra de custu prodùtu: prètziu, alternativas, tempus.',
        error: 'No apo resèssidu a rispòndere: {{error}}',
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
        active: 'ATIVU',
        price: '5,99 €/mese',
        description:
          'Analisis chena lìmite, istòria intrea, alertas de prètziu, AI personalizada e analisi avanzada de is recensiones.',
        activeMessage:
          '✓ TRUTH PLUS est ativu in su contu tuo.',
        upgrade: 'Passa a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS ativadu!',
      },

      privacy: {
        title: 'Privatesa',
        description:
          'Inoghe podes bìdere ite regollimus, ite sarvamus e ite cantzellamus.',
      },

      common: {
        cancel: 'Annulla',
        confirm: 'Cunfirma',
        save: 'Sarva',
        delete: 'Cantzella',
        loading: 'Carrighende…',
        error: "B'est istadu un'errore",
        close: 'Sèrra',
        analysisFailed: 'S’analisi no est arrenèssida',
        tryAgain: 'Torra a proare',
      },

      navigation: {
        home: 'Home',
        wishlist: 'Sarvados',
        history: 'Istòria',
        account: 'Account',
      },
    },
  },

  es: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline:
          'No busques solo el precio. Encuentra la verdad.',
      },

      home: {
        title: '¿Qué quieres analizar?',
        scan: 'Escanear',
        scanSub: 'Escanear un producto',
        screenshot: 'Captura',
        screenshotSub: 'Subir una foto',
        link: 'Enlace',
        linkSub: 'Pegar un enlace',
        search: 'Buscar',
        searchSub: 'Buscar un producto',
        emptyTitle: 'Introduce algo',
        emptyMessage:
          'Introduce un producto, enlace o búsqueda para analizar.',
        linkPromptTitle: 'Analizar un enlace',
        linkPromptMessage:
          'Introduce el enlace del producto que quieres analizar.',
        linkAnalyze: 'Analizar',
        photoPermissionTitle:
          'Permiso de fotos necesario',
        photoPermissionMessage:
          'TRUTH necesita acceso a tus fotos para seleccionar una captura.',
        screenshotSelectedTitle: 'Captura seleccionada',
        screenshotSelectedMessage:
          'La captura ha sido seleccionada.',
        cameraPermissionTitle:
          'Permiso de cámara necesario',
        cameraPermissionMessage:
          'TRUTH necesita acceso a la cámara para escanear un producto.',
        cameraTitle:
          'Enfoca el código QR del producto',
        searchPlaceholder: 'Buscar un producto...',
        footerNote:
          'TRUTH te ayuda a saber si un precio realmente merece la pena.',
      },

      analyzing: {
        message1: 'Estoy analizando el producto…',
        message2: 'Buscando el precio actual en la web…',
        message3: 'Comparando precios entre tiendas…',
        message4: 'Leyendo reseñas…',
        message5: 'Verificando posibles anomalías…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Precio actual',
        fairPrice: 'Precio justo',
        potentialSaving: 'Ahorro potencial',
        explanation: 'Explicación',
        upTo: 'hasta',
        why: '¿Por qué?',
        priceTrend: 'Evolución del precio',
        noPriceHistory:
          'No hay datos históricos disponibles para este producto.',
        alternatives: 'También podrías considerar…',
        userReviews: 'Lo que dicen los usuarios',
        truthCheck: '¿Hay algo que no encaja?',
        bestOffers: 'Mejores ofertas',
        shipping: 'Envío:',
        go: 'Ir',
        priceAlert: 'Alerta de precio',
        alertMeAt: 'Avísame a {{price}} €',
        alertDescription:
          'Te avisaremos cuando el precio alcance este valor.',
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
        empty: 'No hay productos guardados todavía.',
        monitored: 'Monitorizado',
        monitoredTarget: 'Monitorizado · objetivo {{price}} €',
        addAlert: 'Añadir alerta de precio',
        targetPrice: 'Precio objetivo',
      },

      history: {
        title: 'Mis análisis',
        empty:
          'Todavía no hay análisis. Vuelve a Inicio para comenzar.',
      },

      chat: {
        title: 'Pregunta a TRUTH',
        placeholder: 'Escribe una pregunta…',
        suggestionWhy: '¿Por qué dices eso?',
        suggestionAlternative: '¿Cuál es la mejor alternativa?',
        suggestionWait: '¿Conviene esperar un poco más?',
        welcome:
          'Pregúntame cualquier cosa sobre este producto: precio, alternativas y cuándo comprarlo.',
        error: 'No pude responder: {{error}}',
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
        active: 'ACTIVO',
        price: '5,99 €/mes',
        description:
          'Análisis ilimitados, historial completo, alertas de precio, IA personalizada y análisis avanzado de reseñas.',
        activeMessage:
          '✓ TRUTH PLUS está activo en tu cuenta.',
        upgrade: 'Pasar a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: '¡TRUTH PLUS activado!',
      },

      privacy: {
        title: 'Privacidad',
        description:
          'Aquí puedes ver qué recopilamos, qué guardamos y qué eliminamos.',
      },

      common: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        delete: 'Eliminar',
        loading: 'Cargando…',
        error: 'Ha ocurrido un error',
        close: 'Cerrar',
        analysisFailed: 'Análisis fallido',
        tryAgain: 'Intentar de nuevo',
      },

      navigation: {
        home: 'Inicio',
        wishlist: 'Guardados',
        history: 'Historial',
        account: 'Cuenta',
      },
    },
  },

  fr: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline:
          'Ne trouvez pas seulement le prix. Trouvez la vérité.',
      },

      home: {
        title: 'Que voulez-vous analyser ?',
        scan: 'Scanner',
        scanSub: 'Scanner un produit',
        screenshot: 'Capture d’écran',
        screenshotSub: 'Importer une photo',
        link: 'Lien',
        linkSub: 'Coller un lien',
        search: 'Rechercher',
        searchSub: 'Rechercher un produit',
        emptyTitle: 'Saisissez quelque chose',
        emptyMessage:
          'Saisissez un produit, un lien ou une recherche à analyser.',
        linkPromptTitle: 'Analyser un lien',
        linkPromptMessage:
          'Saisissez le lien du produit que vous souhaitez analyser.',
        linkAnalyze: 'Analyser',
        photoPermissionTitle:
          'Autorisation des photos requise',
        photoPermissionMessage:
          'TRUTH a besoin d’accéder à vos photos pour sélectionner une capture.',
        screenshotSelectedTitle:
          'Capture sélectionnée',
        screenshotSelectedMessage:
          'La capture a été sélectionnée.',
        cameraPermissionTitle:
          'Autorisation de la caméra requise',
        cameraPermissionMessage:
          'TRUTH a besoin d’accéder à la caméra pour scanner un produit.',
        cameraTitle:
          'Cadrez le code QR du produit',
        searchPlaceholder:
          'Rechercher un produit...',
        footerNote:
          'TRUTH vous aide à savoir si un prix en vaut vraiment la peine.',
      },

      analyzing: {
        message1: 'J’analyse le produit…',
        message2: 'Je recherche le prix actuel sur le web…',
        message3: 'Je compare les prix entre les magasins…',
        message4: 'Je lis les avis…',
        message5: 'Je vérifie les éventuelles anomalies…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prix actuel',
        fairPrice: 'Prix juste',
        potentialSaving: 'Économie potentielle',
        explanation: 'Explication',
        upTo: 'jusqu’à',
        why: 'Pourquoi ?',
        priceTrend: 'Évolution du prix',
        noPriceHistory:
          'Aucune donnée historique disponible pour ce produit.',
        alternatives: 'Vous pourriez également considérer…',
        userReviews: 'Ce que disent les utilisateurs',
        truthCheck: 'Quelque chose ne va pas ?',
        bestOffers: 'Meilleures offres',
        shipping: 'Livraison :',
        go: 'Voir',
        priceAlert: 'Alerte de prix',
        alertMeAt: 'M’alerter à {{price}} €',
        alertDescription:
          'Nous vous avertirons lorsque le prix atteindra cette valeur.',
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
        empty: 'Aucun produit enregistré pour le moment.',
        monitored: 'Surveillé',
        monitoredTarget: 'Surveillé · objectif {{price}} €',
        addAlert: 'Ajouter une alerte de prix',
        targetPrice: 'Prix cible',
      },

      history: {
        title: 'Mes analyses',
        empty:
          'Aucune analyse pour le moment. Retournez à l’accueil pour commencer.',
      },

      chat: {
        title: 'Demander à TRUTH',
        placeholder: 'Écrivez une question…',
        suggestionWhy: 'Pourquoi dites-vous cela ?',
        suggestionAlternative: 'Quelle est la meilleure alternative ?',
        suggestionWait: 'Vaut-il mieux attendre encore ?',
        welcome:
          'Posez-moi une question sur ce produit : prix, alternatives ou moment idéal pour acheter.',
        error: 'Je n’ai pas pu répondre : {{error}}',
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
        active: 'ACTIF',
        price: '5,99 €/mois',
        description:
          'Analyses illimitées, historique complet, alertes de prix, IA personnalisée et analyse avancée des avis.',
        activeMessage:
          '✓ TRUTH PLUS est actif sur votre compte.',
        upgrade: 'Passer à PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS activé !',
      },

      privacy: {
        title: 'Confidentialité',
        description:
          'Voyez ici ce que nous collectons, stockons et supprimons.',
      },

      common: {
        cancel: 'Annuler',
        confirm: 'Confirmer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        loading: 'Chargement…',
        error: "Une erreur s'est produite",
        close: 'Fermer',
        analysisFailed: 'Échec de l’analyse',
        tryAgain: 'Réessayer',
      },

      navigation: {
        home: 'Accueil',
        wishlist: 'Enregistrés',
        history: 'Historique',
        account: 'Compte',
      },
    },
  },

  de: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline:
          'Finde nicht nur den Preis. Finde die Wahrheit.',
      },

      home: {
        title: 'Was möchtest du analysieren?',
        scan: 'Scannen',
        scanSub: 'Produkt scannen',
        screenshot: 'Screenshot',
        screenshotSub: 'Foto hochladen',
        link: 'Link',
        linkSub: 'Link einfügen',
        search: 'Suchen',
        searchSub: 'Nach einem Produkt suchen',
        emptyTitle: 'Etwas eingeben',
        emptyMessage:
          'Gib ein Produkt, einen Link oder eine Suche zur Analyse ein.',
        linkPromptTitle: 'Link analysieren',
        linkPromptMessage:
          'Gib den Link des Produkts ein, das du analysieren möchtest.',
        linkAnalyze: 'Analysieren',
        photoPermissionTitle:
          'Fotoberechtigung erforderlich',
        photoPermissionMessage:
          'TRUTH benötigt Zugriff auf deine Fotos, um einen Screenshot auszuwählen.',
        screenshotSelectedTitle:
          'Screenshot ausgewählt',
        screenshotSelectedMessage:
          'Der Screenshot wurde ausgewählt.',
        cameraPermissionTitle:
          'Kameraberechtigung erforderlich',
        cameraPermissionMessage:
          'TRUTH benötigt Kamerazugriff, um ein Produkt zu scannen.',
        cameraTitle:
          'QR-Code des Produkts erfassen',
        searchPlaceholder:
          'Nach einem Produkt suchen...',
        footerNote:
          'TRUTH hilft dir zu verstehen, ob sich ein Preis wirklich lohnt.',
      },

      analyzing: {
        message1: 'Ich analysiere das Produkt…',
        message2: 'Ich suche den aktuellen Preis im Web…',
        message3: 'Ich vergleiche die Preise verschiedener Händler…',
        message4: 'Ich lese die Bewertungen…',
        message5: 'Ich prüfe auf mögliche Auffälligkeiten…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Aktueller Preis',
        fairPrice: 'Fairer Preis',
        potentialSaving: 'Mögliche Ersparnis',
        explanation: 'Erklärung',
        upTo: 'bis zu',
        why: 'Warum?',
        priceTrend: 'Preisentwicklung',
        noPriceHistory:
          'Für dieses Produkt sind keine historischen Daten verfügbar.',
        alternatives: 'Das könntest du auch in Betracht ziehen…',
        userReviews: 'Was Nutzer sagen',
        truthCheck: 'Stimmt hier etwas nicht?',
        bestOffers: 'Beste Angebote',
        shipping: 'Versand:',
        go: 'Öffnen',
        priceAlert: 'Preisalarm',
        alertMeAt: 'Bei {{price}} € benachrichtigen',
        alertDescription:
          'Wir benachrichtigen dich, wenn der Preis diesen Wert erreicht.',
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
        empty: 'Noch keine Produkte gespeichert.',
        monitored: 'Überwacht',
        monitoredTarget: 'Überwacht · Zielpreis {{price}} €',
        addAlert: 'Preisalarm hinzufügen',
        targetPrice: 'Zielpreis',
      },

      history: {
        title: 'Meine Analysen',
        empty:
          'Noch keine Analysen. Gehe zurück zur Startseite, um zu beginnen.',
      },

      chat: {
        title: 'TRUTH fragen',
        placeholder: 'Frage schreiben…',
        suggestionWhy: 'Warum sagst du das?',
        suggestionAlternative: 'Was ist die beste Alternative?',
        suggestionWait: 'Soll ich noch etwas warten?',
        welcome:
          'Frag mich alles zu diesem Produkt: Preis, Alternativen oder Kaufzeitpunkt.',
        error: 'Ich konnte nicht antworten: {{error}}',
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
        active: 'AKTIV',
        price: '5,99 €/Monat',
        description:
          'Unbegrenzte Analysen, vollständiger Verlauf, Preisalarme, personalisierte KI und erweiterte Bewertungsanalyse.',
        activeMessage:
          '✓ TRUTH PLUS ist in deinem Konto aktiv.',
        upgrade: 'Auf PLUS upgraden',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS aktiviert!',
      },

      privacy: {
        title: 'Datenschutz',
        description:
          'Hier siehst du, was wir sammeln, speichern und löschen.',
      },

      common: {
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        save: 'Speichern',
        delete: 'Löschen',
        loading: 'Wird geladen…',
        error: 'Ein Fehler ist aufgetreten',
        close: 'Schließen',
        analysisFailed: 'Analyse fehlgeschlagen',
        tryAgain: 'Erneut versuchen',
      },

      navigation: {
        home: 'Startseite',
        wishlist: 'Gespeichert',
        history: 'Verlauf',
        account: 'Konto',
      },
    },
  },

  pt: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Know before you buy.',
        subtagline:
          'Não procure só o preço. Encontre a verdade.',
      },

      home: {
        title: 'O que você quer analisar?',
        scan: 'Escanear',
        scanSub: 'Escanear um produto',
        screenshot: 'Captura de tela',
        screenshotSub: 'Enviar uma foto',
        link: 'Link',
        linkSub: 'Colar um link',
        search: 'Pesquisar',
        searchSub: 'Pesquisar um produto',
        emptyTitle: 'Digite alguma coisa',
        emptyMessage:
          'Digite um produto, link ou pesquisa para analisar.',
        linkPromptTitle: 'Analisar um link',
        linkPromptMessage:
          'Digite o link do produto que você quer analisar.',
        linkAnalyze: 'Analisar',
        photoPermissionTitle:
          'Permissão para fotos necessária',
        photoPermissionMessage:
          'O TRUTH precisa de acesso às suas fotos para selecionar uma captura de tela.',
        screenshotSelectedTitle:
          'Captura selecionada',
        screenshotSelectedMessage:
          'A captura de tela foi selecionada.',
        cameraPermissionTitle:
          'Permissão para câmera necessária',
        cameraPermissionMessage:
          'O TRUTH precisa de acesso à câmera para escanear um produto.',
        cameraTitle:
          'Aponte para o código QR do produto',
        searchPlaceholder:
          'Pesquisar um produto...',
        footerNote:
          'O TRUTH ajuda você a entender se um preço realmente vale a pena.',
      },

      analyzing: {
        message1: 'Estou analisando o produto…',
        message2: 'Procurando o preço atual na web…',
        message3: 'Comparando preços entre as lojas…',
        message4: 'Lendo as avaliações…',
        message5: 'Verificando possíveis anomalias…',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Preço atual',
        fairPrice: 'Preço justo',
        potentialSaving: 'Economia potencial',
        explanation: 'Explicação',
        upTo: 'até',
        why: 'Por quê?',
        priceTrend: 'Evolução do preço',
        noPriceHistory:
          'Não há dados históricos disponíveis para este produto.',
        alternatives: 'Você também pode considerar…',
        userReviews: 'O que os usuários dizem',
        truthCheck: 'Há algo que não está certo?',
        bestOffers: 'Melhores ofertas',
        shipping: 'Frete:',
        go: 'Ver',
        priceAlert: 'Alerta de preço',
        alertMeAt: 'Avise-me em €{{price}}',
        alertDescription:
          'Avisaremos quando o preço atingir este valor.',
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
        empty: 'Nenhum produto salvo ainda.',
        monitored: 'Monitorado',
        monitoredTarget: 'Monitorado · alvo €{{price}}',
        addAlert: 'Adicionar alerta de preço',
        targetPrice: 'Preço-alvo',
      },

      history: {
        title: 'Minhas análises',
        empty:
          'Ainda não há análises. Volte para a Home para começar.',
      },

      chat: {
        title: 'Perguntar ao TRUTH',
        placeholder: 'Escreva uma pergunta…',
        suggestionWhy: 'Por que você diz isso?',
        suggestionAlternative: 'Qual é a melhor alternativa?',
        suggestionWait: 'Vale a pena esperar mais um pouco?',
        welcome:
          'Pergunte qualquer coisa sobre este produto: preço, alternativas ou melhor momento para comprar.',
        error: 'Não consegui responder: {{error}}',
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
        active: 'ATIVO',
        price: 'R$ 5,99/mês',
        description:
          'Análises ilimitadas, histórico completo, alertas de preço, IA personalizada e análise avançada de avaliações.',
        activeMessage:
          '✓ TRUTH PLUS está ativo na sua conta.',
        upgrade: 'Mudar para PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'TRUTH PLUS ativado!',
      },

      privacy: {
        title: 'Privacidade',
        description:
          'Veja aqui o que coletamos, o que guardamos e o que excluímos.',
      },

      common: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Salvar',
        delete: 'Excluir',
        loading: 'Carregando…',
        error: 'Ocorreu um erro',
        close: 'Fechar',
        analysisFailed: 'Falha na análise',
        tryAgain: 'Tentar novamente',
      },

      navigation: {
        home: 'Início',
        wishlist: 'Salvos',
        history: 'Histórico',
        account: 'Conta',
      },
    },
  },
};

/**
 * Lingue effettivamente supportate da TRUTH.
 */
const supportedLanguages = Object.keys(resources);

/**
 * Normalizza il codice lingua.
 *
 * Esempi:
 * it-IT → it
 * en-US → en
 * pt-BR → pt
 */
const normalizeLanguageCode = (languageCode) => {
  if (!languageCode || typeof languageCode !== 'string') {
    return null;
  }

  const normalized = languageCode.toLowerCase().split('-')[0];

  return supportedLanguages.includes(normalized)
    ? normalized
    : null;
};

/**
 * Rileva la lingua preferita del dispositivo.
 */
const deviceLanguages = RNLocalize.getLocales()
  .map((locale) => normalizeLanguageCode(locale?.languageCode))
  .filter(Boolean);

const bestLanguage = deviceLanguages[0] || 'en';

/**
 * Inizializzazione i18next.
 */
i18n.use(initReactI18next).init({
  resources,
  lng: bestLanguage,
  fallbackLng: 'en',

  compatibilityJSON: 'v4',

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },

  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
