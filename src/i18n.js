import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  it: {
    translation: {
      common: {
        loading: 'Caricamento...',
        error: 'Errore',
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva',
        delete: 'Elimina',
        close: 'Chiudi',
        back: 'Indietro',
        yes: 'Sì',
        no: 'No',
        search: 'Cerca',
        share: 'Condividi',
        copied: 'Copiato',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Scopri la verità sui prezzi',
        searchPlaceholder: 'Cerca un prodotto...',
        scan: 'Scansiona',
        analyze: 'Analizza',
        recent: 'Analisi recenti',
        noRecent: 'Nessuna analisi recente',
        seeAll: 'Vedi tutto',
      },

      product: {
        price: 'Prezzo',
        fairPrice: 'Prezzo corretto',
        verdict: 'Verdetto',
        goodDeal: 'Buon affare',
        fairDeal: 'Prezzo corretto',
        badDeal: 'Prezzo troppo alto',
        confidence: 'Affidabilità',
        history: 'Storico prezzi',
        analysis: 'Analisi TRUTH',
        description: 'Descrizione',
        retailer: 'Rivenditore',
        category: 'Categoria',
        noData: 'Dati non disponibili',
      },

      history: {
        title: 'Cronologia',
        empty: 'Non hai ancora effettuato analisi.',
        deleteTitle: 'Eliminare analisi?',
        deleteMessage: 'Questa analisi verrà rimossa dalla cronologia.',
        clear: 'Cancella cronologia',
        clearTitle: 'Cancellare tutta la cronologia?',
        clearMessage: 'Tutte le analisi verranno eliminate definitivamente.',
      },

      account: {
        title: 'Account',
        active: 'PLUS attivo',
        price: '€5,99/mese',
        description: 'Sblocca tutte le funzioni di TRUTH.',
        activeMessage: 'Il tuo abbonamento PLUS è attivo.',
        upgrade: 'Passa a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Sblocca tutte le funzioni premium.',
        login: 'Accedi',
        logout: 'Esci',
        language: 'Lingua',
        languageDescription: 'Scegli la lingua di TRUTH.',
      },

      premium: {
        monthly: '€5,99/mese',
        features: 'Funzioni premium',
        unlimited: 'Analisi illimitate',
        advanced: 'Analisi avanzate',
        history: 'Cronologia completa',
        noAds: 'Nessuna pubblicità',
      },

      settings: {
        title: 'Impostazioni',
        language: 'Lingua',
        notifications: 'Notifiche',
        privacy: 'Privacy',
        terms: 'Termini e condizioni',
        about: 'Informazioni',
      },

      errors: {
        generic: 'Si è verificato un errore.',
        network: 'Errore di connessione.',
        productNotFound: 'Prodotto non trovato.',
        analysisFailed: 'Impossibile completare l’analisi.',
      },
    },
  },

  en: {
    translation: {
      common: {
        loading: 'Loading...',
        error: 'Error',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        close: 'Close',
        back: 'Back',
        yes: 'Yes',
        no: 'No',
        search: 'Search',
        share: 'Share',
        copied: 'Copied',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Discover the truth about prices',
        searchPlaceholder: 'Search for a product...',
        scan: 'Scan',
        analyze: 'Analyze',
        recent: 'Recent analyses',
        noRecent: 'No recent analyses',
        seeAll: 'See all',
      },

      product: {
        price: 'Price',
        fairPrice: 'Fair price',
        verdict: 'Verdict',
        goodDeal: 'Good deal',
        fairDeal: 'Fair price',
        badDeal: 'Price too high',
        confidence: 'Confidence',
        history: 'Price history',
        analysis: 'TRUTH Analysis',
        description: 'Description',
        retailer: 'Retailer',
        category: 'Category',
        noData: 'Data unavailable',
      },

      history: {
        title: 'History',
        empty: 'You have not performed any analyses yet.',
        deleteTitle: 'Delete analysis?',
        deleteMessage: 'This analysis will be removed from your history.',
        clear: 'Clear history',
        clearTitle: 'Clear all history?',
        clearMessage: 'All analyses will be permanently deleted.',
      },

      account: {
        title: 'Account',
        active: 'PLUS active',
        price: '€5.99/month',
        description: 'Unlock all TRUTH features.',
        activeMessage: 'Your PLUS subscription is active.',
        upgrade: 'Upgrade to PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Unlock all premium features.',
        login: 'Log in',
        logout: 'Log out',
        language: 'Language',
        languageDescription: 'Choose the TRUTH language.',
      },

      premium: {
        monthly: '€5.99/month',
        features: 'Premium features',
        unlimited: 'Unlimited analyses',
        advanced: 'Advanced analyses',
        history: 'Full history',
        noAds: 'No ads',
      },

      settings: {
        title: 'Settings',
        language: 'Language',
        notifications: 'Notifications',
        privacy: 'Privacy',
        terms: 'Terms and conditions',
        about: 'About',
      },

      errors: {
        generic: 'An error occurred.',
        network: 'Connection error.',
        productNotFound: 'Product not found.',
        analysisFailed: 'Unable to complete the analysis.',
      },
    },
  },

  sc: {
    translation: {
      common: {
        loading: 'Carrigamentu...',
        error: 'Errore',
        cancel: 'Annulla',
        confirm: 'Cunfirma',
        save: 'Sarva',
        delete: 'Burra',
        close: 'Serra',
        back: 'In segus',
        yes: 'Eja',
        no: 'No',
        search: 'Chirca',
        share: 'Cumpartzi',
        copied: 'Copiadu',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Scobri sa beridadi subra is pretzus',
        searchPlaceholder: 'Chirca unu produtu...',
        scan: 'Scansione',
        analyze: 'Analisa',
        recent: 'Analisis reghentes',
        noRecent: 'Peruna analisi reghente',
        seeAll: 'Castia totu',
      },

      product: {
        price: 'Pretzu',
        fairPrice: 'Pretzu justu',
        verdict: 'Verdetu',
        goodDeal: 'Bona oferta',
        fairDeal: 'Pretzu justu',
        badDeal: 'Pretzu tropu artu',
        confidence: 'Affidabilidade',
        history: 'Istòricu de is pretzus',
        analysis: 'Analisi TRUTH',
        description: 'Descritzione',
        retailer: 'Rivendidori',
        category: 'Categoria',
        noData: 'Datus non disponìbiles',
      },

      history: {
        title: 'Istòria',
        empty: 'No as fatu ancora peruna analisi.',
        deleteTitle: 'Burrari s’analisi?',
        deleteMessage: 'S’analisi at a èssere bogada dae s’istòria.',
        clear: 'Burra s’istòria',
        clearTitle: 'Burrari totu s’istòria?',
        clearMessage: 'Totus is analisis ant a èssere burradas pro semper.',
      },

      account: {
        title: 'Contu',
        active: 'PLUS ativu',
        price: '€5,99/mese',
        description: 'Abertura totu is funtzionalidades de TRUTH.',
        activeMessage: 'S’abbonamentu PLUS tuo est ativu.',
        upgrade: 'Passa a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Abertura totu is funtzionalidades premium.',
        login: 'Intra',
        logout: 'Essi',
        language: 'Limba',
        languageDescription: 'Sèbera sa limba de TRUTH.',
      },

      premium: {
        monthly: '€5,99/mese',
        features: 'Funtzionalidades premium',
        unlimited: 'Analisis sena lìmites',
        advanced: 'Analisis avantzadas',
        history: 'Istòria completa',
        noAds: 'Peruna publicidà',
      },

      settings: {
        title: 'Impostatziones',
        language: 'Limba',
        notifications: 'Notìficas',
        privacy: 'Privadesa',
        terms: 'Tèrminos e cunditziones',
        about: 'Informatziones',
      },

      errors: {
        generic: 'Est aparèssidu un errore.',
        network: 'Errore de connessione.',
        productNotFound: 'Produtu no agatadu.',
        analysisFailed: 'No est istadu possìbile acabare s’analisi.',
      },
    },
  },

  es: {
    translation: {
      common: {
        loading: 'Cargando...',
        error: 'Error',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        delete: 'Eliminar',
        close: 'Cerrar',
        back: 'Atrás',
        yes: 'Sí',
        no: 'No',
        search: 'Buscar',
        share: 'Compartir',
        copied: 'Copiado',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Descubre la verdad sobre los precios',
        searchPlaceholder: 'Buscar un producto...',
        scan: 'Escanear',
        analyze: 'Analizar',
        recent: 'Análisis recientes',
        noRecent: 'No hay análisis recientes',
        seeAll: 'Ver todo',
      },

      product: {
        price: 'Precio',
        fairPrice: 'Precio justo',
        verdict: 'Veredicto',
        goodDeal: 'Buena oferta',
        fairDeal: 'Precio justo',
        badDeal: 'Precio demasiado alto',
        confidence: 'Fiabilidad',
        history: 'Historial de precios',
        analysis: 'Análisis TRUTH',
        description: 'Descripción',
        retailer: 'Vendedor',
        category: 'Categoría',
        noData: 'Datos no disponibles',
      },

      history: {
        title: 'Historial',
        empty: 'Todavía no has realizado ningún análisis.',
        deleteTitle: '¿Eliminar análisis?',
        deleteMessage: 'Este análisis se eliminará de tu historial.',
        clear: 'Borrar historial',
        clearTitle: '¿Borrar todo el historial?',
        clearMessage: 'Todos los análisis se eliminarán permanentemente.',
      },

      account: {
        title: 'Cuenta',
        active: 'PLUS activo',
        price: '5,99 €/mes',
        description: 'Desbloquea todas las funciones de TRUTH.',
        activeMessage: 'Tu suscripción PLUS está activa.',
        upgrade: 'Pasar a PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Desbloquea todas las funciones premium.',
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        language: 'Idioma',
        languageDescription: 'Elige el idioma de TRUTH.',
      },

      premium: {
        monthly: '5,99 €/mes',
        features: 'Funciones premium',
        unlimited: 'Análisis ilimitados',
        advanced: 'Análisis avanzados',
        history: 'Historial completo',
        noAds: 'Sin publicidad',
      },

      settings: {
        title: 'Ajustes',
        language: 'Idioma',
        notifications: 'Notificaciones',
        privacy: 'Privacidad',
        terms: 'Términos y condiciones',
        about: 'Información',
      },

      errors: {
        generic: 'Se ha producido un error.',
        network: 'Error de conexión.',
        productNotFound: 'Producto no encontrado.',
        analysisFailed: 'No se ha podido completar el análisis.',
      },
    },
  },

  fr: {
    translation: {
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        close: 'Fermer',
        back: 'Retour',
        yes: 'Oui',
        no: 'Non',
        search: 'Rechercher',
        share: 'Partager',
        copied: 'Copié',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Découvrez la vérité sur les prix',
        searchPlaceholder: 'Rechercher un produit...',
        scan: 'Scanner',
        analyze: 'Analyser',
        recent: 'Analyses récentes',
        noRecent: 'Aucune analyse récente',
        seeAll: 'Voir tout',
      },

      product: {
        price: 'Prix',
        fairPrice: 'Prix juste',
        verdict: 'Verdict',
        goodDeal: 'Bonne affaire',
        fairDeal: 'Prix juste',
        badDeal: 'Prix trop élevé',
        confidence: 'Fiabilité',
        history: 'Historique des prix',
        analysis: 'Analyse TRUTH',
        description: 'Description',
        retailer: 'Vendeur',
        category: 'Catégorie',
        noData: 'Données indisponibles',
      },

      history: {
        title: 'Historique',
        empty: 'Vous n’avez encore effectué aucune analyse.',
        deleteTitle: 'Supprimer l’analyse ?',
        deleteMessage: 'Cette analyse sera supprimée de votre historique.',
        clear: 'Effacer l’historique',
        clearTitle: 'Effacer tout l’historique ?',
        clearMessage: 'Toutes les analyses seront définitivement supprimées.',
      },

      account: {
        title: 'Compte',
        active: 'PLUS actif',
        price: '5,99 €/mois',
        description: 'Débloquez toutes les fonctionnalités de TRUTH.',
        activeMessage: 'Votre abonnement PLUS est actif.',
        upgrade: 'Passer à PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Débloquez toutes les fonctionnalités premium.',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        language: 'Langue',
        languageDescription: 'Choisissez la langue de TRUTH.',
      },

      premium: {
        monthly: '5,99 €/mois',
        features: 'Fonctionnalités premium',
        unlimited: 'Analyses illimitées',
        advanced: 'Analyses avancées',
        history: 'Historique complet',
        noAds: 'Aucune publicité',
      },

      settings: {
        title: 'Paramètres',
        language: 'Langue',
        notifications: 'Notifications',
        privacy: 'Confidentialité',
        terms: 'Conditions générales',
        about: 'À propos',
      },

      errors: {
        generic: 'Une erreur est survenue.',
        network: 'Erreur de connexion.',
        productNotFound: 'Produit introuvable.',
        analysisFailed: 'Impossible de terminer l’analyse.',
      },
    },
  },

  de: {
    translation: {
      common: {
        loading: 'Wird geladen...',
        error: 'Fehler',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        save: 'Speichern',
        delete: 'Löschen',
        close: 'Schließen',
        back: 'Zurück',
        yes: 'Ja',
        no: 'Nein',
        search: 'Suchen',
        share: 'Teilen',
        copied: 'Kopiert',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Entdecke die Wahrheit über Preise',
        searchPlaceholder: 'Produkt suchen...',
        scan: 'Scannen',
        analyze: 'Analysieren',
        recent: 'Letzte Analysen',
        noRecent: 'Keine aktuellen Analysen',
        seeAll: 'Alle anzeigen',
      },

      product: {
        price: 'Preis',
        fairPrice: 'Fairer Preis',
        verdict: 'Urteil',
        goodDeal: 'Gutes Angebot',
        fairDeal: 'Fairer Preis',
        badDeal: 'Preis zu hoch',
        confidence: 'Zuverlässigkeit',
        history: 'Preisentwicklung',
        analysis: 'TRUTH-Analyse',
        description: 'Beschreibung',
        retailer: 'Händler',
        category: 'Kategorie',
        noData: 'Keine Daten verfügbar',
      },

      history: {
        title: 'Verlauf',
        empty: 'Du hast noch keine Analysen durchgeführt.',
        deleteTitle: 'Analyse löschen?',
        deleteMessage: 'Diese Analyse wird aus deinem Verlauf entfernt.',
        clear: 'Verlauf löschen',
        clearTitle: 'Gesamten Verlauf löschen?',
        clearMessage: 'Alle Analysen werden dauerhaft gelöscht.',
      },

      account: {
        title: 'Konto',
        active: 'PLUS aktiv',
        price: '5,99 €/Monat',
        description: 'Schalte alle TRUTH-Funktionen frei.',
        activeMessage: 'Dein PLUS-Abonnement ist aktiv.',
        upgrade: 'Auf PLUS upgraden',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Schalte alle Premium-Funktionen frei.',
        login: 'Anmelden',
        logout: 'Abmelden',
        language: 'Sprache',
        languageDescription: 'Wähle die Sprache von TRUTH.',
      },

      premium: {
        monthly: '5,99 €/Monat',
        features: 'Premium-Funktionen',
        unlimited: 'Unbegrenzte Analysen',
        advanced: 'Erweiterte Analysen',
        history: 'Vollständiger Verlauf',
        noAds: 'Keine Werbung',
      },

      settings: {
        title: 'Einstellungen',
        language: 'Sprache',
        notifications: 'Benachrichtigungen',
        privacy: 'Datenschutz',
        terms: 'Nutzungsbedingungen',
        about: 'Über',
      },

      errors: {
        generic: 'Ein Fehler ist aufgetreten.',
        network: 'Verbindungsfehler.',
        productNotFound: 'Produkt nicht gefunden.',
        analysisFailed: 'Die Analyse konnte nicht abgeschlossen werden.',
      },
    },
  },

  pt: {
    translation: {
      common: {
        loading: 'A carregar...',
        error: 'Erro',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        delete: 'Eliminar',
        close: 'Fechar',
        back: 'Voltar',
        yes: 'Sim',
        no: 'Não',
        search: 'Pesquisar',
        share: 'Partilhar',
        copied: 'Copiado',
      },

      home: {
        title: 'TRUTH',
        subtitle: 'Descobre a verdade sobre os preços',
        searchPlaceholder: 'Pesquisar um produto...',
        scan: 'Digitalizar',
        analyze: 'Analisar',
        recent: 'Análises recentes',
        noRecent: 'Nenhuma análise recente',
        seeAll: 'Ver tudo',
      },

      product: {
        price: 'Preço',
        fairPrice: 'Preço justo',
        verdict: 'Veredito',
        goodDeal: 'Boa oportunidade',
        fairDeal: 'Preço justo',
        badDeal: 'Preço demasiado alto',
        confidence: 'Fiabilidade',
        history: 'Histórico de preços',
        analysis: 'Análise TRUTH',
        description: 'Descrição',
        retailer: 'Vendedor',
        category: 'Categoria',
        noData: 'Dados indisponíveis',
      },

      history: {
        title: 'Histórico',
        empty: 'Ainda não realizaste nenhuma análise.',
        deleteTitle: 'Eliminar análise?',
        deleteMessage: 'Esta análise será removida do teu histórico.',
        clear: 'Limpar histórico',
        clearTitle: 'Limpar todo o histórico?',
        clearMessage: 'Todas as análises serão eliminadas permanentemente.',
      },

      account: {
        title: 'Conta',
        active: 'PLUS ativo',
        price: '5,99 €/mês',
        description: 'Desbloqueia todas as funcionalidades do TRUTH.',
        activeMessage: 'A tua subscrição PLUS está ativa.',
        upgrade: 'Passar para PLUS',
        purchaseTitle: 'TRUTH PLUS',
        purchaseMessage: 'Desbloqueia todas as funcionalidades premium.',
        login: 'Iniciar sessão',
        logout: 'Terminar sessão',
        language: 'Idioma',
        languageDescription: 'Escolhe o idioma do TRUTH.',
      },

      premium: {
        monthly: '5,99 €/mês',
        features: 'Funcionalidades premium',
        unlimited: 'Análises ilimitadas',
        advanced: 'Análises avançadas',
        history: 'Histórico completo',
        noAds: 'Sem publicidade',
      },

      settings: {
        title: 'Definições',
        language: 'Idioma',
        notifications: 'Notificações',
        privacy: 'Privacidade',
        terms: 'Termos e condições',
        about: 'Informações',
      },

      errors: {
        generic: 'Ocorreu um erro.',
        network: 'Erro de ligação.',
        productNotFound: 'Produto não encontrado.',
        analysisFailed: 'Não foi possível concluir a análise.',
      },
    },
  },
};

const supportedLanguages = ['it', 'en', 'sc', 'es', 'fr', 'de', 'pt'];

const normalizeLanguage = (language) => {
  if (!language) {
    return 'it';
  }

  const normalized = language.toLowerCase().split('-')[0];

  return supportedLanguages.includes(normalized)
    ? normalized
    : 'it';
};

const deviceLanguage = normalizeLanguage(
  RNLocalize.getLocales()?.[0]?.languageTag
);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage,
    fallbackLng: 'it',
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
