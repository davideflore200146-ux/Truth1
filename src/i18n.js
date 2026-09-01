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
 * Lingue incluse: it, en, es, fr, de, pt, sc (Sardo - Limba Sarda Comuna)
 * Aggiungi nuove lingue copiando un blocco e traducendo i valori.
 * NOTA: le traduzioni in sardo sono una prima bozza in Limba Sarda Comuna (LSC),
 * consigliata una revisione da parte di un madrelingua prima della pubblicazione.
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
        subtagline: "Non trovare solo il prezzo. Trova la verità.",
      },
      home: {
        title: 'Cosa vuoi analizzare?',
        scan: 'Scansiona',
        screenshot: 'Screenshot',
        link: 'Link',
        search: 'Cerca',
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
        description: 'Qui puoi vedere cosa raccogliamo, cosa salviamo e cosa eliminiamo.',
      },
      common: {
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva',
        delete: 'Elimina',
        loading: 'Caricamento…',
        error: 'Si è verificato un errore',
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
        screenshot: 'Screenshot',
        link: 'Link',
        search: 'Search',
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
        description: 'See what we collect, what we store, and what we delete.',
      },
      common: {
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        loading: 'Loading…',
        error: 'Something went wrong',
      },
    },
  },

  // Sardo — Limba Sarda Comuna (LSC), bozza iniziale da rivedere
  sc: {
    translation: {
      app: {
        name: 'TRUTH',
        tagline: 'Ischi prima de comporare.',
        subtagline: 'No agatare isceti su prètziu. Agata sa beridade.',
      },
      home: {
        title: 'Ite boles analizare?',
        scan: 'Iscansiona',
        screenshot: 'Iscreenshot',
        link: 'Ligàmene',
        search: 'Chirca',
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
      },
    },
  },

  es: {
    translation: {
      app: { name: 'TRUTH', tagline: 'Know before you buy.', subtagline: 'No busques solo el precio. Encuentra la verdad.' },
      home: { title: '¿Qué quieres analizar?', scan: 'Escanear', screenshot: 'Captura', link: 'Enlace', search: 'Buscar' },
      result: { truthScore: 'Truth Score', currentPrice: 'Precio actual', fairPrice: 'Precio justo', potentialSaving: 'Ahorro potencial', explanation: 'Explicación' },
      verdict: { buy: 'Compra', wait: 'Espera', avoid: 'No conviene' },
      sections: { fairPrice: 'Precio justo', priceHistory: 'Historial de precio', smartComparison: 'Comparación inteligente', reviewAnalysis: 'Análisis de reseñas', truthCheck: 'Truth Check', bestDeals: 'Mejores ofertas', alternatives: 'Alternativas', insight: 'Truth Insight' },
      truthCheck: { inflatedPrice: 'Precio inflado', differentVersion: 'Versión diferente', refurbished: 'Producto reacondicionado' },
      wishlist: { title: 'Mis productos', addAlert: 'Añadir alerta de precio', targetPrice: 'Precio objetivo' },
      history: { title: 'Mis análisis' },
      chat: { title: 'Pregunta a TRUTH', placeholder: 'Haz una pregunta sobre este producto…' },
      forMe: { title: 'Para mí', budget: 'Presupuesto', priorities: 'Prioridades', preferredBrand: 'Marca preferida' },
      premium: { name: 'TRUTH PLUS', monthly: '5,99 €/mes', yearly: '49,99 €/año', unlimitedAnalyses: 'Análisis ilimitados', fullHistory: 'Historial completo', priceAlerts: 'Alertas de precio', personalizedAI: 'IA personalizada' },
      account: { title: 'Cuenta', login: 'Iniciar sesión', logout: 'Cerrar sesión', settings: 'Ajustes', language: 'Idioma' },
      privacy: { title: 'Privacidad', description: 'Aquí puedes ver qué recopilamos, qué guardamos y qué eliminamos.' },
      common: { cancel: 'Cancelar', confirm: 'Confirmar', save: 'Guardar', delete: 'Eliminar', loading: 'Cargando…', error: 'Ha ocurrido un error' },
    },
  },

  fr: {
    translation: {
      app: { name: 'TRUTH', tagline: 'Know before you buy.', subtagline: "Ne trouvez pas seulement le prix. Trouvez la vérité." },
      home: { title: 'Que voulez-vous analyser ?', scan: 'Scanner', screenshot: 'Capture d’écran', link: 'Lien', search: 'Rechercher' },
      result: { truthScore: 'Truth Score', currentPrice: 'Prix actuel', fairPrice: 'Prix juste', potentialSaving: 'Économie potentielle', explanation: 'Explication' },
      verdict: { buy: 'Achetez', wait: 'Attendez', avoid: "N'achetez pas" },
      sections: { fairPrice: 'Prix juste', priceHistory: 'Historique des prix', smartComparison: 'Comparaison intelligente', reviewAnalysis: 'Analyse des avis', truthCheck: 'Truth Check', bestDeals: 'Meilleures offres', alternatives: 'Alternatives', insight: 'Truth Insight' },
      truthCheck: { inflatedPrice: 'Prix gonflé', differentVersion: 'Version différente', refurbished: 'Produit reconditionné' },
      wishlist: { title: 'Mes produits', addAlert: 'Ajouter une alerte de prix', targetPrice: 'Prix cible' },
      history: { title: 'Mes analyses' },
      chat: { title: 'Demander à TRUTH', placeholder: 'Posez une question sur ce produit…' },
      forMe: { title: 'Pour moi', budget: 'Budget', priorities: 'Priorités', preferredBrand: 'Marque préférée' },
      premium: { name: 'TRUTH PLUS', monthly: '5,99 €/mois', yearly: '49,99 €/an', unlimitedAnalyses: 'Analyses illimitées', fullHistory: 'Historique complet', priceAlerts: 'Alertes de prix', personalizedAI: 'IA personnalisée' },
      account: { title: 'Compte', login: 'Connexion', logout: 'Déconnexion', settings: 'Paramètres', language: 'Langue' },
      privacy: { title: 'Confidentialité', description: 'Voyez ici ce que nous collectons, stockons et supprimons.' },
      common: { cancel: 'Annuler', confirm: 'Confirmer', save: 'Enregistrer', delete: 'Supprimer', loading: 'Chargement…', error: "Une erreur s'est produite" },
    },
  },

  de: {
    translation: {
      app: { name: 'TRUTH', tagline: 'Know before you buy.', subtagline: 'Finde nicht nur den Preis. Finde die Wahrheit.' },
      home: { title: 'Was möchtest du analysieren?', scan: 'Scannen', screenshot: 'Screenshot', link: 'Link', search: 'Suchen' },
      result: { truthScore: 'Truth Score', currentPrice: 'Aktueller Preis', fairPrice: 'Fairer Preis', potentialSaving: 'Mögliche Ersparnis', explanation: 'Erklärung' },
      verdict: { buy: 'Kaufen', wait: 'Warten', avoid: 'Nicht kaufen' },
      sections: { fairPrice: 'Fairer Preis', priceHistory: 'Preisverlauf', smartComparison: 'Intelligenter Vergleich', reviewAnalysis: 'Bewertungsanalyse', truthCheck: 'Truth Check', bestDeals: 'Beste Angebote', alternatives: 'Alternativen', insight: 'Truth Insight' },
      truthCheck: { inflatedPrice: 'Überhöhter Preis', differentVersion: 'Andere Version', refurbished: 'Generalüberholtes Produkt' },
      wishlist: { title: 'Meine Produkte', addAlert: 'Preisalarm hinzufügen', targetPrice: 'Zielpreis' },
      history: { title: 'Meine Analysen' },
      chat: { title: 'TRUTH fragen', placeholder: 'Stelle eine Frage zu diesem Produkt…' },
      forMe: { title: 'Für mich', budget: 'Budget', priorities: 'Prioritäten', preferredBrand: 'Bevorzugte Marke' },
      premium: { name: 'TRUTH PLUS', monthly: '5,99 €/Monat', yearly: '49,99 €/Jahr', unlimitedAnalyses: 'Unbegrenzte Analysen', fullHistory: 'Vollständiger Verlauf', priceAlerts: 'Preisalarme', personalizedAI: 'Personalisierte KI' },
      account: { title: 'Konto', login: 'Anmelden', logout: 'Abmelden', settings: 'Einstellungen', language: 'Sprache' },
      privacy: { title: 'Datenschutz', description: 'Hier siehst du, was wir sammeln, speichern und löschen.' },
      common: { cancel: 'Abbrechen', confirm: 'Bestätigen', save: 'Speichern', delete: 'Löschen', loading: 'Wird geladen…', error: 'Ein Fehler ist aufgetreten' },
    },
  },

  pt: {
    translation: {
      app: { name: 'TRUTH', tagline: 'Know before you buy.', subtagline: 'Não procure só o preço. Encontre a verdade.' },
      home: { title: 'O que você quer analisar?', scan: 'Escanear', screenshot: 'Captura de tela', link: 'Link', search: 'Pesquisar' },
      result: { truthScore: 'Truth Score', currentPrice: 'Preço atual', fairPrice: 'Preço justo', potentialSaving: 'Economia potencial', explanation: 'Explicação' },
      verdict: { buy: 'Compre', wait: 'Espere', avoid: 'Não compre' },
      sections: { fairPrice: 'Preço justo', priceHistory: 'Histórico de preço', smartComparison: 'Comparação inteligente', reviewAnalysis: 'Análise de avaliações', truthCheck: 'Truth Check', bestDeals: 'Melhores ofertas', alternatives: 'Alternativas', insight: 'Truth Insight' },
      truthCheck: { inflatedPrice: 'Preço inflado', differentVersion: 'Versão diferente', refurbished: 'Produto recondicionado' },
      wishlist: { title: 'Meus produtos', addAlert: 'Adicionar alerta de preço', targetPrice: 'Preço-alvo' },
      history: { title: 'Minhas análises' },
      chat: { title: 'Perguntar ao TRUTH', placeholder: 'Faça uma pergunta sobre este produto…' },
      forMe: { title: 'Para mim', budget: 'Orçamento', priorities: 'Prioridades', preferredBrand: 'Marca preferida' },
      premium: { name: 'TRUTH PLUS', monthly: 'R$ 5,99/mês', yearly: 'R$ 49,99/ano', unlimitedAnalyses: 'Análises ilimitadas', fullHistory: 'Histórico completo', priceAlerts: 'Alertas de preço', personalizedAI: 'IA personalizada' },
      account: { title: 'Conta', login: 'Entrar', logout: 'Sair', settings: 'Configurações', language: 'Idioma' },
      privacy: { title: 'Privacidade', description: 'Veja aqui o que coletamos, o que guardamos e o que excluímos.' },
      common: { cancel: 'Cancelar', confirm: 'Confirmar', save: 'Salvar', delete: 'Excluir', loading: 'Carregando…', error: 'Ocorreu um erro' },
    },
  },
};

// Rileva la lingua del dispositivo e sceglie la migliore corrispondenza disponibile
const deviceLanguages = RNLocalize.getLocales().map((l) => l.languageCode);
const supportedLanguages = Object.keys(resources);
const bestLanguage = deviceLanguages.find((lng) => supportedLanguages.includes(lng)) || 'en';

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
