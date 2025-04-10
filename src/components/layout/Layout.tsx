import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { WalletProvider } from '../../context/WalletContext';
import { NotificationProvider } from '../../context/NotificationContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <WalletProvider>
      <NotificationProvider>
        <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`}>
          <Sidebar />
          <main className="main-content">
            <div className="content-wrapper">
              {children}
            </div>
          </main>
        </div>
      </NotificationProvider>
    </WalletProvider>
  );
};

export default Layout;
