import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { NotificationProvider } from './context/NotificationContext';

// Admin Pages
import RegistryEndpointPage from './pages/admin/RegistryEndpointPage';
import CreateTokenPage from './pages/admin/CreateTokenPage';
import WhitelistPage from './pages/admin/WhitelistPage';

// Minter Pages
import MintTokensPage from './pages/minter/MintTokensPage';
import MintHistoryPage from './pages/minter/MintHistoryPage';

// Trader Pages
import SwapTokensPage from './pages/trader/SwapTokensPage';
import RedeemTokensPage from './pages/trader/RedeemTokensPage';

// Home Page
import HomePage from './pages/HomePage';

// Import global styles
import './App.css';

function App() {
  // Get the base path from the homepage in package.json or default to '/'
  const basePath = process.env.PUBLIC_URL || '';
  
  return (
    <NotificationProvider>
      <WalletProvider>
        <Router basename={basePath}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/endpoint" element={<RegistryEndpointPage />} />
            <Route path="/admin/create-token" element={<CreateTokenPage />} />
            <Route path="/admin/whitelist" element={<WhitelistPage />} />
            
            {/* Minter Routes */}
            <Route path="/minter/mint" element={<MintTokensPage />} />
            <Route path="/minter/history" element={<MintHistoryPage />} />
            
            {/* Trader Routes */}
            <Route path="/trader/swap" element={<SwapTokensPage />} />
            <Route path="/trader/redeem" element={<RedeemTokensPage />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </WalletProvider>
    </NotificationProvider>
  );
}

export default App;
