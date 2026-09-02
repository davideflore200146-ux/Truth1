/**
 * TRUTH — Configurazione internazionalizzazione (i18n)
 * -----------------------------------------------------
 * Libreria: i18next + react-i18next (React Native)
 *
 * Installazione:
 *   npm install i18next react-i18next react-native-localize
 *
 * Uso in un componente:
 *   import { useTranslation } from 'react-i18next';
 *   const { t } = useTranslation();
 *   <Text>{t('verdict.buy')}</Text>
 *
 * Lingue incluse:
 *   it — Italiano
 *   en — English
 *   es — Español
 *   fr — Français
 *   de — Deutsch
 *   pt — Português
 *   sc — Sardu (Limba Sarda Comuna)
 *
 * La lingua del dispositivo viene rilevata automaticamente.
 * Se la lingua non è supportata, viene utilizzato l'inglese.
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prezzo attuale',
        fairPrice: 'Prezzo giusto',
        potentialSaving: 'Risparmio potenziale',
        explanation: 'Spiegazione',
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
        screenshotSelectedMessage: 'The screenshot has been selected.',
        cameraPermissionTitle: 'Camera permission required',
        cameraPermissionMessage:
          'TRUTH needs camera access to scan a product.',
        cameraTitle: 'Point at the product QR code',
        searchPlaceholder: 'Search for a product...',
        footerNote:
          'TRUTH helps you understand whether a price is really worth it.',
      },

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Current price',
        fairPrice: 'Fair price',
        potentialSaving: 'Potential saving',
        explanation: 'Explanation',
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prètziu de oe',
        fairPrice: 'Prètziu giustu',
        potentialSaving: 'Sparàgniu possìbile',
        explanation: 'Ispiegatzione',
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
        placeholder:
          'Fai una pregunta subra de custu prodùtu…',
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Precio actual',
        fairPrice: 'Precio justo',
        potentialSaving: 'Ahorro potencial',
        explanation: 'Explicación',
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
        placeholder:
          'Haz una pregunta sobre este producto…',
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Prix actuel',
        fairPrice: 'Prix juste',
        potentialSaving: 'Économie potentielle',
        explanation: 'Explication',
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
        placeholder:
          'Posez une question sur ce produit…',
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Aktueller Preis',
        fairPrice: 'Fairer Preis',
        potentialSaving: 'Mögliche Ersparnis',
        explanation: 'Erklärung',
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
        placeholder:
          'Stelle eine Frage zu diesem Produkt…',
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

      result: {
        truthScore: 'Truth Score',
        currentPrice: 'Preço atual',
        fairPrice: 'Preço justo',
        potentialSaving: 'Economia potencial',
        explanation: 'Explicação',
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
        placeholder:
          'Faça uma pergunta sobre este produto…',
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
 *   it      → it
 *   it-IT   → it
 *   en-US   → en
 *   en-GB   → en
 *   pt-BR   → pt
 *   fr-FR   → fr
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
 * Rileva la lingua migliore disponibile sul dispositivo.
 *
 * react-native-localize può restituire più lingue preferite.
 * Viene scelta la prima lingua supportata.
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
