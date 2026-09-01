import './src/i18n';
import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/theme';
import { analyzeProduct } from './src/api';
import HomeScreen from './src/screens/HomeScreen';
import AnalyzingScreen from './src/screens/AnalyzingScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AccountScreen from './src/screens/AccountScreen';
import BottomNav from './src/components/BottomNav';
import ChatModal from './src/components/ChatModal';
import { initializeSubscriptions } from './src/services/subscriptionService';

export default function App() {
    useEffect(() => {
    initializeSubscriptions();
   }, []);
  const [tab, setTab] = useState('home');
  const [view, setView] = useState('home'); // home | analyzing | detail
  const [showChat, setShowChat] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [pendingQuery, setPendingQuery] = useState('');
  const [wishlistRefreshKey, setWishlistRefreshKey] = useState(0);

  const startAnalysis = (query) => {
    setPendingQuery(query);
    setView('analyzing');
  };

  const runAnalysis = useCallback(async () => {
    try {
      const result = await analyzeProduct(pendingQuery);
      setCurrentAnalysis(result);
      setView('detail');
    } catch (err) {
      Alert.alert('Analisi non riuscita', err.message);
      setView('home');
    }
  }, [pendingQuery]);

  const openSaved = (item) => {
    setCurrentAnalysis(item);
    setView('detail');
  };

  let body;
  if (view === 'analyzing') {
    body = <AnalyzingScreen onReady={runAnalysis} />;
  } else if (view === 'detail' && currentAnalysis) {
    body = (
      <ProductDetailScreen
        product={currentAnalysis}
        onBack={() => setView('home')}
        onOpenChat={() => setShowChat(true)}
        onSaved={() => setWishlistRefreshKey((k) => k + 1)}
      />
    );
  } else if (tab === 'wishlist') {
    body = <WishlistScreen refreshKey={wishlistRefreshKey} onOpen={openSaved} />;
  } else if (tab === 'history') {
    body = <HistoryScreen onOpen={openSaved} />;
  } else if (tab === 'account') {
    body = <AccountScreen />;
  } else {
    body = <HomeScreen onAnalyze={startAnalysis} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>{body}</View>
      {view !== 'analyzing' && (
        <BottomNav
          tab={tab}
          setTab={(t) => {
            setTab(t);
            setView('home');
          }}
        />
      )}
      {showChat && currentAnalysis && (
        <ChatModal analysisId={currentAnalysis.id} onClose={() => setShowChat(false)} />
      )}
    </SafeAreaView>
  );
}
